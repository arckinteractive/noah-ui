import listeners from '../utils/listeners';

export const focusableEls = [
    'a:not([disabled]):not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
];

export default {
    install (Vue) {
        Vue.prototype.$globals.focusTrapEl = null;

        Vue.prototype.$trapFocus = function (el) {
            /**
             * https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
             */
            const keydownHandler = function (e) {
                if (typeof document === 'undefined') {
                    return;
                }

                const $focusableEls = el.querySelectorAll(focusableEls.join(','));

                let firstFocusableEl;
                let lastFocusableEl;

                if ($focusableEls.length) {
                    [firstFocusableEl] = $focusableEls;
                    lastFocusableEl = $focusableEls[$focusableEls.length - 1];
                } else {
                    firstFocusableEl = el;
                    lastFocusableEl = el;
                }

                const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

                if (isTabPressed) {
                    if (document.activeElement === lastFocusableEl) {
                        /* tab */
                        firstFocusableEl.focus();
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            };

            listeners.attach(el, 'keydown', keydownHandler);
        };

        Vue.prototype.$focus = function (el, trapFocusWithin) {
            this.$globals.focusTrapEl = trapFocusWithin || el;
            this.$globals.lastActiveEl = document.activeElement;

            this.$trapFocus(trapFocusWithin);

            if (el instanceof Element) {
                el.focus();
            } else if (trapFocusWithin) {
                trapFocusWithin.focus();
            }
        };

        Vue.prototype.$blur = function (el) {
            if (el instanceof Element) {
                el.blur();

                if (this.$globals.focusTrapEl && (el === this.$globals.focusTrapEl || this.$globals.focusTrapEl.contains(el))) {
                    listeners.cleanup(this.$globals.focusTrapEl);

                    this.$globals.focusTrapEl = null;
                }
            }

            if (this.$globals.lastActiveEl instanceof Element) {
                this.$globals.lastActiveEl.focus();
                this.$globals.lastActiveEl = false;
            }
        };

        Vue.mixin({
            props: {
                /**
                 * Global z-index of the component
                 */
                zIndex: {
                    type: [Number, String],
                },
            },

            computed: {
                stackZIndex () {
                    return this.zIndex || this.yieldZIndex();
                },
            },

            methods: {
                yieldZIndex () {
                    if (!this.$globals.zIndex) {
                        this.$globals.zIndex = 100;
                    }

                    this.$globals.zIndex++;

                    return this.$globals.zIndex;
                },

                isFocusable (el) {
                    if (el instanceof Element) {
                        return el.matches(focusableEls.join(','));
                    }

                    return false;
                },
            },

            beforeDestroy () {
                this.$blur(this.$el);
            },
        });
    },
};
