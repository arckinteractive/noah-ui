<template>
    <n-table :headers="headers" :items="data">
        <n-table-body :headers="headers" :items="data">
            <template slot="noResults">
                <span class="n-help">This component has no defined public props</span>
            </template>

            <template slot="name" slot-scope="{ item }">
                <span
                    :class="{ required: item.required }"
                    :title="item.required ? 'Required' : null"
                    class="cm-attribute component-meta__item"
                >{{ normalize(item.name) }}</span>
            </template>

            <template slot="type" slot-scope="{ item }">
                <span class="cm-type">{{ normalize(item.type) }}</span>
            </template>

            <template slot="default" slot-scope="{ item }">
                <span class="cm-atom">{{ normalize(item.default) }}</span>
            </template>

            <template slot="description" slot-scope="{ item }">
                <span v-html="markdown(item.description)"></span>
            </template>
        </n-table-body>
    </n-table>
</template>

<script>
import markdown from '../utils/markdown';

export default {
    name: 'ComponentProps',
    props: {
        data: {
            type: Array,
        },
    },

    computed: {
        headers () {
            return [
                {
                    prop: 'name',
                    label: 'Name',
                    width: '20%',
                },
                {
                    prop: 'type',
                    label: 'Type',
                    width: '15%',
                },
                {
                    prop: 'default',
                    label: 'Default',
                    width: '15%',
                },
                {
                    prop: 'description',
                    label: 'Description',
                    width: '40%',
                },
            ];
        },
    },

    methods: {
        normalize (val) {
            return val !== '__undefined__' ? val : '--';
        },

        markdown,
    },
};
</script>
