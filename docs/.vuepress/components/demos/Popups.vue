<template>
    <n-div flex gap="small">
        <div v-for="placement in placements" :key="placement">
            <ClientOnly>
                <n-popup :placement="placement" open-on-hover>
                    <n-button slot="trigger" outlined>{{ placement }}</n-button>

                    <n-img src="https://bit.ly/2YM4AEL"/>
                </n-popup>
            </ClientOnly>
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
};
</script>
