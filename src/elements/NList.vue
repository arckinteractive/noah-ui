<template>
    <component
        :is="tagName"
        v-bind="filteredAttrs"
    >
        <slot></slot>
    </component>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Renders a list of items
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NList',
                config: {
                    baseClass: 'n-list',
                },
            },
        };
    },

    props: {
        /**
         * Tag name to use
         */
        tagName: {
            type: String,
            default: 'ul',
        },
        /**
         * Divide items
         */
        divided: Boolean,
        /**
         * Render a box a round
         */
        outlined: Boolean,
        /**
         * Render a bullet list
         */
        bulleted: Boolean,
        /**
         * Render a numbered list
         */
        numbered: Boolean,
        /**
         * Render a striped list
         */
        striped: Boolean,
    },

    computed: {
        componentStates () {
            return {
                divided: this.divided,
                outlined: this.outlined,
                striped: this.striped,
                bulleted: this.bulleted,
                numbered: this.numbered,
            };
        },
    },
};
</script>
