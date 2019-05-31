<template>
    <div>
        <n-img
            src="https://bit.ly/2VJIoy5"
            alt="Unsplash Image"
            width="200"
        />
    </div>
</template>

<script>
export default {
    mounted () {
        this.$nextTick(() => {
            this.createIntersectionObserver();
        });
    },

    watch: {
        '$data.$inViewport': {
            handler () {
                if (this.$data.$inViewport) {
                    this.$alert('Component scrolled into viewport');
                }
            },
        },
    },
};
</script>

<style scoped lang="scss">

</style>
