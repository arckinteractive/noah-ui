<template>
    <n-div flex stacked>
        <n-div flex>
            <n-checkbox v-model="model" option="cats">Cats</n-checkbox>
            <n-checkbox v-model="model" option="dogs">Dogs</n-checkbox>
            <n-checkbox v-model="model" option="rats">Rats</n-checkbox>
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
