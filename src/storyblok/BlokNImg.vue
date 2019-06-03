<template>
    <n-img
        v-editable="$attrs.blok"
        v-bind="$props"
    ></n-img>
</template>

<script>
export default {
    inheritAttrs: false,

    props: ['src', 'srcVt', 'alt'],
};
</script>
