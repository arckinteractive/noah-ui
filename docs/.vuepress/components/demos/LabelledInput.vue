<template>
    <n-div flex>
        <n-control prefix-label="$" col sm:12 md:6>
            <input step="0.01" type="number" value="0.00"/>
        </n-control>

        <n-control suffix-label="%" col sm:12 md:6>
            <input step="1" type="number" value="10"/>
        </n-control>
    </n-div>
</template>
