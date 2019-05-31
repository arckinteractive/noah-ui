<template>
    <n-table :headers="headers" :items="data">
        <n-table-body :headers="headers" :items="data">
            <template slot="noResults">
                <span class="n-help">This component does not render any parent slots</span>
            </template>

            <template slot="name" slot-scope="{ item }">
                <span class="cm-attribute">{{ normalize(item.name) }}</span>
            </template>

            <template slot="description" slot-scope="{ item }">
                <p v-html="markdown(item.description)"></p>

                <n-table :headers="propHeaders" :items="item.props">
                    <div slot="headers"></div>
                    <n-table-body :headers="propHeaders" :items="item.props">
                        <template slot="noResults">
                            <span class="n-help">This slot has no scoped props</span>
                        </template>

                        <template slot="name" slot-scope="{ item }">
                            <span class="cm-attribute">{{ normalize(item.name) }}</span>
                        </template>

                        <template slot="type" slot-scope="{ item }">
                            <span class="cm-type">{{ normalize(item.type) }}</span>
                        </template>
                    </n-table-body>
                </n-table>
            </template>
        </n-table-body>
    </n-table>
</template>

<script>
import markdown from '../../../src/filters/markdown';

export default {
    name: 'ComponentSlots',

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
                    prop: 'description',
                    label: 'Description / Props',
                    width: '80%',
                },
            ];
        },

        propHeaders () {
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
