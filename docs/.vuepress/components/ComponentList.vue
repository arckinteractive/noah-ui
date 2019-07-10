<template>
    <n-table :headers="headers" :items="components" my="large">
        <template slot="name" slot-scope="{ item }">
            <strong>{{ item.name }}</strong>
        </template>

        <template slot="path" slot-scope="{ item }">
            <span class="cm-atom">{{ item.path }}</span>
        </template>

        <template slot="async" slot-scope="{ item }">
            <n-icon v-if="item.async" icon="fas fa-check" text-color="success"></n-icon>
            <n-icon v-else icon="fas fa-times" text-color="danger"></n-icon>
        </template>
    </n-table>
</template>

<script>
import docs from '../docs.json';

export default {
    data () {
        return {
            docs,
        };
    },

    computed: {
        components () {
            const components = [];

            Object.keys(this.$config.components).forEach((name) => {
                const component = this.$config.components[name];
                const docs = this.docs.find((e) => e.name === name);

                component.name = name;
                component.description = docs ? docs.description : '';

                components.push(component);
            });

            return components;
        },

        headers () {
            return [
                {
                    prop: 'name',
                    label: 'Component',
                    width: '20%',
                },
                {
                    prop: 'path',
                    label: 'Path',
                    width: '15%',
                },
                {
                    prop: 'async',
                    label: 'Async',
                    width: '10%',
                    centered: true,
                },
                {
                    prop: 'description',
                    label: 'Description',
                    width: '60%',
                },
            ];
        },
    },
};
</script>
