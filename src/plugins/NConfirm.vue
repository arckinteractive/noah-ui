<template>
    <n-dialog
        :append-to-root="false"
        :title="title"
        @open="open"
        @close="cancel"
        type="confirm"
        v-model="visible"
        v-bind="filteredAttrs"
    >
        <n-div padding="medium">{{ message }}</n-div>

        <template slot="footer">
            <n-div padding="medium" flex gap="small" right-center>
                <n-button @click="cancel" v-bind="cancelButton" ref="cancel"></n-button>
                <n-button @click="confirm" v-bind="confirmButton" ref="confirm"></n-button>
            </n-div>
        </template>
    </n-dialog>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Confirm component is a Dialog wrapper used by `v-confirm` directive and `$confirm()` plugin
 * This component is not intended to be used directly
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NConfirm',
                config: {
                    baseClass: 'n-confirm',
                },
            },
            visible: false,
        };
    },

    props: {
        type: {
            type: String,
        },
        title: {
            type: String,
        },
        message: {
            type: String,
        },
        confirmButton: {
            type: Object,
            default () {
                return { text: 'Proceed' };
            },
        },
        cancelButton: {
            type: Object,
            default () {
                return {
                    text: 'Cancel',
                    outlined: true,
                };
            },
        },
    },

    computed: {
        componentClasses () {
            return {
                [this.config.baseClass]: true,
                ...this.buildCssModifiers({
                    visible: this.visible,
                }),
            };
        },
    },

    methods: {
        cancel () {
            this.close();

            this.$nextTick(() => {
                /**
                 * Emits when user cancels/rejects the confirmation
                 */
                this.$emit('cancel');
            });
        },

        confirm () {
            this.close();

            this.$nextTick(() => {
                /**
                 * Emits when user consent has been received
                 */
                this.$emit('confirm');
            });
        },

        /**
         * Close dialog programmatically
         * @public
         */
        close () {
            this.visible = false;
            this.$nextTick(() => {
                /**
                 * Emits when confirmation dialog is closed
                 */
                this.$emit('close');
            });
        },

        /**
         * Open dialog programmatically
         * @public
         */
        open () {
            this.visible = true;

            this.$nextTick(() => {
                /**
                 * Emits when confirmation dialog is opened
                 */
                this.$emit('open');

                setTimeout(() => {
                    this.$focus(this.$refs.cancel.$el, this.$el);
                }, 200);
            });
        },
    },
};
</script>
