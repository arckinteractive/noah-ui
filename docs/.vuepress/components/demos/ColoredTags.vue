<template>
    <n-div flex gap="small">
        <n-tag
            v-for="(color, index) in $config.palettes"
            :key="index"
            :color="color"
            closable
            small
        >
            {{ color }}
        </n-tag>
    </n-div>
</template>
