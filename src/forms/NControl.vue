<template>
    <div v-bind="filteredAttrs">
        <div v-if="prefixLabel || $slots.prefixLabel" :class="config.children.prefixLabel">
            <!-- Can be used to render a custom prefix label -->
            <slot name="prefixLabel" v-bind="$props">
                <span>{{ prefixLabel }}</span>
            </slot>
        </div>

        <div :class="innerClasses">
            <div v-if="prefixIcon || $slots.prefixIcon" :class="config.children.prefixIcon">
                <!-- Can be used to render a custom prefix icon -->
                <slot name="prefixIcon" v-bind="$props">
                    <n-icon :icon="prefixIcon"></n-icon>
                </slot>
            </div>

            <!-- Overrides the input element -->
            <slot v-bind="$props"></slot>

            <template v-if="loading">
                <div :class="config.children.suffixIcon">
                    <div :class="config.children.loader"></div>
                </div>
            </template>

            <template v-else>
                <div v-if="suffixIcon || $slots.suffixIcon" :class="config.children.suffixIcon">
                    <!-- Can be used to render a custom suffix icon -->
                    <slot name="suffixIcon" v-bind="$props">
                        <n-icon :icon="suffixIcon"></n-icon>
                    </slot>
                </div>
            </template>
        </div>

        <div v-if="suffixLabel || $slots.suffixLabel" :class="config.children.suffixLabel">
            <!-- Can be used to render a custom suffix label-->
            <slot name="suffixLabel" v-bind="$props">
                <span>{{ suffixLabel }}</span>
            </slot>
        </div>
    </div>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Controls wraps an input element to create a stylable form element with an input/select, icons and inline labels
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NControl',
                config: {
                    baseClass: 'n-control',
                    children: {
                        prefixLabel: 'n-control__prefix-label',
                        suffixLabel: 'n-control__suffix-label',
                        inner: 'n-control__inner',
                        prefixIcon: 'n-control__prefix-icon',
                        suffixIcon: 'n-control__suffix-icon',
                        loader: 'n-control__loader',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Prefix label text
         */
        prefixLabel: {
            type: String,
        },
        /**
         * Suffix label text
         */
        suffixLabel: {
            type: String,
        },
        /**
         * Prefix icon class
         */
        prefixIcon: {
            type: String,
        },
        /**
         * Suffix icon class
         */
        suffixIcon: {
            type: String,
        },
        /**
         * Sets loading state
         */
        loading: {
            type: Boolean,
        },
    },

    computed: {
        componentStates () {
            return {
                loading: this.loading,
                prefixed: this.prefixLabel || this.$slots.prefixLabel,
                suffixed: this.suffixLabel || this.$slots.suffixLabel,
            };
        },

        innerClasses () {
            return {
                [this.config.children.inner]: true,
                ...this.buildCssModifiers({
                    prefixed: this.prefixIcon || this.$slots.prefixIcon,
                    suffixed: this.suffixIcon || this.$slots.suffixIcon,
                }, false),
            };
        },
    },
};
</script>
