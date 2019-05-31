<template>
    <n-div flex stacked stretched>
        <n-select
            v-model="model"
            label="Which countries have you lived in?"
            placeholder="Select..."
            :options="countries"
            labelProp="name"
            valueProp="alpha2Code"
            multiple
            :rules="rules"
            help="Please select up to 5 countries"
        ></n-select>

        <p>Current value: {{ model }}</p>
    </n-div>
</template>

<script>
import countries from '../../fixtures/countries';
import validators from '../../../../src/utils/validators';

export default {
    data () {
        return {
            model: [],
            rules: [
                validators.maxLength(5, 'You can select maximum of 5 countries'),
            ],
            countries,
        };
    },
};
</script>
