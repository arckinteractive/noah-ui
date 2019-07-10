<template>
    <transition name="expand">
        <div v-if="visible" v-bind="filteredAttrs">
            <n-tile :class="config.children.content" :icon="icon">
                <!-- Replaces message text -->
                <slot>
                    {{ message }}
                </slot>

                <div slot="actions">
                    <n-button
                        v-if="closable"
                        circle
                        color="black"
                        ghost
                        aria-label="Close"
                        @click.native="close"
                    >
                        <n-icon :icon="config.icons.close"></n-icon>
                    </n-button>
                </div>
            </n-tile>
        </div>
    </transition>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Messages draw users attention to important/useful information
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NMessage',
                config: {
                    baseClass: 'n-message',
                    children: {
                        content: 'n-message__content',
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
         * Controls message visibility
         * @model
         */
        visible: {
            type: Boolean,
            default: true,
        },
        /**
         * Message icon
         */
        icon: {
            type: String,
        },
        /**
         * Text of the message
         */
        message: {
            type: String,
        },
        /**
         * Duration if visibility in ms
         */
        duration: {
            type: Number,
        },
        /**
         * Show a button to hide the message
         */
        closable: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        componentStates () {
            return {
                visible: this.visible,
                closable: this.closable,
            };
        },
    },

    methods: {
        /**
         * Close message programmatically
         * @public
         */
        close () {
            this.$emit('toggle', false);

            this.$nextTick(() => {
                this.$emit('close');
            });
        },

        /**
         * Open message programmatically
         * @public
         */
        open () {
            this.$emit('toggle', true);

            this.$nextTick(() => {
                this.$emit('open');
            });
        },
    },

    watch: {
        duration: {
            immediate: true,
            handler (value) {
                if (value) {
                    setTimeout(() => {
                        this.close();
                    }, value);
                }
            },
        },
    },
};
</script>
