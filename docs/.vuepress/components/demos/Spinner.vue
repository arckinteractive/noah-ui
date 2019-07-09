<template>
    <n-hero v-spinner="isLoading" grey faded small right-top>
        <n-button
            text="Start Spinner"
            black
            large
            @click.native="startSpinner"
        ></n-button>
    </n-hero>
</template>

<script>
export default {
    data () {
        return {
            isLoading: false,
        };
    },

    methods: {
        startSpinner () {
            this.isLoading = true;

            setTimeout(() => {
                this.isLoading = false;
            }, 2000);
        },
    },
};
</script>
