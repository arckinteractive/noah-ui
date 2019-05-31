<template>
    <n-div flex center-bottom gap="small">
        <n-button
            :key="size"
            :size="size"
            prefix-icon="fas fa-expand"
            v-for="(size, key) in $config.sizes"
        >{{ size }}
        </n-button>
    </n-div>
</template>
