<template>
    <n-div flex center-top gap="small">
        <n-badge
            v-for="(size, key) in $config.sizes"
            :key="size"
            :size="size"
            :value="Math.random().toFixed(2)"
        ></n-badge>
    </n-div>
</template>
