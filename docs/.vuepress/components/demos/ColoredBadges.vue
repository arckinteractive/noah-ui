<template>
    <n-div flex gap="small">
        <n-badge
            v-for="(color, key) in $config.palettes"
            :key="key"
            :color="color"
            :value="color.substr(0, 1).toUpperCase()"
        ></n-badge>
    </n-div>
</template>
