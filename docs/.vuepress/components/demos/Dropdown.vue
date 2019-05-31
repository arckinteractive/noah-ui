<template>
    <n-div flex>
        <ClientOnly>
            <n-popup
                placement="bottom-end"
                v-model="visible"
            >
                <template slot="trigger">
                    <n-button
                        suffix-icon="fas fa-caret-down fa-xs"
                        text="Show Dropdown"
                        @click="visible != visible"
                    >
                    </n-button>
                </template>

                <LoremCard/>
            </n-popup>
        </ClientOnly>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            visible: false,
        };
    },
};
</script>
