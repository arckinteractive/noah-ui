<template>
    <n-div flex divided stacked stretched>
        <n-tile icon="fas fa-envelope" title="Notifications">
            <n-badge circle danger slot="badge" value="12"></n-badge>
        </n-tile>

        <n-tile icon="fas fa-credit-card" title="Payments">
            <n-badge primary slot="badge" value="$120"></n-badge>
        </n-tile>
    </n-div>
</template>
