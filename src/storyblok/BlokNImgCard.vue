<template>
    <div class="media-card">
        <n-media
            tag-name="a"
            :href="href"
            :ratio="ratio"
            :aria-label="title"
        >
            <n-img
                v-if="imgSrc || imgSrcVt"
                :src="imgSrc"
                :srcVt="imgSrcVt"
                :alt="title"
            />
        </n-media>

        <n-div
            :tagName="tagName"
            :color="color"
            :text-align="textAlign"
            class="heading"
        >{{ title }}
        </n-div>
    </div>
</template>

<script>
export default {
    props: ['ratio', 'title', 'href', 'imgSrc', 'imgSrcVt', 'tagName', 'color', 'textAlign'],
};
</script>

<style scoped lang="scss">
    .heading {
        color: var(--current-color-invert, var(--color-primary-invert));
        background: var(--current-color, var(--color-primary));
        font-size: var(--text-l);
        padding: var(--space-m) var(--space-xl);
        border-radius: 0 0 var(--radius-default) var(--radius-default);
        font-weight: 500;
        width: 100%;
        margin: calc(-1 * var(--space-m)) 0 0;
        bottom: 0;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
    }
</style>
