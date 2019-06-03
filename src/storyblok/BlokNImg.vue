<template>
    <n-img
        v-editable="$attrs.blok"
        :src="imgSrc | resize('600x0')"
        :srcVt="imgSrcVt | resize('0x600')"
        :alt="alt"
    ></n-img>
</template>

<script>
export default {
    inheritAttrs: false,

    props: ['src', 'srcVt', 'alt'],
};
</script>
