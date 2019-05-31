<template>
    <n-hero
        v-editable="$attrs.blok"
        v-bind="$props"
    >
        <template slot="background">
            <n-img
                :src="imgSrc"
                :srcVt="imgSrcVt"
                alt="Cover Image"
            />
        </template>

        <n-div container>
            <n-div
                flex
                center-top
            >
                <n-div
                    col
                    sm:12
                    :lg:span="contentSpan"
                    lg:mx="auto"
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
    </n-hero>
</template>

<script>
export default {
    props: [
        'color',
        'overlayColor',
        'size',
        'gravity',
        'textAlign',
        'textColor',
        'imgSrc',
        'imgSrcVt',
        'contentSpan',
    ],
};
</script>
