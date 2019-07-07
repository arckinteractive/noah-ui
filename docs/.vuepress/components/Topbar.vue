<template>
    <n-div flex right-center>
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
                <Sidebar/>
            </n-drawer>
        </template>
    </n-div>
</template>

<script>
import SearchBox from './SearchBox';
import NButton from '../../../src/elements/NButton';
import NDrawer from '../../../src/patterns/NDrawer';

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
