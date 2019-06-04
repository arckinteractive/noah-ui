<template>
    <n-table :headers="headers" :items="data">
        <n-table-body :headers="headers" :items="data">
            <template slot="noResults">
                <span class="n-help">This component does expose any public methods</span>
            </template>

            <template slot="name" slot-scope="{ item }">
                <span class="cm-def">{{ normalize(item.name) }}()</span>
            </template>

            <template slot="description" slot-scope="{ item }">
                <p v-html="markdown(item.description)"></p>

                <n-table :headers="paramHeaders" :items="item.params">
                    <div slot="headers"></div>
                    <n-table-body :headers="paramHeaders" :items="item.params">
                        <template slot="noResults">
                            <span class="n-help">This method receives no arguments</span>
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

            <template slot="return" slot-scope="{ item }">
                <p>{{ item.return.description }}</p>
                <span class="cm-type">{{ normalize(item.return.type) }}</span>
            </template>
        </n-table-body>
    </n-table>
</template>

<script>
import markdown from '../utils/markdown';

export default {
    name: 'ComponentMethods',

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
                    prop: 'return',
                    label: 'Return',
                    width: '20%',
                },
                {
                    prop: 'description',
                    label: 'Description / Props',
                    width: '60%',
                },
            ];
        },

        paramHeaders () {
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
