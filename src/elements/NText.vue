<template>
    <component :is="tagName || 'div'" v-bind="filteredAttrs">
        <slot></slot>
    </component>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Text components provides a simple wrapper to render text and headings
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NText',
                config: {
                    baseClass: 'n-text',
                    levels: {
                        1: 'n-h1',
                        2: 'n-h2',
                        3: 'n-h3',
                        4: 'n-h4',
                        5: 'n-h5',
                        6: 'n-h6',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Alternative tag name to use, e.g. `div`
         */
        tagName: {
            type: String,
            default: 'div',
        },
        /**
         * Sets heading level (only styling). Use tag-name prop to render a HTML heading
         */
        level: {
            type: [String, Number],
        },
        /**
         * Prevents text from wrapping / one-liner
         */
        unwrapped: {
            type: Boolean,
        },
    },

    computed: {
        componentClasses () {
            const classes = {
                [this.config.baseClass]: true,
                ...this.buildCssModifiers({
                    'text-unwrapped': this.unwrapped,
                }),
            };

            if (this.level) {
                const levelClass = this.config.levels[parseInt(this.level, 10)];

                classes[levelClass] = true;
            }

            return classes;
        },
    },
};
</script>
