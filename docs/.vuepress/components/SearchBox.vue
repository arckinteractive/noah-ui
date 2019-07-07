<template>
    <div class="search-box">
        <n-popup
            :visible="showSuggestions"
            placement="bottom-start"
            :open-on-click="false"
            class="suggestions"
            small
        >
            <n-text-field
                slot="trigger"
                @keyup.down="onDown"
                @keyup.enter="go(focusIndex)"
                @keyup.up="onUp"
                @focus="focus"
                @blur="unfocus"
                aria-label="Search"
                autocomplete="off"
                placeholder="Search"
                prefix-icon="fas fa-search"
                spellcheck="false"
                v-model="query"
            >
                <n-icon
                    v-if="query"
                    icon="fas fa-times"
                    @click.native="clearSearch"
                    slot="suffixIcon"
                ></n-icon>
            </n-text-field>

            <n-menu
                v-if="suggestions && suggestions.length"
                :accordion="false"
                :items="suggestions"
                @click.native="clearSearch"
            ></n-menu>

            <n-div v-else padding="small">
                There are not items matching your search
            </n-div>
        </n-popup>
    </div>
</template>

<script>
export default {
    data () {
        return {
            query: '',
            focused: false,
            focusIndex: 0,
        };
    },

    computed: {
        showSuggestions () {
            return this.query.length > 0;
        },

        suggestions () {
            const query = this.query.trim().toLowerCase();
            if (!query) {
                return;
            }

            const { pages, themeConfig } = this.$site;
            const max = themeConfig.searchMaxSuggestions || 5;
            const localePath = this.$localePath;
            const matches = item => (
                item.title &&
                item.title.toLowerCase().indexOf(query) > -1
            );
            const res = [];
            for (let i = 0; i < pages.length; i++) {
                if (res.length >= max) break;
                const p = pages[i];
                // filter out results that do not match current locale
                if (this.getPageLocalePath(p) !== localePath) {
                    continue;
                }
                if (matches(p)) {
                    res.push(p);
                } else if (p.headers) {
                    for (let j = 0; j < p.headers.length; j++) {
                        if (res.length >= max) break;
                        const h = p.headers[j];
                        if (matches(h)) {
                            res.push(Object.assign({}, p, {
                                path: p.path + '#' + h.slug,
                                header: h,
                            }));
                        }
                    }
                }
            }

            return res.map((e, i) => {
                return {
                    title: e.header ? e.header.title : e.title || e.path,
                    subtitle: e.header ? e.title : '',
                    to: e.path,
                    selected: i === this.focusIndex,
                };
            });
        },
    },

    methods: {
        getPageLocalePath (page) {
            for (const localePath in this.$site.locales || {}) {
                if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
                    return localePath;
                }
            }
            return '/';
        },

        onUp () {
            if (this.showSuggestions) {
                if (this.focusIndex > 0) {
                    this.focusIndex--;
                } else {
                    this.focusIndex = this.suggestions.length - 1;
                }
            }
        },

        onDown () {
            if (this.showSuggestions) {
                if (this.focusIndex < this.suggestions.length - 1) {
                    this.focusIndex++;
                } else {
                    this.focusIndex = 0;
                }
            }
        },

        go (i) {
            if (!this.showSuggestions) {
                return;
            }
            this.$router.push(this.suggestions[i].path);
            this.query = '';
            this.focusIndex = 0;
        },

        focus (i) {
            this.focusIndex = i || 0;
            this.focused = true;
        },

        unfocus () {
            this.focusIndex = -1;

            // blurring the input before the click is handled results in a click on an already unmounted popup
            setTimeout(() => {
                this.focused = false;
            }, 500);
        },

        clearSearch () {
            this.query = '';
        },
    },

    watch: {
        showSuggestions (value) {
            this.visible = value;
        },
    },
};
</script>

<style lang="stylus">

</style>
