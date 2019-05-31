export default {
    methods: {
        parseProps (value) {
            if (typeof value === 'undefined' || typeof value !== 'object' || value === null) {
                return value;
            }

            const props = Object.assign({}, value);

            delete props._uid; /* eslint-disable-line */
            delete props.component;

            Object.keys(props).forEach((prop) => {
                if (prop.substr(0, 1) === '$') {
                    delete props[prop];

                    return;
                }

                const val = props[prop];

                if (typeof val === 'object' && val !== null) {
                    if (val.plugin === 'fontawesome-selector') {
                        props[prop] = val.icon ? `${val.type} ${val.icon}` : '';
                    }

                    if (val.fieldtype === 'multilink') {
                        if (val.linktype === 'story') {
                            props[prop] = `/${val.cached_url}`;
                        } else {
                            props[prop] = val.url;
                        }
                    }
                }
            });

            return props;
        },
    },
};
