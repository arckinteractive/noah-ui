<template>
    <component
        :is="componentName"
        :tabindex="tabindex"
        :href="href"
        role="button"
        v-bind="filteredAttrs"
        v-on="listeners"
    >
        <n-icon :icon="prefixIcon || icon" position="prefix" v-if="prefixIcon || icon"></n-icon>

        <template v-if="$slots.default || text">
            <span>
                <!-- Default slot, overrides button text -->
                <slot>
                    {{ text }}
                </slot>
            </span>
        </template>

        <n-icon :icon="suffixIcon" position="suffix" v-if="suffixIcon"></n-icon>
    </component>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Button is a clickable element, which can be used in forms, as well as a navigation element.
 * Noah UI buttons natively support Vue Router `to` property.
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NButton',
                config: {
                    baseClass: 'n-button',
                },
            },
        };
    },

    props: {
        /**
         * Renders the button as an anchor but routes the request via $router
         */
        to: [String, Object],
        /**
         * Renders the button as an anchor
         */
        href: String,
        /**
         * Alternative tag name to use, e.g. `div`
         */
        tagName: String,
        /**
         * Button text
         */
        text: String,
        /**
         * Icon to display before the text
         */
        prefixIcon: String,
        /**
         * Alias for prefixIcon
         */
        icon: String,
        /**
         * Icon to display after the text
         */
        suffixIcon: String,
        /**
         * Sets loading state
         */
        loading: Boolean,
    },

    computed: {
        componentName () {
            if (this.tagName) {
                return this.tagName;
            }

            if (this.href || this.to) {
                return 'a';
            }

            return 'button';
        },

        listeners () {
            const listeners = {
                ...this.$listeners,
            };

            if (!listeners.click && this.to && this.$router) {
                listeners.click = () => {
                    this.$router.push(this.to); /* eslint-disable-line */
                };
            }

            if (!listeners.keydown && listeners.click) {
                listeners.keydown = (e) => {
                    if (e.key === ' ' || e.keyCode === 32) {
                        e.preventDefault();
                        e.stopPropagation();

                        e.target.click();
                    }
                };
            }

            return listeners;
        },

        tabindex () {
            if (this.$attrs.tabindex) {
                return this.$attrs.tabindex;
            }

            if (['a', 'button'].indexOf(this.componentName) > -1) {
                return 0;
            }

            if (this.listeners.click) {
                return 0;
            }

            return -1;
        },

        componentStates () {
            return {
                loading: this.loading,
            };
        },
    },
};
</script>
