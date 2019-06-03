<template>
    <n-carousel
        v-editable="$attrs.blok"
        v-bind="$props"
    >
        <component
            v-for="slot in $attrs.blok.content"
            :key="slot._uid"
            :blok="slot"
            v-bind="slot"
            :is="slot.component | dashify"
        ></component>
    </n-carousel>
</template>

<script>
export default {
    inheritAttrs: false,

    props: [
        'arrows',
        'dots',
        'autoplay',
    ],
};
</script>
