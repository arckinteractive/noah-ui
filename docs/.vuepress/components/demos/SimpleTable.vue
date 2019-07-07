<template>
  <n-module type="card" title="Countries by area">
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
        prop: 'name',
        order: 'ascending',
      },
      items: [],
    };
  },

  mounted() {
    const countries = require('../../fixtures/countries');

    this.items = countries.slice(0, 10);
  },

  computed: {
    headers () {
      return [
        {
          label: 'Code',
          prop: 'alpha2Code',
          sortable: true,
          width: '10%',
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
          label: 'Capital',
          prop: 'capital',
          sortable: true,
          width: '20%',
        },
        {
          label: 'Area',
          prop: 'area',
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
