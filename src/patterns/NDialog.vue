<template>
    <transition name="fade">
        <n-layer
            :append-to-root="appendToRoot"
            :class="config.children.wrapper"
            @click.native="close"
            ref="layer"
            v-if="visible"
        >
            <div :class="config.children.inner">
                <div
                    :class="componentClasses"
                    @keydown.esc="close"
                    @click.stop
                    aria-modal="true"
                    ref="dialog"
                    role="dialog"
                >
                    <!-- Overrides entire dialog contents -->
                    <slot name="content">
                        <n-module :type="type" ref="module">
                            <!-- Overrides dialog header -->
                            <slot name="header" slot="header">
                                <n-tile :subtitle="subtitle" :title="title">
                                    <!-- Overrides dialog header actions, i.e. default close button -->
                                    <slot name="actions" slot="actions">
                                        <n-button @click.native="close" circle ghost ref="close" aria-label="Close">
                                            <n-icon :icon="config.icons.close"></n-icon>
                                        </n-button>
                                    </slot>
                                </n-tile>
                            </slot>

                            <!-- Dialog body -->
                            <slot></slot>

                            <!-- Dialog footer -->
                            <template slot="footer" v-if="$slots.footer">
                                <slot name="footer"></slot>
                            </template>
                        </n-module>
                    </slot>
                </div>
            </div>
        </n-layer>
    </transition>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Dialogs present information in an overlay/popup window
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NDialog',
                config: {
                    baseClass: 'n-dialog',
                    children: {
                        wrapper: 'n-dialog__wrapper',
                        inner: 'n-dialog__inner',
                    },
                    icons: {
                        close: 'fas fa-times',
                    },
                },
            },
        };
    },

    model: {
        prop: 'visible',
        event: 'toggle',
    },

    props: {
        /**
         * Stores visible state of the dialog
         * @model
         */
        visible: {
            type: Boolean,
            default: false,
        },
        /**
         * Title of the dialog
         */
        title: {
            type: String,
        },
        /**
         * Subtitle of the dialog
         */
        subtitle: {
            type: String,
        },
        /**
         * Append the dialog as the root element
         */
        appendToRoot: {
            type: Boolean,
            default: true,
        },
        /**
         * Module type of the inner content
         */
        type: {
            type: String,
            default: 'dialog',
        },
    },

    computed: {
        componentStates () {
            return {
                [this.type]: true,
                visible: this.visible,
            };
        },
    },

    methods: {
        open () {
            this.$emit('toggle', true);

            this.$nextTick(() => {
                setTimeout(() => {
                    this.$focus(this.$refs.close.$el, this.$el);
                }, 200);

                /**
                 * Emits, when dialog is opened
                 */
                this.$emit('open');
            });
        },

        close () {
            /**
             * Toggle dialog (updates v-model)
             * @event toggle
             * @property {Boolean} state Current visibility state
             */
            this.$emit('toggle', false);

            this.$nextTick(() => {
                this.$blur(this.$refs.dialog);

                /**
                 * Emits, when dialog is closed
                 * @event close
                 */
                this.$emit('close');
            });
        },
    },

    watch: {
        visible () {
            this.visible ? this.open() : this.close();
        },
    },
};
</script>
