<template>
    <n-div flex stacked>
        <n-div flex>
            <n-checkbox v-model="model" option="cats">
                <n-media slot="option" avatar class="image">
                    <n-img src="https://bit.ly/2YT19wa"></n-img>
                </n-media>
            </n-checkbox>

            <n-checkbox v-model="model" option="dogs">
                <n-media slot="option" avatar class="image">
                    <n-img src="https://bit.ly/2XcCbYj"></n-img>
                </n-media>
            </n-checkbox>

            <n-checkbox v-model="model" option="rats">
                <n-media slot="option" avatar class="image">
                    <n-img src="https://bit.ly/2Wd68uA"></n-img>
                </n-media>
            </n-checkbox>
        </n-div>

        <p>Current value: {{ model }}</p>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            model: [],
        };
    },
};
</script>

<style scoped lang="scss">
    /deep/ .n-checkbox {
        .image {
            cursor: pointer;
            width: 80px;
            border: 2px solid transparent;
            transition: all 0.5s;
        }

        &:focus .image,
        &:active .image{
            box-shadow: 0 0 0 4px var(--color-grey);
        }

        &.checked .image {
            box-shadow: 0 0 0 4px var(--color-primary);
        }
    }
</style>
