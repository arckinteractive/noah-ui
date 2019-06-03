<template>
    <n-carousel
        v-editable="$attrs.blok"
        v-bind="$props"
        :options="{
            rewind: true,
        }"
    >
        <div
            v-for="slot in $attrs.blok.content"
            :key="slot._uid"
        >
            <component
                :blok="slot"
                v-bind="slot"
                :is="slot.component | dashify"
                :lazy-load="false"
            ></component>
        </div>
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
