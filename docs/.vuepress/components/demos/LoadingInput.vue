<template>
    <n-div flex>
        <n-control loading prefix-icon="fas fa-search" col sm:12 md:6>
            <template slot="default" slot-scope="{ loading }">
                <input type="text" value="Needs async validation" :disabled="loading"/>
            </template>
        </n-control>
    </n-div>
</template>
