<template>
    <n-div flex stacked stretched>
        <n-select
            v-model="model"
            label="Which countries have you lived in?"
            placeholder="Search by name"
            :options="countryLoader"
            labelProp="name"
            valueProp="alpha2Code"
            multiple
            return-object
        >
            <template slot="suggestion" slot-scope="{ option }">
                <n-tile :title="option.name" :subtitle="option.translations.fa">
                    <n-media avatar slot="icon">
                        <n-img
                            :src="require(`svg-country-flags/svg/${option.alpha2Code.toLowerCase()}.svg`)"
                            :lazy-load="false"
                        />
                    </n-media>
                </n-tile>
            </template>

            <template slot="selection" slot-scope="{ option, removeHandler }">
                <n-tag medium closable @close="removeHandler(option)" :key="option.alpha2Code">
                    <n-media avatar slot="icon">
                        <n-img
                            :src="require(`svg-country-flags/svg/${option.alpha2Code.toLowerCase()}.svg`)"
                            :lazy-load="false"
                        />
                    </n-media>

                    <span>{{ option.name }}</span>
                </n-tag>
            </template>
        </n-select>

        <p>Current value: {{ model }}</p>
    </n-div>
</template>

<script>
import countries from '../../fixtures/countries';

export default {
    data () {
        return {
            model: [],
        };
    },

    methods: {
        countryLoader (keyword) {
            if (!keyword) {
                return [];
            }

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(countries.filter((e) => {
                        return this.isMatch(e, keyword);
                    }));
                }, 400);
            });
        },

        isMatch (e, keyword) {
            if (typeof keyword !== 'string' || !keyword) {
                return true;
            }

            const q = keyword.toLowerCase();

            return e.name.toLowerCase().includes(q);
        },
    },
};
</script>
