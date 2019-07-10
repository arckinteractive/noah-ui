<template>
    <n-data-table
        :headers="headers"
        :items="items"
        :total="total"
        :per-page="perPage"
        :search="search"
        :loading="loading"
        :sort="sort"
        @reload="reload"
    >
        <template v-slot:search>
            <n-form @submit="doSearch">
                <n-div flex padding="small" gap="small" right-center>
                    <n-text-field
                        v-model="searchModel.name"
                        placeholder="Search by name"
                        prefix-icon="fas fa-search"
                    />

                    <n-button
                        primary
                        text="Search"
                    />
                </n-div>
            </n-form>
        </template>

        <template v-slot:checkbox="{ item }">
            <n-checkbox
                v-model="model.countries"
                :option="item.alpha2Code"
            />
        </template>

        <template v-slot:alpha2Code="{ item }">
            <a
                :href="`https://en.wikipedia.org/wiki/ISO_3166-2:${item.alpha2Code}`"
                target="_blank"
            >{{ item.alpha2Code }}
            </a>
        </template>

        <template v-slot:name="{ item }">
            <n-tile
                :title="item.name"
                :subtitle="item.nativeName"
            >
                <n-media avatar slot="icon">
                    <n-img
                        :src="require(`svg-country-flags/svg/${item.alpha2Code.toLowerCase()}.svg`)"
                    />
                </n-media>
            </n-tile>
        </template>

        <template v-slot:noResults>
            There are no items matching your request
        </template>
    </n-data-table>
</template>

<script>
const getRemoteData = (filter) => {
    const {
        pageSize,
        currentPage,
        sortProperty,
        sortOrder,
        search,
    } = filter;

    return new Promise((resolve) => {
        setTimeout(() => {
            const data = require('../../fixtures/countries');

            const offset = pageSize * (currentPage - 1);

            const countries = data.slice(0).filter((e) => {
                if (!search.name) {
                    return true;
                }

                return e.name.toLowerCase().includes(search.name.toLowerCase());
            });

            const compareText = (a, b) => a[sortProperty].toLowerCase().localeCompare(b[sortProperty]);
            const compareNumber = (a, b) => a[sortProperty] - b[sortProperty];

            let callback;

            switch (sortProperty) {
                case 'area' :
                    callback = compareNumber;
                    break;

                default:
                    callback = compareText;
                    break;
            }

            const sorted = countries.sort(callback);
            const ordered = sortOrder === 'descending' ? sorted.reverse() : sorted;

            resolve({
                items: ordered.slice(offset, offset + pageSize),
                total: ordered.length,
            });

        }, 1000);
    });
};

export default {
    data () {
        return {
            model: {
                countries: [],
            },
            sort: {
                prop: 'alpha2Code',
                order: 'ascending',
            },
            items: [],
            perPage: 10,
            total: null,
            search: {},
            searchModel: {
                name: '',
            },
            loading: false,
        };
    },

    computed: {
        headers () {
            return [
                {
                    label: '',
                    prop: 'checkbox',
                    sortable: false,
                    width: '10%',
                    centered: true,
                },
                {
                    label: 'Code',
                    prop: 'alpha2Code',
                    sortable: true,
                    width: '10%',
                    centered: true,
                },
                {
                    label: 'Name',
                    prop: 'name',
                    sortable: true,
                    width: '50%',
                },
                {
                    label: 'Area',
                    prop: 'area',
                    sortable: true,
                    width: '20%',
                    centered: true,
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
        reload (props) {
            this.loading = true;

            getRemoteData(props).then((data) => {
                this.items = data.items;
                this.total = data.total;

                this.loading = false;
            });
        },

        doSearch() {
            this.search = Object.assign({}, this.searchModel);
        }
    },
};
</script>
