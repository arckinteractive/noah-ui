<template>
    <n-text :inner-html.prop="text | markdown"></n-text>
</template>

<script>
import markdown from '../../../../src/filters/markdown';

export default {
    filters: {
        markdown,
    },

    data () {
        return {
            text: require('!!raw-loader!../../fixtures/markdown.md').default,
        };
    },
};
</script>
