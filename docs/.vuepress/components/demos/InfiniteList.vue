<template>
    <n-infinite-list
        :items="items"
        :total="total"
        :per-page="perPage"
        :loading="loading"
        striped
        divided
        :repeat="5"
        @load="load"
    >
        <template v-slot:item="{ item }">
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
    </n-infinite-list>
</template>

<script>
const getRemoteData = (filter) => {
    const {
        pageSize,
        offset,
    } = filter;

    return new Promise((resolve) => {
        setTimeout(() => {
            const data = require('../../fixtures/countries');

            const countries = data.slice(offset, pageSize + offset);

            resolve({
                items: countries,
                total: data.length,
            });
        }, 1000);
    });
};

export default {
    data () {
        return {
            items: [],
            perPage: 10,
            total: null,
            loading: false,
        };
    },

    methods: {
        load (props) {
            this.loading = true;

            getRemoteData({
                pageSize: props.pageSize,
                offset: this.items.length,
            }).then((data) => {
                this.items.push(...data.items);
                this.total = data.total;

                this.loading = false;
            });
        },
    },
};
</script>
