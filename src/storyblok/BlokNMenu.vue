<template>
    <div v-editable="$attrs.blok">
        <n-menu
            v-bind="$props"
            :items="items"
        ></n-menu>
    </div>
</template>

<script>
import storyblok from './storyblok';

export default {
    inheritAttrs: false,

    mixins: [storyblok],

    props: ['horizontal'],

    computed: {
        items () {
            if (!this.$attrs.blok.items) {
                return [];
            }

            const parse = (e) => {
                const props = this.parseProps(e);

                if (props.children) {
                    props.children = props.children.map(parse);
                }

                return props;
            };

            return this.$attrs.blok.items.map(parse);
        },
    },
};
</script>
