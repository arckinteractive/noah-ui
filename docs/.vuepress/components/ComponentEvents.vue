<template>
    <n-table :headers="headers" :items="data">
        <template slot="noResults">
            <span class="n-help">This component does not emit any events</span>
        </template>

        <template slot="name" slot-scope="{ item }">
            <span class="cm-def">{{ normalize(item.name) }}</span>
        </template>

        <template slot="description" slot-scope="{ item }">
            <p v-html="markdown(item.description)"></p>

            <n-table :headers="paramHeaders" :items="item.arguments">
                <div slot="headers"></div>
                <template slot="noResults">
                    <span class="n-help">Event handler does not receive any arguments</span>
                </template>

                <template slot="name" slot-scope="{ item }">
                    <span class="cm-attribute">{{ normalize(item.name) }}</span>
                </template>

                <template slot="type" slot-scope="{ item }">
                    <span class="cm-type">{{ normalize(item.type) }}</span>
                </template>
            </n-table>
        </template>
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
                    prop: 'description',
                    label: 'Description / Arguments',
                    width: '80%',
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
