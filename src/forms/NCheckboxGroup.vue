<template>
    <n-field v-bind="fieldProps">
        <template v-for="name in ['before', 'after', 'label', 'help', 'errors']">
            <slot :name="name" :slot="name"></slot>
        </template>

        <slot name="input">
            <n-div flex stacked :gap="gap">
                <n-checkbox
                    v-if="indeterminate"
                    :indeterminate="indeterminateState.indeterminate"
                    :checked="indeterminateState.checked"
                    @change="updateValueFromIndeterminate"
                    :label="indeterminateLabel"
                ></n-checkbox>

                <n-div flex :stacked="stacked" :gap="gap">
                    <template v-for="option in options">
                        <n-checkbox
                            :key="option[valueProp]"
                            :option="option[valueProp]"
                            :label="option[labelProp]"
                            v-model="internalValue"
                        >
                            <slot name="option" slot="option" :option="option"></slot>
                        </n-checkbox>
                    </template>
                </n-div>
            </n-div>
        </slot>
    </n-field>
</template>

<script>
import InputMixin from '../mixins/Input';
import StylingMixin from '../mixins/Styling';

export default {
    mixins: [InputMixin, StylingMixin],

    data () {
        return {
            localConfig: {
                name: 'NCheckboxGroup',
                config: {},
            },
            internalValue: this.value || [],
        };
    },

    props: {
        /**
         * An array of options
         * `[{ label: 'Cat', value: 'cat' }]`
         */
        options: {
            type: Array,
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
         * Add indeterminate option. Use string value to change the label
         */
        indeterminate: {
            type: [Boolean, String],
            default: false,

        },
        /**
         * Stack options vertically
         */
        stacked: {
            type: Boolean,
        },
        /**
         * Gap size between items
         */
        gap: {
            type: String,
            default: 'small',
        },
    },

    computed: {
        indeterminateState () {
            return {
                indeterminate: this.internalValue.length > 0 && this.internalValue.length < this.options.length,
                checked: this.internalValue.length === this.options.length,
            };
        },

        indeterminateLabel () {
            if (typeof this.indeterminate === 'string') {
                return this.indeterminate;
            }

            return 'Check All';
        },
    },

    methods: {
        updateValueFromIndeterminate ({ value }) {
            if (value === true) {
                this.internalValue = this.options.map((e) => e[this.valueProp]);
            } else if (value === false) {
                this.internalValue = [];
            }
        },
    },

    watch: {
        internalValue: {
            deep: true,
            handler () {
                this.inputValue = this.internalValue;
            },
        },
    },
};
</script>
