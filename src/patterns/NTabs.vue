<template>
    <div v-bind="filteredAttrs">
        <n-menu :class="config.children.nav" :items="tabs" type="tabs" horizontal></n-menu>

        <div :class="config.children.content">
            <template v-for="slot in slots">
                <transition :key="slot" name="tab">
                    <slot :name="slot" v-if="slot === selected"></slot>
                </transition>
            </template>
        </div>
    </div>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Tabs allow users to navigation between a set of related items
 */
export default {
    mixins: [Styling],

    data () {
        const selected = this.items.find((tab) => tab.selected);

        return {
            localConfig: {
                name: 'NTabs',
                config: {
                    baseClass: 'n-tabs',
                    children: {
                        content: 'n-tabs__content',
                        nav: 'n-tabs__nav',
                    },
                },
            },
            selected: selected ? selected.target : this.items[0].target,
        };
    },

    props: {
        items: {
            type: Array,
            required: true,
        },
    },

    computed: {
        tabs () {
            return this.items.map(this.prepareTab);
        },

        slots () {
            return this.items.map((e) => e.target).filter((e) => !!e);
        },
    },

    methods: {
        prepareTab (item) {
            const tab = Object.assign({}, item);
            const { target } = tab;

            tab.click = () => {
                this.selected = target;
            };

            tab.selected = this.selected === tab.target;

            delete tab.target;

            return tab;
        },

    },
};
</script>
