const attach = (el, ...args) => {
    if (el instanceof Element) {
        el.addEventListener(...args);
        el.addEventListener('cleanup', () => el.removeEventListener(args[0], args[1]));
    }
};

const cleanup = (el) => {
    if (el instanceof Element) {
        el.dispatchEvent(new Event('cleanup'));
    }
};

export default {
    attach,
    cleanup,
};
