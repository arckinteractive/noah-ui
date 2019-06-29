<template>
    <div class="nd-page">
        <div class="nd-main">
            <div class="nd-layout">
                <n-div class="nd-sidebar-col" flex stacked stretched gap="none">
                    <n-div
                        class="nd-top"
                        flex
                        right-center
                    >
                        <router-link to="/" tag="h1">NoahUI</router-link>
                    </n-div>

                    <Sidebar class="nd-sidebar"/>
                </n-div>

                <n-div class="nd-content-col" flex stacked stretched gap="none">
                    <n-div
                        class="nd-top"
                        flex
                        right-center
                    >
                        <Topbar class="nd-topbar"/>
                    </n-div>

                    <Content class="nd-content content"/>
                </n-div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Layout',
};
</script>

<style scoped lang="scss">
    @import '../../../src/styles/media-queries';

    .nd-layout {
        position: relative;
        max-width: 1080px;
        margin: 0 auto;

        @media #{$is-desktop-up} {
            display: grid;
            grid-template-columns: 240px 1fr;
            grid-gap: 40px;
        }
    }

    .nd-sidebar-col {
        display: none;

        @media #{$is-desktop-up} {
            display: block;
        }
    }

    .nd-sidebar {
        box-shadow: var(--box-shadow-s);
    }

    .nd-content-col {
        @media #{$is-desktop-up} {
            padding: 0;
        }
    }

    .nd-content {
        background: var(--color-white);
        box-shadow: var(--box-shadow-s);
        padding: var(--space-s) var(--space-m);

        @media #{$is-tablet-up} {
            padding: var(--space-m) var(--space-m) var(--space-m) var(--space-xl);
        }
    }

    .nd-top, .nd-topbar {
        height: 160px;
    }

    .nd-top {
        color: var(--color-white);
    }
</style>

