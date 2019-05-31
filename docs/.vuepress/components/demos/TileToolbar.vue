<template>
    <n-tile>
        <n-button circle ghost slot="icon">
            <n-icon icon="fas fa-arrow-left"></n-icon>
        </n-button>

        <div>
            <div class="n-h3">Hello, world!</div>
        </div>

        <n-div flex left-center slot="actions">
            <n-button circle ghost>
                <n-icon icon="fas fa-th"></n-icon>
            </n-button>

            <n-button circle ghost>
                <n-icon icon="fas fa-ellipsis-v"></n-icon>
            </n-button>
        </n-div>
    </n-tile>
</template>
