<template>
    <n-img
        v-editable="$attrs.blok"
        v-bind="$props"
    ></n-img>
</template>

<script>
export default {
    props: ['src', 'srcVt', 'alt'],
};
</script>
