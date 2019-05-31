<template>
    <n-div flex>
        <n-div
            v-for="(url, index) in images"
            :key="index"
            col sm:12 md:4
        >
            <n-media>
                <n-img alt="Unsplash" :src="url"/>
            </n-media>
        </n-div>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            images: [
                'https://bit.ly/2W8ZIfd',
                'https://bit.ly/2Eh11ia',
                'https://bit.ly/2w7Mp0e',
            ],
        };
    },
};
</script>
