<template>
    <n-text
        v-editable="$attrs.blok"
        v-bind="$props"
    >
        <div>{{ $attrs.blok.text }}</div>
    </n-text>
</template>

<script>
export default {
    props: ['color', 'level', 'tagName', 'textAlign'],
};
</script>
