<template>
    <n-module type="card" title="Heaviest Land Mammals">
        <n-table
            :headers="headers"
            :items="sortedItems"
            :defaultSort="sort"
            @sort="changeSort"
        ></n-table>
    </n-module>
</template>

<script>
export default {
    data () {
        return {
            sort: {
                prop: 'rank',
                order: 'ascending',
            },
            items: [
                {
                    rank: 1,
                    name: 'African Elephant',
                    family: 'Elephantidae',
                },
                {
                    rank: 2,
                    name: 'Asian Elephant',
                    family: 'Elephantidae',
                },
                {
                    rank: 3,
                    name: 'White Rhinoceros',
                    family: 'Rhinocerotidae',
                },
                {
                    rank: 4,
                    name: 'Gaur',
                    family: 'Bovidae',
                },
                {
                    rank: 5,
                    name: 'Black Rhinoceros',
                    family: 'Rhinocerotidae',
                },
            ],
        };
    },

    computed: {
        headers () {
            return [
                {
                    label: 'Rank',
                    prop: 'rank',
                    sortable: true,
                    width: '5%',
                    hidden: this.$viewport.isTabletDown,
                    centered: true,
                },
                {
                    label: 'Name',
                    prop: 'name',
                    sortable: true,
                    width: '20%',
                },
                {
                    label: 'Family',
                    prop: 'family',
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
                case 'rank' :
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
