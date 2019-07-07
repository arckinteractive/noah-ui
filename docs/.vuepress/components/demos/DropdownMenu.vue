<template>
    <n-popup placement="right-start">
        <n-button
            slot="trigger"
            primary
            circle
            icon="fas fa-ellipsis-h"
        ></n-button>

        <Sidebar></Sidebar>
    </n-popup>
</template>

<script>
import Sidebar from '../Sidebar';

export default {
    components: { Sidebar },
};
</script>
