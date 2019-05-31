export default {
    inheritAttrs: false,

    computed: {
        config () {
            const { name = '', config = {} } = this.localConfig || {};

            return Object.assign(
                {},
                config,
                this.$config.components[name] || {},
            );
        },

        filteredAttrs () {
            const attrs = this.filterAttrClasses({
                attrs: this.$attrs,
                config: {
                    modifierPrefix: this.config.modifierPrefix || '',
                    whitelist: this.$config.style.whitelist || [],
                    classMap: Object.assign({}, this.$config.style.classMap || {}, this.config.classMap || {}),
                    viewports: this.$config.viewport.names,
                },
            });

            attrs.class = Object.assign({}, attrs.class, this.componentClasses);

            return attrs;
        },

        componentClasses () {
            if (!this.config.baseClass) {
                return {};
            }

            return {
                [this.config.baseClass]: true,
                ...this.buildCssModifiers(this.componentStates),
            };
        },

        componentStates () {
            return {};
        },
    },

    methods: {
        buildCssModifiers (data = {}) {
            const map = this.config.classMap || {};

            return Object.keys(data)
                .reduce((acc, cur) => {
                    const name = map[cur] || `${cur}`;

                    acc[name] = typeof cur !== 'undefined' && cur !== 'undefined' && !!data[cur];

                    return acc;
                }, {});
        },

        filterAttrClasses ({ attrs, config }) {
            const attributes = Object.assign({}, attrs);
            const classes = [];

            const addModifier = ({
                viewport, value, dashified, attr, 
            }) => {
                if (value === true || value === '') {
                    value = dashified;
                }

                const attrOpts = config.whitelist.find((e) => {
                    return e.attr.indexOf(dashified) > -1;
                });

                if (!attrOpts) {
                    return;
                }

                const viewportPrefix = attrOpts.responsive ? config.viewports[viewport || ''] : '';
                const classPrefix = config.modifierPrefix || attrOpts.classPrefix || '';
                const modifierClass = attrOpts.class || `${classPrefix}${value}`;

                if (config.classMap[modifierClass]) {
                    classes.push(`${viewportPrefix}${config.classMap[modifierClass]}`);
                } else {
                    classes.push(`${viewportPrefix}${modifierClass}`);
                }

                delete attributes[attr];
            };

            const attrWhitelist = config.whitelist.reduce((prev, cur) => {
                return [
                    ...prev,
                    ...cur.attr,
                ];
            }, []);

            Object.keys(attributes).forEach((attr) => {
                const [name, viewport = 'sm'] = attr.split(':', 2).reverse();

                const dashified = name.toString()
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .toLowerCase()
                    .replace(/[ _]/g, '-');

                if (attrWhitelist.indexOf(dashified) < 0 || Object.keys(config.viewports).indexOf(viewport) < 0) {
                    return;
                }

                const value = attributes[attr];

                if (value === false
                    || typeof value === 'undefined'
                    || value === 'undefined'
                    || value === null
                    || value === 'null'
                    || typeof value === 'object'
                ) {
                    return;
                }

                addModifier({
                    viewport,
                    value,
                    dashified,
                    attr,
                });
            });

            attributes.class = classes.reduce((prev, cur) => {
                prev[cur] = true;

                return prev;
            }, {});

            return attributes;
        },
    },
};
