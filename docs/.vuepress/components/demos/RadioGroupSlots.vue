<template>
    <n-div flex stacked>
        <n-radio-group
            v-model="model"
            label="Which animal is your favorite?"
            :options="options"
            labelProp="name"
            valueProp="id"
            gap="medium"
        >
            <template slot="option" slot-scope="{ option }">
                <n-media avatar class="image">
                    <n-img :src="option.image"></n-img>
                </n-media>
            </template>
        </n-radio-group>

        <p>Current value: {{ model }}</p>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            model: 18,
            options: [
                {
                    name: 'Cats',
                    id: 1,
                    image: 'https://bit.ly/2YT19wa',
                },
                {
                    name: 'Dogs',
                    id: 5,
                    image: 'https://bit.ly/2XcCbYj',
                },
                {
                    name: 'Rats',
                    id: 18,
                    image: 'https://bit.ly/2Wd68uA',
                },
            ],
        };
    },
};
</script>


<style scoped lang="scss">
    /deep/ .n-radio {
        margin-top: var(--space-m);

        .image {
            cursor: pointer;
            width: 80px;
            border: 2px solid transparent;
            transition: all 0.5s;
        }

        &:focus .image,
        &:active .image {
            box-shadow: 0 0 0 4px var(--color-grey);
        }

        &.checked .image {
            box-shadow: 0 0 0 4px var(--color-primary);
        }
    }
</style>
