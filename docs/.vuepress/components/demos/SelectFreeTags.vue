<template>
    <n-div flex stacked stretched>
        <n-select
            v-model="model.single"
            label="Tag"
            required
            placeholder="Select..."
            :options="options"
            labelProp="text"
            valueProp="text"
            @add="addValue"
        ></n-select>

        <n-select
            v-model="model.multiple"
            label="Tags"
            required
            placeholder="Select..."
            :options="options"
            labelProp="text"
            valueProp="text"
            multiple
            @add="addValue"
        ></n-select>

        <p>Current value: {{ model }}</p>
    </n-div>
</template>

<script>
import tags from '../../fixtures/tags';

export default {
    data () {
        return {
            model: {
                single: null,
                multiple: [],
            },
            options: tags,
        };
    },

    methods: {
        addValue (value) {
            this.options.push({
                text: value,
                id: null,
            });
        },
    },
};
</script>
