<template>
    <n-div flex stacked>
        <n-div flex>
            <n-icon v-for="icon in icons" :key="icon" :icon="icon"></n-icon>
        </n-div>

        <n-div flex>
            <n-icon v-for="icon in icons" :key="icon" :icon="icon" text-color="primary"></n-icon>
        </n-div>

        <n-div flex>
            <n-icon v-for="icon in icons" :key="icon" :icon="icon" text-size="large"></n-icon>
        </n-div>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            icons: [
                'fas fa-users',
                'fab fa-github',
                'far fa-envelope',
            ],
        };
    },
};
</script>

