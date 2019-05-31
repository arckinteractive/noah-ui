<template>
    <n-hero
        large
        center-bottom
        overlay-color="black"
    >
        <n-img
            slot="background"
            alt="Unsplash"
            src="https://bit.ly/30sDJPN"
        />

        <n-div
            flex
            center-center
            stacked
            gap="large"
            text-color="white"
            text-align="center"
        >
            <div>
                <n-text level="1">Neque porro quisquam est qui dolorem ipsum</n-text>
                <n-text level="4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris semper orci
                    justo, et blandit leo feugiat non.
                </n-text>
            </div>

            <div>
                <n-button
                    xlarge
                    danger
                    suffix-icon="fas fa-arrow-right fa-xs"
                    text="Ipsum"
                ></n-button>
            </div>
        </n-div>
    </n-hero>
</template>
