<template>
    <n-div flex stacked>
        <n-radio
            v-model="model"
        >
            <span>Option</span>
        </n-radio>

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
