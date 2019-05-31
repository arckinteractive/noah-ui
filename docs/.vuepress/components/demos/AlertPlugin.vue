<template>
    <n-div flex left-center>
        <n-button
            v-for="(color, index) in $config.palettes"
            :key="index"
            :color="color"
            prefix-icon="fas fa-comment-dots"
            @click="emit(color)"
        >
            Emit {{ color }}
        </n-button>
    </n-div>
</template>

<script>
export default {
    methods: {
        emit (color) {
            this.$alert(`This is a ${color} alert`, color);
        },
    },
};
</script>
