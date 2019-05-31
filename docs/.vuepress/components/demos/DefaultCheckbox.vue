<template>
    <n-div flex stacked>
        <n-checkbox
            v-model="model"
        >
            <span>I have read and understood <a>Terms & Conditions</a></span>
        </n-checkbox>

        <p>Current value: {{ model }}</p>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            model: false,
        };
    },
};
</script>
