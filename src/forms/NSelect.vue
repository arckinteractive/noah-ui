<template>
    <n-field v-bind="fieldProps" v-click-outside="hideSuggestions">
        <template v-for="name in ['before', 'after', 'label', 'help', 'errors']">
            <slot :name="name" :slot="name"></slot>
        </template>

        <n-control
            v-bind="controlProps"
        >
            <template v-for="name in ['prefixIcon', 'prefixLabel', 'suffixLabel']">
                <slot :name="name" :slot="name"></slot>
            </template>

            <slot name="suffixIcon" slot="suffixIcon">
                <n-icon :icon="toggleIcon" @click.native.stop="toggleSuggestions"></n-icon>
            </slot>

            <slot
                name="input"
                slot="default"
                v-bind="inputProps"
                :options="internalOptions"
                :value="inputValue"
            >
                <n-div
                    :class="boxClasses"
                    ref="input"
                >
                    <template v-if="multiple">
                        <div v-if="hasSelection" :class="config.children.selection">
                            <template v-for="selectedOption in internalValue">
                                <slot
                                    name="selection"
                                    :option="selectedOption"
                                    :value="internalValue"
                                    :removeHandler="clearOne"
                                >
                                    <n-tag
                                        closable
                                        small
                                        @close="clearOne(selectedOption)"
                                        :key="`selection-${selectedOption[labelProp]}-${selectedOption[valueProp]}`"
                                    >
                                        {{ selectedOption[labelProp] }}
                                    </n-tag>
                                </slot>
                            </template>
                        </div>

                        <div :class="config.children.input">
                            <input
                                @focus="showSuggestions"
                                type="text"
                                :id="inputProps.id"
                                :placeholder="placeholder"
                                v-model="searchKeyword"
                                ref="search"
                            />
                        </div>
                    </template>

                    <template v-else>
                        <div v-if="hasSelection" :class="config.children.selection">
                            <slot
                                name="selection"
                                :option="internalValue"
                                :value="internalValue"
                            >
                                <span>{{ internalValue[labelProp] }}</span>

                                <n-icon
                                    :icon="config.icons.clear" @click.native.stop="clearAll"
                                ></n-icon>
                            </slot>
                        </div>

                        <div v-else :class="config.children.input">
                            <input
                                @focus="showSuggestions"
                                type="text"
                                :id="inputProps.id"
                                :placeholder="placeholder"
                                v-model="searchKeyword"
                                ref="search"
                            />
                        </div>
                    </template>

                    <transition name="drop">
                        <div
                            v-show="expanded"
                            :class="config.children.dropdown"
                            ref="suggestions"
                        >
                            <n-list v-if="filteredOptions.length" divided>
                                <n-div
                                    v-for="option in filteredOptions"
                                    :key="`suggestion-${option[labelProp]}-${option[valueProp]}`"
                                >
                                    <template v-if="multiple">
                                        <n-checkbox
                                            v-model="internalValue"
                                            :option="option"
                                            :label="option[labelProp]"
                                        >
                                            <slot
                                                name="suggestion"
                                                slot="label"
                                                :option="option"
                                                :value="internalValue"
                                            >
                                                <n-highlight :text="option[labelProp]" :keyword="searchKeyword"/>
                                            </slot>
                                        </n-checkbox>
                                    </template>

                                    <template v-else>
                                        <n-radio
                                            v-model="internalValue"
                                            :option="option"
                                        >
                                            <slot
                                                name="suggestion"
                                                slot="option"
                                                :option="option"
                                                :value="internalValue"
                                            >
                                                <n-highlight :text="option[labelProp]" :keyword="searchKeyword"/>
                                            </slot>
                                        </n-radio>
                                    </template>
                                </n-div>
                            </n-list>

                            <template v-else>
                                <n-div v-if="!awaiting" padding="medium">
                                    There are no options matching the criteria
                                </n-div>

                                <n-tile v-if="canAddValue" :icon="config.icons.add" @click.stop="addValue">
                                    {{ `Add ${this.searchKeyword}` }}
                                </n-tile>
                            </template>
                        </div>
                    </transition>
                </n-div>
            </slot>
        </n-control>
    </n-field>
</template>

<script>
import Styling from '../mixins/Styling';
import Input from '../mixins/Input';
import ClickOutside from 'vue-click-outside';

export default {
    mixins: [Input, Styling],

    directives: { ClickOutside },

    data () {
        return {
            localConfig: {
                name: 'NSelect',
                config: {
                    children: {
                        box: 'n-select',
                        input: 'n-select__input',
                        selection: 'n-select__selection',
                        dropdown: 'n-select__dropdown',
                    },
                    icons: {
                        expand: 'fas fa-chevron-down fa-xs',
                        collapse: 'fas fa-chevron-up fa-xs',
                        clear: 'fas fa-times fa-xs',
                        add: 'fas fa-plus',
                    },
                },
            },
            expanded: false,
            searchKeyword: '',
            internalOptions: [],
            internalValue: this.value,
        };
    },

    props: {
        /**
         * An array of options or an async function that returns an array of objects
         * `[{ label: 'Cat', value: 'cat' }]`
         */
        options: {
            type: [Array, Function],
        },
        /**
         * Property of the option object to use as label
         */
        labelProp: {
            type: String,
            default: 'label',
        },
        /**
         * Property of the option object to use as value
         */
        valueProp: {
            type: String,
            default: 'value',
        },
        /**
         * Option properties to match search keyword against,
         * e.g. in an array of options containing user info,
         * you may want to search against name and username,
         * while the label might be full name
         */
        matchProps: {
            type: Array,
        },
        /**
         * Return value is an object or array of objects
         */
        returnObject: {
            type: Boolean,
        },
        /**
         * Allow multiple values
         */
        multiple: {
            type: Boolean,
        },
    },

    computed: {
        boxClasses () {
            return {
                [this.config.children.box]: true,
                ...this.buildCssModifiers({
                    expanded: this.expanded,
                    multiple: this.multiple,
                }),
            };
        },

        toggleIcon () {
            return this.expanded ? this.config.icons.collapse : this.config.icons.expand;
        },

        filteredOptions () {
            if (typeof this.options === 'function') {
                return [...this.internalOptions];
            }

            return this.internalOptions.filter((e) => {
                return this.isMatch(e, this.searchKeyword);
            });
        },

        hasSelection () {
            if (this.multiple) {
                return this.internalValue.length;
            }

            return this.internalValue;
        },

        canAddValue () {
            return this.$listeners.add;
        },
    },

    methods: {
        async resolveOptions () {
            if (Array.isArray(this.options)) {
                this.internalOptions = this.options;

                return Promise.resolve(this.internalOptions);
            }

            this.awaiting = true;
            this.internalOptions = [];

            return Promise.resolve(this.options(this.searchKeyword)).then((options) => {
                this.internalOptions = options;
                this.awaiting = false;

                return options;
            }).catch(this.$log);
        },

        showSuggestions () {
            if (this.expanded) {
                return;
            }

            this.resolveOptions().then(() => {
                this.expanded = true;

                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$focus(null, this.$refs.input.$el);
                    }, 200);
                });
            });
        },

        hideSuggestions () {
            this.expanded = false;
            this.searchKeyword = '';

            this.$blur();
        },

        toggleSuggestions () {
            this.expanded ? this.hideSuggestions() : this.showSuggestions();
        },

        clearAll () {
            this.internalValue = this.multiple ? [] : null;
        },

        clearOne (option) {
            const index = this.internalValue.findIndex((e) => e[this.valueProp] === option[this.valueProp]);

            this.Vue.delete(this.internalValue, index);
        },

        isMatch (e, keyword) {
            if (typeof keyword !== 'string' || !keyword) {
                return true;
            }

            const q = keyword.toLowerCase();

            const props = this.matchProps && this.matchProps.length ? this.matchProps : [this.labelProp];

            const matches = props.filter((prop) => {
                return typeof e[prop] === 'string' && e[prop].toLowerCase().includes(q);
            });

            return matches.length > 0;
        },

        addValue () {
            this.$listeners.add(this.searchKeyword);
        },
    },

    watch: {
        internalValue: {
            deep: true,
            handler () {
                if (this.multiple) {
                    this.inputValue = this.internalValue.map((e) => {
                        return this.returnObject ? e : e[this.valueProp];
                    });
                } else {
                    if (typeof this.internalValue !== 'undefined' && this.internalValue !== null) {
                        this.inputValue = this.returnObject ? this.internalValue : this.internalValue[this.valueProp];
                    } else {
                        this.inputValue = null;
                    }

                    this.hideSuggestions();
                }
            },
        },

        searchKeyword () {
            this.resolveOptions();
        },
    },
};
</script>
