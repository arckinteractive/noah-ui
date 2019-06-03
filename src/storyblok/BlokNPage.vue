<template>
    <div v-editable="$attrs.blok">
        <component
            v-for="slot in $attrs.blok.content"
            :key="slot._uid"
            :is="slot.component | dashify"
            v-bind="slot"
            :blok="slot"
        ></component>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,

    head () {
        return {
            title: this.$attrs.blok.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$attrs.blok.description,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.$attrs.blok.description,
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: this.$attrs.blok.image,
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: 'website',
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.$attrs.blok.title,
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'summary',
                },
                {
                    hid: 'twitter:image',
                    property: 'twitter:image',
                    content: this.$attrs.blok.image,
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.$attrs.blok.description,
                },
            ].filter((e) => !!e.content),
        };
    },
};
</script>
