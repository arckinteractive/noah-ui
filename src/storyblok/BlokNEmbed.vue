<template>
    <n-embed
        v-editable="$attrs.blok"
        :posterUrl="posterUrl | resize('600x0')"
        :url="url"
        :ratio="ratio"
        :overlay-color="overlayColor"
    ></n-embed>
</template>

<script>
export default {
    inheritAttrs: false,

    props: ['url', 'posterUrl', 'ratio', 'overlayColor'],
};
</script>
