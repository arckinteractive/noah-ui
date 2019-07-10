<template>
    <div>
        <n-button
            warning
            ref="trigger"
            @mouseenter="show"
            @mouseleave="hide"
            @touchstart="show"
            @touchend="hide"
        >Hover
        </n-button>

        <n-popup
            v-model="visible"
            :trigger="trigger"
            :configCallback="configCallback"
            :placement="{ sm: 'bottom-end', lg: 'bottom' }"
            small
        >
            <n-div padding="small">
                <n-img src="https://bit.ly/2W5enZK" :lazy-load="false"/>
            </n-div>
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

        configCallback (config) {
            config.modifiers.flip = {
                enabled: false,
            };

            config.modifiers.preventOverflow = {
                enabled: false,
            };

            return config;
        },
    },
};
</script>

<style scoped lang="scss">

</style>
