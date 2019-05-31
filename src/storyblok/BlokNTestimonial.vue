<template>
    <div
        v-editable="$attrs.blok"
        class="testimonial"
    >
        <n-media avatar width="60px">
            <img :src="image" :alt="name"/>
        </n-media>

        <n-text color="black">
            <p v-html="text.html"></p>
            <br />
            <strong>{{ name }}</strong>
        </n-text>
    </div>
</template>

<script>
export default {
    props: ['name', 'text', 'image'],
};
</script>

<style scoped lang="scss">
    .testimonial {
        --current-text: var(--text-m);

        background: var(--color-white);
        color: var(--color-black);
        padding: var(--space-m);
        border-radius: var(--radius-default);
        margin-top: 60px;
        height: calc(100% - 60px);
    }

    .testimonial .n-media {
        margin-top: -60px;
        box-shadow: 0 0 0 4px var(--color-grey-border);
    }
</style>
