<template>
    <n-module type="card">
        <n-media
            slot="media"
            tag-name="a"
            :href="href"
            :ratio="ratio"
            :aria-label="title"
        >
            <n-img
                v-if="imgSrc || imgSrcVt"
                :src="imgSrc | resize('600x0')"
                :srcVt="imgSrcVt | resize('0x600')"
                :alt="title"
            />
        </n-media>

        <n-div padding="medium" :text-align="textAlign" flex stacked>
            <div>
                <n-text :tag-name="headingTagName" level="3" v-if="title">{{ title }}</n-text>
                <n-text v-if="subtitle" level="6">{{ subtitle }}</n-text>
            </div>

            <component
                v-for="slot in $attrs.blok.content"
                :key="slot._uid"
                :blok="slot"
                v-bind="slot"
                :is="slot.component | dashify"
            ></component>
        </n-div>
    </n-module>
</template>

<script>
export default {
    inheritAttrs: false,

    props: ['ratio', 'title', 'subtitle', 'href', 'imgSrc', 'imgSrcVt', 'headingTagName', 'textAlign'],
};
</script>
