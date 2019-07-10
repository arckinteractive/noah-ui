<template>
    <n-table :headers="headers" :items="data">
        <template slot="noResults">
            <span class="n-help">This component has no configuration options</span>
        </template>

        <template slot="name" slot-scope="{ item }">
            <span class="cm-attribute component-meta__item">{{ normalize(item.name) }}</span>
        </template>

        <template slot="type" slot-scope="{ item }">
            <span class="cm-type">{{ normalize(item.type) }}</span>
        </template>

        <template slot="value" slot-scope="{ item }">
            <span class="cm-atom">{{ normalize(item.value) }}</span>
        </template>

        <template slot="description" slot-scope="{ item }">
            <span class="cm-atom" v-html="markdown(item.description)"></span>
        </template>
    </n-table>
</template>

<script>
import markdown from '../utils/markdown';

export default {
    name: 'ComponentConfig',

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
                    width: '15%',
                },
                {
                    prop: 'type',
                    label: 'Type',
                    width: '15%',
                },
                {
                    prop: 'value',
                    label: 'Value',
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
