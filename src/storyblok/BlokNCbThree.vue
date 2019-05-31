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
                col
                sm:12
                :lg:span="contentSpan"
            >
                <n-div col sm:12 md:4>
                    <component
                        v-for="slot in $attrs.blok.contentLeft"
                        :key="slot._uid"
                        :blok="slot"
                        v-bind="slot"
                        :is="slot.component | dashify"
                    ></component>
                </n-div>

                <n-div col sm:12 md:4>
                    <component
                        v-for="slot in $attrs.blok.contentMiddle"
                        :key="slot._uid"
                        :blok="slot"
                        v-bind="slot"
                        :is="slot.component | dashify"
                    ></component>
                </n-div>

                <n-div col sm:12 md:4>
                    <component
                        v-for="slot in $attrs.blok.contentRight"
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
        margin-bottom: var(--current-space);

        .n-h5 {
            margin-top: calc(-1 * var(--space-s));
        }
    }
</style>
