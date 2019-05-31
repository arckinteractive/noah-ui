<template>
    <n-list
        v-editable="$attrs.blok"
        v-bind="$props"
        tag-name="div"
    >
        <component
            v-for="slot in $attrs.blok.content"
            :key="slot._uid"
            :blok="slot"
            v-bind="slot"
            :is="slot.component | dashify"
        ></component>
    </n-list>
</template>

<script>
export default {
    props: ['numbered', 'bulleted', 'divided', 'textAlign'],
};
</script>
