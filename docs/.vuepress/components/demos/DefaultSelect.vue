<template>
    <n-div flex stacked>
        <n-select
            v-model="model"
            label="Select your country"
            required
            placeholder="Select..."
            :options="countries"
            labelProp="name"
            valueProp="alpha2Code"
        ></n-select>

        <p>Current value: {{ model }}</p>
    </n-div>
</template>

<script>
import countries from '../../fixtures/countries';

export default {
    data () {
        return {
            model: null,
            countries,
        };
    },
};
</script>
