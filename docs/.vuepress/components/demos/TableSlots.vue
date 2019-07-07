<template>
    <n-module type="card" title="Country Coordinates">
        <n-div padding="medium">Selected Countries: {{ model.countries }}</n-div>

        <n-table
            :headers="headers"
            :items="sortedItems"
            :defaultSort="sort"
            @sort="changeSort"
        >
            <template slot="default" slot-scope="scope">
                <n-table-body v-bind="scope">
                    <template slot="checkbox" slot-scope="{ item }">
                        <n-checkbox
                            v-model="model.countries"
                            :option="item.alpha2Code"
                        />
                    </template>

                    <template slot="alpha2Code" slot-scope="{ item }">
                        <a
                            :href="`https://en.wikipedia.org/wiki/ISO_3166-2:${item.alpha2Code}`"
                            target="_blank"
                        >{{ item.alpha2Code }}
                        </a>
                    </template>

                    <template slot="name" slot-scope="{ item }">
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

                    <template slot="coordinates" slot-scope="{ item }">
                        <strong v-html="convertDMS(item.latlng[0], item.latlng[1])"></strong>
                    </template>
                </n-table-body>
            </template>
        </n-table>
    </n-module>
</template>

<script>
// https://stackoverflow.com/questions/37893131/how-to-convert-lat-long-from-decimal-degrees-to-dms-format/37893239#37893239
const toDegreesMinutesAndSeconds = (coordinate) => {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + ' ' + minutes + ' ' + seconds;
};
// https://stackoverflow.com/questions/37893131/how-to-convert-lat-long-from-decimal-degrees-to-dms-format/37893239#37893239
const convertDMS = (lat, lng) => {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? 'N' : 'S';

    var longitude = toDegreesMinutesAndSeconds(lng);
    var longitudeCardinal = lng >= 0 ? 'E' : 'W';

    return latitude + ' ' + latitudeCardinal + '<br />' + longitude + ' ' + longitudeCardinal;
};

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
                    label: 'Coordinates',
                    prop: 'coordinates',
                    sortable: false,
                    width: '30%',
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

        convertDMS,
    },
};
</script>
