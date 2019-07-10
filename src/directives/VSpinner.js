export default (config) => {
    const spin = (el, binding) => {
        const selector = config.directives.spinner.baseClass;

        if (binding.value) {
            el.classList.add(selector);
        } else {
            el.classList.remove(selector);
        }
    };

    return {
        inserted: spin,
        update: spin,
    };
};
