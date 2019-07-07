<template>
    <div>
        <n-button
            warning
            ref="trigger"
            @mouseenter="show"
            @mouseleave="hide"
        >Hover
        </n-button>

        <n-popup v-model="visible" :trigger="trigger" large placement="top">
            <n-img src="https://bit.ly/2W5enZK"/>
        </n-popup>
    </div>
</template>

<script>
export default {
    data () {
        return {
            trigger: null,
            visible: false,
        };
    },

    mounted () {
        this.trigger = this.$refs.trigger.$el;
    },

    methods: {
        show () {
            this.visible = true;
        },

        hide () {
            this.visible = false;
        },
    },
};
</script>

<style scoped lang="scss">

</style>
