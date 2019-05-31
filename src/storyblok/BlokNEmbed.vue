<template>
    <n-embed
        v-editable="$attrs.blok"
        v-bind="$props"
    ></n-embed>
</template>

<script>
export default {
    props: ['url', 'posterUrl', 'ratio', 'overlayColor'],
};
</script>
