<template>
    <n-hero
        v-editable="$attrs.blok"
        v-bind="$props"
        gap="none"
        center-center
        stretched
        lg:unwrapped
        padding="none"
        class="split-hero"
    >
        <n-div
            col
            sm:12
            :lg:span="imgSpan || 6"
            :class="imageClasses"
        >
            <n-img
                :src="imgSrc"
                :srcVt="imgSrcVt"
                alt="Cover Image"
            />
        </n-div>

        <n-div
            flex
            :center-center="!this.imgPosition"
            :right-center="this.imgPosition === 'right'"
            :left-center="this.imgPosition === 'left'"
            col
            sm:12
            lg:span="auto"
            padding="large"
        >
            <n-div
                col
                sm:12
                :lg:span="contentSpan || 8"
            >
                <n-div v-if="title || subtitle">
                    <n-text :tag-name="headingTagName" level="2" v-if="title">{{ title }}</n-text>
                    <n-text v-if="subtitle" level="5">{{ subtitle }}</n-text>
                </n-div>

                <component
                    v-for="slot in $attrs.blok.content"
                    :key="slot._uid"
                    :blok="slot"
                    v-bind="slot"
                    :is="slot.component | dashify"
                ></component>
            </n-div>
        </n-div>
    </n-hero>
</template>

<script>
export default {
    props: [
        'title',
        'subtitle',
        'headingTagName',
        'color',
        'overlayColor',
        'size',
        'gravity',
        'textAlign',
        'textColor',
        'imgSrc',
        'imgSrcVt',
        'contentSpan',
        'imgPosition',
        'imgSpan',
    ],

    computed: {
        imageClasses () {
            return {
                'split-image': true,
                [this.imgPosition]: true,
            };
        },
    },
};
</script>

<style scoped lang="scss">
    .split-hero {
        --flex-gap: 0px;
        padding: 0;

        .split-image.right {
            order: 3;
        }
    }

    .split-image .n-img {
        position: relative;
        height: 100%;

        img {
            object-fit: cover;
            position: absolute;
            height: 100%;
        }
    }
</style>
