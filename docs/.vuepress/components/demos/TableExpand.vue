<template>
    <n-module type="card" title="Country Profiles">
        <n-table
            :headers="headers"
            :items="sortedItems"
            :defaultSort="sort"
            :expand="true"
            @sort="changeSort"
        >
            <template slot="default" slot-scope="scope">
                <n-table-body v-bind="scope">
                    <template slot="expand" slot-scope="{ item }">
                        <n-codemirror
                            :options="{
                                readOnly: true,
                                mime: 'application/json',
                                lineWrapping: true,
                                lineNumbers: true,
                                line: true,
                            }"
                            :modes="['javascript']"
                            :value="JSON.stringify(item, null, 2)"
                        />
                    </template>

                    <template slot="flag" slot-scope="{ item }">
                        <n-media :ratio="2" width="80px">
                            <n-img
                                :src="require(`svg-country-flags/svg/${item.alpha2Code.toLowerCase()}.svg`)"
                                :alt="item.name"
                            />
                        </n-media>
                    </template>
                </n-table-body>
            </template>
        </n-table>
    </n-module>
</template>

<script>

export default {
    data () {
        return {
            model: {
                countries: [],
            },
            sort: {
                prop: 'name',
                order: 'ascending',
            },
            items: [],
        };
    },

    mounted () {
        const countries = require('../../fixtures/countries');

        this.items = countries.slice(60, 70);
    },

    computed: {
        headers () {
            return [
                {
                    label: 'Code',
                    prop: 'alpha2Code',
                    sortable: true,
                    width: '10%',
                    centered: true,
                },
                {
                    label: 'Flag',
                    prop: 'flag',
                    width: '10%',
                    centered: true,
                },
                {
                    label: 'Name',
                    prop: 'name',
                    sortable: true,
                    width: '20%',
                },
                {
                    label: 'Capital',
                    prop: 'capital',
                    sortable: true,
                    width: '20%',
                },
            ];
        },

        sortedItems () {
            const items = this.items.slice(0);
            const prop = this.sort.prop;
            const order = this.sort.order;

            const compareText = (a, b) => a[prop].toLowerCase().localeCompare(b[prop]);
            const compareNumber = (a, b) => a[prop] - b[prop];

            let callback;

            switch (prop) {
                case 'area' :
                    callback = compareNumber;
                    break;

                default:
                    callback = compareText;
                    break;
            }

            const sorted = items.sort(callback);

            return order === 'descending' ? sorted.reverse() : sorted;
        },
    },

    methods: {
        changeSort ({ prop, order }) {
            this.sort.prop = prop;
            this.sort.order = order;
        },
    },
};
</script>
