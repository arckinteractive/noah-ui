<template>
    <n-div flex>
        <template v-for="(color, index) in $config.palettes">
            <n-control
                :color="color"
                :key="index"
                prefix-icon="fas fa-swatchbook"
                prefix-label="#"
                col sm:4
            >
                <input :value="color" type="text"/>
            </n-control>
        </template>
    </n-div>
</template>
