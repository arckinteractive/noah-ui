<template>
    <div class="expandable">
        <n-tile
            @click.native="toggle"
            ref="tile"
        >
            <n-text :tag-name="headingTagName" level="5" v-if="title">{{ title }}</n-text>
            <div v-if="subtitle" slot="subtitle" class="n-h6">{{ subtitle }}</div>

            <div slot="badge">
                <n-button circle ghost primary :icon="toggleIcon" aria-label="Expand"/>
            </div>
        </n-tile>

        <transition name="drop">
            <div v-if="expanded">
                <component
                    v-for="slot in $attrs.blok.content"
                    :key="slot._uid"
                    :blok="slot"
                    v-bind="slot"
                    :is="slot.component | dashify"
                ></component>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,

    props: [
        'title',
        'subtitle',
        'headingTagName',
    ],

    data () {
        return {
            expanded: false,
        };
    },

    computed: {
        toggleIcon () {
            return this.expanded
                ? 'fas fa-minus'
                : 'fas fa-plus';
        },
    },

    methods: {
        toggle () {
            this.expanded = !this.expanded;

            this.$nextTick(() => {
                if (this.expanded) {
                    this.$refs.tile.$el.scrollIntoView(true, {
                        behavior: 'smooth',
                    });
                }
            });
        },
    },
};
</script>

<style scoped lang="scss">
    .expandable {
        cursor: pointer;
        background-color: var(--color-white);
        color: var(--color-primary);
        border: 1px solid var(--color-primary);
        border-radius: var(--radius-default);
        overflow: hidden;
        width: 100%;
    }
</style>
