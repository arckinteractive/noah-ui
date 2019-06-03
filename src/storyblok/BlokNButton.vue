<template>
    <n-button
        v-editable="$attrs.blok"
        v-bind="props"
    ></n-button>
</template>

<script>
import storyblok from './storyblok';

export default {
    inheritAttrs: false,

    mixins: [storyblok],

    props: ['text', 'href', 'color', 'size', 'circle', 'outlined', 'ghost', 'prefixIcon', 'suffixIcon'],

    computed: {
        props () {
            return this.parseProps(this.$props);
        },
    },
};
</script>
