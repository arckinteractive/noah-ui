<template>
    <div class="component-meta">
        <n-text level="6">{{ meta.name }}</n-text>
        <div>
            <p v-html="markdown(meta.description)" v-if="meta.description"></p>
        </div>

        <n-module class="component-meta" type="demo">
            <div slot="header"></div>

            <n-tabs :items="tabs">
                <component-props :data="meta.props" slot="props"></component-props>
                <component-config :data="configOptions" slot="config"></component-config>
                <component-slots :data="meta.slots" slot="slots"></component-slots>
                <component-events :data="meta.events" slot="events"></component-events>
                <component-methods :data="meta.methods" slot="methods"></component-methods>
            </n-tabs>
        </n-module>
    </div>
</template>

<script>
import docs from '../docs.json';
import markdown from '../utils/markdown';

export default {
    name: 'ComponentMeta',

    props: {
        name: {
            type: String,
            required: true,
        },
    },

    data () {
        return {
            docs,
        };
    },

    computed: {
        meta () {
            return this.docs.find(e => e.name === this.name);
        },

        configOptions () {
            const localConfig = this.meta.data.find((e) => e.name === 'localConfig');

            const opts = localConfig ? localConfig.initial.config.value : {};

            var flattenConfig = function (deep) {
                const toReturn = {};
                let flatObject;

                Object.keys(deep).forEach((i) => {
                    if (typeof deep[i].value === 'object') {
                        flatObject = flattenConfig(deep[i].value);

                        Object.keys(flatObject).forEach((x) => {
                            toReturn[i + (!!isNaN(x) ? '.' + x : '')] = flatObject[x];
                        });
                    } else {
                        toReturn[i] = deep[i].value;
                    }
                });

                return toReturn;
            };

            const flat = flattenConfig(opts);

            return Object.keys(flat).map((e) => {
                return {
                    name: e,
                    value: flat[e],
                };
            });
        },

        tabs () {
            return [
                {
                    title: 'Props',
                    target: 'props',
                    icon: 'fas fa-theater-masks',
                    badge: {
                        value: this.meta.props.length,
                    },
                },
                {
                    title: 'Config',
                    target: 'config',
                    icon: 'fas fa-cogs',
                    badge: {
                        value: this.configOptions.length,
                    },
                },
                {
                    title: 'Slots',
                    target: 'slots',
                    icon: 'fas fa-stream',
                    badge: {
                        value: this.meta.slots.length,
                    },
                },
                {
                    title: 'Events',
                    target: 'events',
                    icon: 'fas fa-random',
                    badge: {
                        value: this.meta.events.length,
                    },
                },
                {
                    title: 'Methods',
                    target: 'methods',
                    icon: 'fas fa-filter',
                    badge: {
                        value: this.meta.methods.length,
                    },
                },
            ];
        },
    },

    methods: {
        markdown,
    },
};
</script>
