<template>
    <n-div flex right-center>
        <ClientOnly>
            <template v-if="$viewport.isTabletDown">
                <router-link to="/" tag="h1">NoahUI</router-link>

                <n-div sm:narrow>
                    <n-button
                        circle
                        ghost
                        white
                        xlarge
                        :icon="showDrawer ? 'fas fa-times' : 'fas fa-bars'"
                        @click="showDrawer = !showDrawer"
                    />
                </n-div>

                <n-drawer
                    attachment="right"
                    v-model="showDrawer"
                >
                    <n-div padding="medium">
                        <n-button
                            outlined
                            primary
                            href="https://github.com/arckinteractive/noah-ui"
                            target="_blank"
                            text="Fork & Go"
                            icon="fab fa-github"
                            style="width: 100%"
                        ></n-button>
                    </n-div>

                    <hr/>

                    <n-div padding="medium">
                        <SearchBox style="width: 100%"/>
                    </n-div>

                    <hr/>

                    <Sidebar/>
                </n-drawer>
            </template>

            <template v-else>
                <n-div flex right-center>
                    <n-button
                        outlined
                        white
                        href="https://github.com/arckinteractive/noah-ui"
                        target="_blank"
                        text="Fork & Go"
                        icon="fab fa-github"
                    ></n-button>

                    <SearchBox/>
                </n-div>
            </template>
        </ClientOnly>
    </n-div>
</template>

<script>
import SearchBox from './SearchBox';
import NButton from '../../../src/atoms/NButton';
import NDrawer from '../../../src/organisms/NDrawer';

export default {
    components: {
        NDrawer,
        NButton,
        SearchBox,
    },

    data () {
        return {
            showDrawer: false,

            items: [
                {
                    title: 'Download',
                    to: '/download',
                    icon: 'fas fa-download',
                },
                {
                    title: 'Git',
                    to: '/git',
                    icon: 'fab fa-github',
                },
            ],
        };
    },
};
</script>

<style scoped lang="scss">
    .nd-topbar__logo {

    }
</style>
