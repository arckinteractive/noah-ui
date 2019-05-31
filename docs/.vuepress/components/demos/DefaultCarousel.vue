<template>
    <n-carousel>
        <div
            v-for="(url, index) in images"
            :key="index"
        >
            <n-media :ratio="21/9">
                <n-img :src="url"/>
            </n-media>
        </div>
    </n-carousel>
</template>

<script>
export default {
    data () {
        return {
            images: [
                'https://bit.ly/2EylKy7',
                'https://bit.ly/2JDJVzf',
                'https://bit.ly/2X6XMRG',
                'https://bit.ly/2MckEOI',
                'https://bit.ly/2MadE59',
                'https://bit.ly/2HC4Iky',
            ],
        };
    },
};
</script>
