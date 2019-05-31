<template>
    <div>
        <n-div
            v-if="$slots.trigger"
            @click.native.stop="handleClick"
            @mouseenter.native="handleMouseenter"
            @mouseleave.native="handleMouseleave"
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
                v-click-outside="close"
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
import Popper from 'popper.js/dist/umd/popper.js';

/**
 * Popups are hidden elements that can be displayed conditionally as in a floating layer
 *
 * Note that Popups can only be rendered client-side. You will need to wrap <n-popup> with a <ClientOnly> or other no-ssr
 * wrapper provided by your SSR framework.
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
            type: Element,
        },
        /**
         * Dropdown placement, e.g. 'top', 'top-end' etc.
         * See popper.js documentation.
         */
        placement: {
            type: String,
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
    },

    methods: {
        open () {
            this.isVisible = true;

            this.$nextTick(() => {
                if (!this.popper) {
                    const config = this.config.popper;

                    if (this.arrow) {
                        config.modifiers.arrow = {
                            enabled: true,
                            element: this.$refs.arrow,
                        };
                    }

                    this.popper = new Popper(this.triggerEl, this.$refs.popup.$el, {
                        placement: this.placement,
                        ...config,
                    });
                }

                this.popper.scheduleUpdate();

                this.$emit('open');

                setTimeout(() => {
                    this.$focus(null, this.$refs.popup.$el);
                }, 200);
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
