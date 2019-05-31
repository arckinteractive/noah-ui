<template>
    <n-hero
        v-editable="$attrs.blok"
        v-bind="$props"
    >
        <n-div container>
            <component
                v-for="slot in $attrs.blok.content"
                :key="slot._uid"
                :blok="slot"
                v-bind="slot"
                :is="slot.component | dashify"
            ></component>
        </n-div>
    </n-hero>
</template>

<script>
export default {
    props: [
        'color',
        'faded',
        'overlayColor',
        'size',
        'gravity',
        'textAlign',
        'textColor',
    ],
};
</script>
