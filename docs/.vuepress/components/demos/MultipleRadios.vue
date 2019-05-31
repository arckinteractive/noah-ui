<template>
    <n-div flex stacked>
        <n-div flex>
            <n-radio v-model="model" option="cats">Cats</n-radio>
            <n-radio v-model="model" option="dogs">Dogs</n-radio>
            <n-radio v-model="model" option="rats">Rats</n-radio>
        </n-div>

        <p>Current value: {{ model }}</p>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            model: 'rats',
        };
    },
};
</script>
