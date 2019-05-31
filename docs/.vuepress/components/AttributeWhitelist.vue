<template>
    <n-table :headers="headers" :items="$config.style.whitelist">
        <n-table-body :headers="headers" :items="$config.style.whitelist">
            <template slot="name" slot-scope="{ item }">
                <div
                    v-for="(attr, index) in item.attr"
                    class="cm-attribute component-meta__item"
                >
                    {{ attr }}
                </div>
            </template>

            <template slot="prefix" slot-scope="{ item }">
                <span class="cm-atom">{{ item.classPrefix }}</span>
            </template>

            <template slot="class" slot-scope="{ item }">
                <span class="cm-atom">{{ item.class }}</span>
            </template>

            <template slot="responsive" slot-scope="{ item }">
                <n-icon v-if="item.responsive" icon="fas fa-check" text-color="success"></n-icon>
                <n-icon v-else icon="fas fa-times" text-color="danger"></n-icon>
            </template>
        </n-table-body>
    </n-table>
</template>

<script>
export default {
    computed: {
        headers () {
            return [
                {
                    prop: 'name',
                    label: 'Attribute',
                    width: '15%',
                },
                {
                    prop: 'prefix',
                    label: 'Resulting Class Prefix',
                    width: '15%',
                },
                {
                    prop: 'class',
                    label: 'Resulting Class',
                    width: '15%',
                },
                {
                    prop: 'responsive',
                    label: 'Responsive',
                    width: '15%',
                },
            ];
        },
    },
};
</script>

<style scoped lang="scss">

</style>
