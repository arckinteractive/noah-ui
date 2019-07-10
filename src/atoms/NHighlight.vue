<template>
    <span v-bind="filteredAttrs">
    <span
        :class="{ [config.children.match]: index % 2 }"
        :key="index"
        v-for="(part, index) in parts"
    >{{ part }}</span>
    </span>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Highlight provides XSS-safe text highlighting
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NHighlight',
                config: {
                    baseClass: 'n-highlight',
                    children: {
                        match: 'n-highlight__match',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Text
         */
        text: {
            type: [String, Number],
        },
        /**
         * Keyword to highlight
         */
        keyword: {
            type: String,
        },
    },

    computed: {
        parts () {
            if (!this.keyword) {
                return [this.text];
            }

            const regex = `(${this.keyword})`;

            return this.text.split(new RegExp(regex, 'ig'));
        },
    },
};
</script>
