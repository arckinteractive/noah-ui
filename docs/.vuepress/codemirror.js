import codemirror from 'vue-codemirror/src/codemirror.vue';

export default (config) => {
    if (config) {
        if (config.options) {
            codemirror.props.globalOptions.default = () => config.options;
        }
        if (config.events) {
            codemirror.props.globalEvents.default = () => config.events;
        }
    }

    return codemirror;
};
