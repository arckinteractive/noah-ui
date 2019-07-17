const isValidAttrValue = (value) => {
    const invalid = value === 'false'
        || value === false
        || typeof value === 'undefined'
        || value === 'undefined'
        || value === null
        || value === 'null'
        || typeof value === 'object';

    return !invalid;
};

const dashifyAttrName = (name) => {
    return name.toString()
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .toLowerCase()
        .replace(/[ _]/g, '-');
};

export default {
    inheritAttrs: false,

    props: {
        stylingAttrs: {
            type: Object,
            default () {
                return {};
            },
        },
    },

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
                attrs: { ...this.$attrs, ...this.stylingAttrs },
                config: {
                    modifierPrefix: this.config.modifierPrefix || '',
                    whitelist: this.$config.style.whitelist || [],
                    classMap: Object.assign({}, this.$config.style.classMap || {}, this.config.classMap || {}),
                    viewports: this.$config.viewport.names || {},
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
            const modifierPrefix = this.config.modifierPrefix || '';
            const map = this.config.classMap || {};

            return Object.keys(data)
                .reduce((acc, name) => {
                    if (!isValidAttrValue(name)) {
                        return acc;
                    }

                    let className = '';
                    const classBase = `${modifierPrefix}${name}`;

                    const value = data[name];

                    if (!isValidAttrValue(value)) {
                        return acc;
                    }

                    if (typeof value !== 'string' && !!value) {
                        className = dashifyAttrName(classBase);
                        className = map[className] || className;
                        acc[className] = true;
                    } else {
                        className = dashifyAttrName(`${classBase}-${value}`);
                        className = map[className] || className;
                        acc[className] = true;
                    }

                    return acc;
                }, {});
        },

        filterAttrClasses ({ attrs, config }) {
            const attributes = Object.assign({}, attrs);
            const classes = [];

            const addModifier = (modifier) => {
                const {
                    viewport,
                    value,
                    dashified,
                    attr,
                } = modifier;

                let val = value;

                if (val === true || val === '') {
                    val = dashified;
                }

                const attrOpts = config.whitelist.find((e) => {
                    return e.attr.indexOf(dashified) > -1;
                });

                if (!attrOpts) {
                    return;
                }

                const viewportPrefix = attrOpts.responsive ? config.viewports[viewport || ''] : '';
                const classPrefix = config.modifierPrefix || attrOpts.classPrefix || '';
                const modifierClass = attrOpts.class || `${classPrefix}${val}`;

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

                const dashified = dashifyAttrName(name);

                if (attrWhitelist.indexOf(dashified) < 0 || Object.keys(config.viewports).indexOf(viewport) < 0) {
                    return;
                }

                const value = attributes[attr];

                if (!isValidAttrValue(value)) {
                    return;
                }

                addModifier({
                    viewport,
                    value,
                    dashified,
                    attr,
                });
            });

            const classAttr = {};

            if (typeof attributes.class === 'string') {
                classAttr[attributes.class] = true;
            } else if (Array.isArray(attributes.class)) {
                attributes.class.forEach((e) => {
                    if (typeof e === 'string') {
                        classAttr[e] = true;
                    } else if (typeof e === 'object') {
                        Object.assign(classAttr, e);
                    }
                });
            } else if (typeof attributes.class === 'object') {
                Object.assign(classAttr, attributes.class);
            }

            Object.assign(classAttr, classes.reduce((prev, cur) => {
                prev[cur] = true;

                return prev;
            }, {}));

            attributes.class = classAttr;

            return attributes;
        },
    },
};
