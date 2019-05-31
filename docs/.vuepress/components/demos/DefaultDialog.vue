<template>
    <div>
        <n-button @click="showDialog = true">Show Dialog</n-button>

        <n-dialog
            subtitle="Dialog subtitle"
            title="Dialog Title"
            medium
            v-model="showDialog"
        >
            <n-div padding="medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum pellentesque elit nec
                elementum. Cras pulvinar dui vitae interdum commodo. Sed sit amet lorem commodo, feugiat ipsum at,
                finibus mauris. Nulla facilisi. Fusce sit amet lorem dignissim, imperdiet turpis nec, ultrices enim.
                Maecenas quis nulla eleifend, dignissim turpis eget, auctor nisi. Proin sodales eu mi a euismod.
                Proin rhoncus lectus ac consectetur feugiat.
            </n-div>
        </n-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            showDialog: false,
        };
    },
};
</script>
