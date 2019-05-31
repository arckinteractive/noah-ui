<template>
    <transition name="expand">
        <n-message
            :closable="closable"
            :duration="duration"
            :icon="icon"
            :message="message"
            :color="color"
            v-model="visible"
            v-bind="filteredAttrs"
        ></n-message>
    </transition>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Alerts are system notifications and errors.
 * This component is used by the $alert plugin and is not intended to be used directly
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NAlert',
                config: {
                    baseClass: 'n-alert',
                    containerId: 'n-message-pool',
                    containerClass: 'n-messages',
                    icons: {
                        success: 'fas fa-check-circle',
                        warning: 'fas fa-exclamation-circle',
                        danger: 'fas fa-times-circle',
                        neutral: 'fas fa-info-circle',
                        notice: 'fas fa-info-circle',
                    },
                },
            },
            visible: false,
        };
    },

    props: {
        message: {
            type: String,
            default: '',
        },
        duration: {
            type: Number,
            default: 8000,
        },
        color: {
            type: String,
        },
        closable: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        componentStates () {
            return {
                visible: this.visible,
                closable: this.closable,
            };
        },

        icon () {
            return this.config.icons[this.type];
        },
    },

    methods: {
        close () {
            this.visible = false;

            this.$nextTick(() => {
                this.$emit('close');
            });
        },

        open (duration = 10000) {
            this.visible = true;
            this.duration = duration;

            this.$nextTick(() => {
                this.$emit('open');
            });
        },
    },

    watch: {
        visible (value) {
            value ? this.open() : this.close();
        },
    },
};
</script>
