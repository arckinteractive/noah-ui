<template>
    <n-div
        flex
        v-editable="$attrs.blok"
        class="content-block"
        gap="large"
    >
        <n-div container>
            <n-div
                v-if="title || subtitle"
                flex
                center-center
            >
                <n-div
                    sm:12
                    :lg:span="contentSpan"
                    text-align="center"
                    class="header"
                >
                    <n-text :tag-name="headingTagName" level="2" v-if="title">{{ title }}</n-text>
                    <n-text v-if="subtitle" level="5">{{ subtitle }}</n-text>
                </n-div>
            </n-div>

            <n-div
                flex
                :gravity="$attrs.blok.gravity"
                :stretched="$attrs.blok.stretched"
            >
                <n-div
                    col
                    sm:12
                    :lg:span="contentSpan"
                >
                    <component
                        v-for="slot in $attrs.blok.content"
                        :key="slot._uid"
                        :blok="slot"
                        v-bind="slot"
                        :is="slot.component | dashify"
                    ></component>
                </n-div>
            </n-div>
        </n-div>
    </n-div>
</template>

<script>
export default {
    inheritAttrs: false,

    props: [
        'title',
        'subtitle',
        'contentSpan',
        'headingTagName',
    ],
};
</script>

<style lang="scss" scoped>
    .header {
        margin-bottom: var(--space-l);

        .n-h5 {
            margin-top: calc(-1 * var(--space-s));
        }
    }
</style>
