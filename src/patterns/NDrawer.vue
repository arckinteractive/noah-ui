<template>
    <transition name="fade">
        <n-layer
            v-if="visible"
            v-bind="filteredAttrs"
            @click.stop
        >
            <div
                @click="close"
                :class="config.children.wrapper"
            ></div>

            <transition :name="transition">
                <div
                    v-if="isOpen"
                    :class="componentClasses"
                    ref="drawer"
                    tabindex="0"
                >
                    <div :class="config.children.header" v-if="$slots.header">
                        <!-- Drawer header, can be used to display a user card -->
                        <slot name="header"></slot>
                    </div>

                    <div :class="config.children.content">
                        <!-- Drawer contents -->
                        <slot></slot>
                    </div>
                </div>
            </transition>
        </n-layer>
    </transition>
</template>

<script>
import Styling from '../mixins/Styling';

export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NDrawer',
                config: {
                    baseClass: 'n-drawer',
                    children: {
                        wrapper: 'n-drawer__wrapper',
                        header: 'n-drawer__header',
                        content: 'n-drawer__content',
                    },
                },
            },
            isOpen: this.visible,
        };
    },

    model: {
        prop: 'visible',
        event: 'toggle',
    },

    props: {
        /**
         * Toggles drawer visibility
         * @model
         */
        visible: {
            type: Boolean,
            default: false,
        },
        /**
         * Attaches to corresponding screen edge
         */
        attachment: {
            type: String,
            default: 'right',
        },
        /**
         * Name of the transition to use
         */
        transitionName: {
            type: String,
        },
    },

    computed: {
        transition () {
            if (this.transitionName) {
                return this.transitionName;
            }

            return this.attachment === 'right' ? 'slide-in-left' : 'slide-in-right';
        },

        componentStates () {
            return {
                [this.attachment]: true,
                visible: this.visible,
            };
        },
    },

    methods: {
        close () {
            this.$emit('toggle', false);

            this.$nextTick(() => {
                this.isOpen = false;

                this.$blur(this.$refs.drawer);

                this.$emit('close');
            });
        },

        open () {
            this.$emit('toggle', true);

            this.$nextTick(() => {
                this.isOpen = true;

                setTimeout(() => {
                    this.$focus(null, this.$refs.drawer);
                }, 200);

                this.$emit('open');
            });
        },
    },

    watch: {
        visible (value) {
            value ? this.open() : this.close();
        },

        $route: {
            handler () {
                this.$emit('toggle', false);
            },
        },
    },
};
</script>
