<template>
    <n-div flex>
        <template v-for="(size, name) in $config.sizes">
            <n-control :key="name" :size="size" prefix-icon="fas fa-expand">
                <input placeholder="Placeholder" type="text"/>
            </n-control>
        </template>
    </n-div>
</template>
