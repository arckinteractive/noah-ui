<template>
    <div v-click-outside="close">
        <n-div
            v-if="$slots.trigger"
            @click.native="handleClick"
            @mouseenter.native="handleMouseenter"
            @mouseleave.native="handleMouseleave"
            @touchstart.native="handleMouseenter"
            @touchend.native="handleMouseleave"
            ref="trigger"
        >
            <!-- Can be used instead of passing the trigger ref as a prop -->
            <slot name="trigger"></slot>
        </n-div>

        <transition name="popup">
            <n-layer
                v-if="triggerEl"
                v-show="isVisible"
                v-bind="filteredAttrs"
                tabindex="0"
                ref="popup"
            >
                <div
                    :class="config.children.content"
                    @keydown.esc="close"
                    @click.stop
                >
                    <!-- Overrides popup content -->
                    <slot>
                        {{ message }}
                    </slot>
                </div>

                <div
                    :class="config.children.arrow"
                    ref="arrow"
                    v-if="arrow"
                ></div>
            </n-layer>
        </transition>
    </div>
</template>

<script>
import Styling from '../mixins/Styling';
import ClickOutside from 'vue-click-outside';

/**
 * Popups are hidden elements that can be displayed conditionally as in a floating layer
 */
export default {
    mixins: [Styling],

    directives: {
        ClickOutside,
    },

    data () {
        return {
            localConfig: {
                name: 'NPopup',
                config: {
                    baseClass: 'n-popup',
                    children: {
                        content: 'n-popup__content',
                        arrow: 'n-popup__arrow',
                    },
                    popper: {
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: false,
                                applyStyle: {
                                    enabled: false,
                                },
                            },
                        },
                        eventsEnabled: false,
                    },
                },
            },
            originalEvent: null,
            triggerEl: null,
            popper: null,
            isVisible: this.visible,
        };
    },

    model: {
        prop: 'visible',
        event: 'toggle',
    },

    props: {
        /**
         * Popup visibility
         * @model
         */
        visible: {
            type: Boolean,
            default: false,
        },
        /**
         * DOM element to attach this popup to
         */
        trigger: {
            type: null,
            validator (value) {
                return value instanceof Element;
            },
        },
        /**
         * Dropdown placement, e.g. 'top', 'top-end' etc.
         * See popper.js documentation for a list of possible placements.
         *
         * Given erradic flip behavior of the popper, this can be passed as an object
         * of placements corresponding to viewport `{ sm: 'top-start', md: 'top' }`
         * Passing placement as an object will disable flip and preventOverflow
         */
        placement: {
            type: [String, Object],
            default: 'auto',
        },
        /**
         * Show dropdown arrow
         */
        arrow: {
            type: Boolean,
            default: true,
        },
        /**
         * Open when trigger slot is clicked
         */
        openOnClick: {
            type: Boolean,
            default: true,
        },
        /**
         * Open when mouse enters the trigger slot
         */
        openOnHover: {
            type: Boolean,
            default: false,
        },
        /**
         * Popup type, used as a class modifier
         */
        type: {
            type: String,
        },
        /**
         * Popup content
         */
        message: {
            type: String,
        },
        /**
         * A function that can be used to filter the popper config for this instance
         */
        configCallback: {
            type: Function,
        },
    },

    mounted () {
        this.resolveTriggerEl();
    },

    updated () {
        this.resolveTriggerEl();
    },

    destroyed () {
        if (this.popper) {
            this.popper.destroy();
        }
    },

    computed: {
        componentStates () {
            return {
                [this.type]: true,
                visible: this.isVisible,
            };
        },

        popperConfig () {
            const config = { ...this.config.popper };

            if (typeof this.placement === 'object') {
                config.placement = this.resolveForViewport(this.placement);
                config.modifiers.flip = { enabled: false };
                config.modifiers.preventOverflow = { enabled: false };
                config.modifiers.hide = { enabled: false };
            } else {
                config.placement = this.placement;
            }

            if (this.arrow) {
                config.modifiers.arrow = {
                    enabled: true,
                    element: this.$refs.arrow,
                };
            }

            if (typeof this.configCallback === 'function') {
                return this.configCallback(config);
            }

            return config;
        },
    },

    methods: {
        open () {
            this.isVisible = true;

            this.$nextTick(() => {
                this.$popper.load().then((Popper) => {
                    if (!this.popper) {
                        this.popper = new Popper(this.triggerEl, this.$refs.popup.$el, this.popperConfig);
                    }

                    this.popper.scheduleUpdate();

                    setTimeout(() => {
                        this.$emit('open');

                        this.triggerEl.focus();
                        this.$focus(this.triggerEl, this.$refs.popup.$el);
                    }, 250);
                });
            });
        },

        close () {
            this.isVisible = false;

            this.$nextTick(() => {
                this.$emit('close');

                this.$blur(this.$refs.popup);
            });
        },

        toggle () {
            this.isVisible = !this.isVisible;
        },

        handleClick () {
            if (this.openOnClick) {
                this.toggle();
            }
        },

        handleMouseenter () {
            if (this.openOnHover) {
                this.open();
            }
        },

        handleMouseleave () {
            if (this.openOnHover) {
                this.close();
            }
        },

        resolveTriggerEl () {
            this.$nextTick(() => {
                if (this.trigger) {
                    this.triggerEl = this.trigger;
                } else {
                    this.triggerEl = this.$refs.trigger.$children[0].$el;
                }
            });
        },
    },

    watch: {
        visible () {
            this.isVisible = this.visible;
        },

        isVisible () {
            this.isVisible ? this.open() : this.close();

            this.$emit('toggle', this.isVisible);
        },
    },
};
</script>
