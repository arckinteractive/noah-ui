<template>
    <n-div flex gap="small">
        <div v-for="placement in placements" :key="placement">
            <n-popup small :placement="placement" :config-callback="configCallback">
                <n-button slot="trigger" outlined>{{ placement }}</n-button>

                <n-div padding="small">
                    <n-img src="https://bit.ly/2YM4AEL" :lazy-load="false"/>
                </n-div>
            </n-popup>
        </div>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            placements: [
                'auto',
                'top-start',
                'top',
                'top-end',
                'bottom-start',
                'bottom',
                'bottom-end',
                'right-start',
                'right',
                'right-end',
                'left-start',
                'left',
                'left-end',
            ],
        };
    },

    methods: {
        configCallback (config) {
            config.modifiers.flip = { enabled: false };
            config.modifiers.preventOverflow = { enabled: false };

            return config;
        },
    },
};
</script>
