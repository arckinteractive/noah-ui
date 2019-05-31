<template>
    <n-div flex stacked>
        <n-checkbox-group
            v-model="model"
            label="Which animals do you have at home?"
            :options="options"
            labelProp="name"
            valueProp="id"
            indeterminate="I have them all"
            stacked
        ></n-checkbox-group>

        <p>Current value: {{ model }}</p>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            model: [],
            options: [
                {
                    name: 'Cats',
                    id: 1,
                },
                {
                    name: 'Dogs',
                    id: 5,
                },
                {
                    name: 'Rats',
                    id: 18,
                },
            ],
        };
    },
};
</script>
