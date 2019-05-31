<template>
    <n-module type="card">
        <n-tile large slot="header">
            <n-media
                avatar
                slot="icon"
            >
                <n-img
                    alt="Avatar"
                    src="https://bit.ly/2Qb2PxY"
                />
            </n-media>

            <div class="n-h3">Sirens of the Sea</div>
            <div class="n-help">
                By
                <a>Emzara</a>
                4 days ago
            </div>
        </n-tile>

        <n-media :ratio="21/9" slot="media">
            <n-img
                alt="Sea"
                src="https://bit.ly/2VsOaPG"
            />
            <div slot="caption">
                By
                <a href="https://unsplash.com/@clemono2">@clemono</a>
                | Unsplash
            </div>
        </n-media>

        <n-div padding="medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum pellentesque elit nec
            elementum. Cras pulvinar dui vitae interdum commodo. Sed sit amet lorem commodo, feugiat ipsum at, finibus
            mauris. Nulla facilisi. Fusce sit amet lorem dignissim, imperdiet turpis nec, ultrices enim. Maecenas quis
            nulla eleifend, dignissim turpis eget, auctor nisi. Proin sodales eu mi a euismod. Proin rhoncus lectus ac
            consectetur feugiat.
        </n-div>

        <n-div flex left-center slot="footer" px="medium" py="small">
            <n-button>Action A</n-button>
            <n-button outlined>Action B</n-button>
        </n-div>
    </n-module>
</template>
