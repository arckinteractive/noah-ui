<template>
    <n-div bg="white">
        <n-menu :items="items"></n-menu>
    </n-div>
</template>

<script>
export default {
    name: 'Sidebar',
    computed: {
        items () {
            const resolveTree = (e) => {
                const path = e.path || '/';
                const segments = path.substr(1).split('/');
                const id = segments.pop().replace(/.html$/ig, '');

                return {
                    parentId: segments.join('::'),
                    id,
                };
            };

            const toMenuItem = (e) => {
                const config = e.frontmatter;
                const { id, parentId } = resolveTree(e);

                return {
                    ...config,
                    title: config.label || config.title || e.title,
                    to: { path: e.path },
                    expanded: false,
                    selected: this.$route.path === e.path,
                    parentId,
                    id,
                };
            };

            return this.$site.pages.filter(e => !!e.frontmatter.label).map(toMenuItem);
        },
    },
};
</script>
