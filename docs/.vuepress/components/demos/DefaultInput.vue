<template>
    <n-div flex>
        <n-control prefix-icon="fas fa-link" col md:4 sm:12>
            <input placeholder="Left Icon" type="text"/>
        </n-control>

        <n-control suffix-icon="fas fa-calendar" col md:4 sm:12>
            <input placeholder="Right Icon" type="text"/>
        </n-control>

        <n-control col md:4 sm:12>
            <n-popup placement="bottom-end" size="auto" slot="prefixIcon">
                <div slot="trigger">
                    <n-icon icon="fab fa-facebook-f"></n-icon>
                    <n-icon icon="fas fa-chevron-down fa-xs"></n-icon>
                </div>

                <n-div padding="medium">
                    <n-div flex>
                        <n-icon icon="fab fa-facebook-f"></n-icon>
                        <n-icon icon="fab fa-twitter"></n-icon>
                        <n-icon icon="fab fa-instagram"></n-icon>
                    </n-div>
                </n-div>
            </n-popup>

            <input placeholder="Icon Slot" type="text"/>
        </n-control>
    </n-div>
</template>
