<template>
    <transition name="fade">
        <div
            v-if="visible"
            v-bind="filteredAttrs"
        >
            <div :class="config.children.icon" v-if="$slots.icon || icon">
                <!-- Can be used to override tag icon -->
                <slot name="icon">
                    <n-icon :icon="icon"></n-icon>
                </slot>
            </div>

            <div :class="config.children.content">
                <!-- Can be used to override tag text -->
                <slot>{{ tag }}</slot>
            </div>

            <n-button
                @click.stop="close"
                :class="config.children.close"
                circle
                ghost
                v-if="closable"
                aria-label="Close"
            >
                <i :class="config.icons.close"></i>
            </n-button>
        </div>
    </transition>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Tags are bits of information that describe an item
 */
export default {
    mixins: [Styling],

    data () {
        return {
            visible: true,
            localConfig: {
                name: 'NTag',
                config: {
                    baseClass: 'n-tag',
                    children: {
                        icon: 'n-tag__icon',
                        content: 'n-tag__content',
                        close: 'n-tag__close',
                    },
                    icons: {
                        close: 'fas fa-times',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Tag text
         */
        tag: {
            type: String,
        },
        /**
         * Show a close button
         */
        closable: {
            type: Boolean,
            default: false,
        },
        /**
         * Icon class
         */
        icon: {
            type: String,
        },
    },

    computed: {
        componentClasses () {
            return {
                [this.config.baseClass]: true,
                ...this.buildCssModifiers({
                    visible: this.visible,
                    closable: this.closable,
                }),
            };
        },
    },

    methods: {
        close (event) {
            event.stopPropagation();

            this.visible = false;

            this.$nextTick(() => {
                this.$emit('close');
            });
        },
    },
};
</script>
