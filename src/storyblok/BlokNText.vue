<template>
    <n-text
        v-editable="$attrs.blok"
        v-bind="$props"
    >
        <div v-html="text.html"></div>
    </n-text>
</template>

<script>
export default {
    inheritAttrs: false,

    props: ['text', 'color', 'size', 'textAlign'],
};
</script>
