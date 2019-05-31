<template>
    <n-div flex stacked>
        <n-radio-group
            v-model="model"
            label="Which animal is your favorite?"
            :options="options"
            labelProp="name"
            valueProp="id"
            stacked
        ></n-radio-group>

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
