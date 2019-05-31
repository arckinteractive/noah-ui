<template>
    <n-text-field
        help="Please enter city and state information"
        label="Location"
        prefix-icon="fas fa-map-marker-alt"
        required
        v-model="model"
    ></n-text-field>
</template>

<script>
export default {
    data () {
        return {
            model: '',
        };
    },
};
</script>
