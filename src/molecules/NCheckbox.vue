<template>
    <n-field v-bind="localFieldProps">
        <template v-for="name in ['before', 'after', 'errors']">
            <slot :name="name" :slot="name"></slot>
        </template>

        <slot name="input">
            <label
                :class="checkboxClasses"
                tabindex="0"
                @keypress.prevent.stop="$refs.hidden.click()"
                ref="input"
            >
                <input
                    ref="hidden"
                    v-bind="inputProps"
                    type="checkbox"
                    :value="option"
                    v-model="inputValue"
                    tabindex="-1"
                />

                <slot name="option" v-bind="inputProps" :value="inputValue">
                    <div :class="config.children.box">
                        <n-icon v-if="isChecked" :icon="config.icons.check"></n-icon>
                        <n-icon v-if="indeterminate" :icon="config.icons.indeterminate"></n-icon>
                    </div>

                    <slot name="label" :label="label">
                        <slot>{{ label }}</slot>
                    </slot>
                </slot>
            </label>
        </slot>

        <slot name="help">
            {{ help }}
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
                name: 'NCheckbox',
                config: {
                    children: {
                        control: 'n-checkbox',
                        box: 'n-checkbox__box',
                    },
                    icons: {
                        check: 'fas fa-check',
                        indeterminate: 'fas fa-minus',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Value of the option in the checkbox group
         */
        option: {
            type: [String, Number, Boolean, Object],
            default: true,
        },

        /**
         * Checked by default (do not confuse with model)
         * This is used for indeterminate state toggling
         */
        checked: {
            type: Boolean,
        },

        /**
         * Sets indeterminate state
         */
        indeterminate: {
            type: Boolean,
        },

        /**
         * In case option is an object, this can be used to correctly compare items to determine if checkbox is checked
         */
        valueProp: {
            type: String,
        },
    },

    computed: {
        localFieldProps () {
            const props = this.fieldProps;

            delete props.label;

            return props;
        },

        checkboxClasses () {
            return {
                [this.config.children.control]: true,
                ...this.buildCssModifiers({
                    labelled: !!(this.$slots.label || this.$slots.default || this.label),
                    checked: this.isChecked,
                    indeterminate: this.indeterminate,
                }),
            };
        },

        isChecked () {
            if (this.checked) {
                return true;
            }

            const isMatch = (e) => {
                if (this.valueProp) {
                    return e[this.valueProp] === this.option[this.valueProp];
                }

                return e === this.option;
            };

            if (Array.isArray(this.inputValue)) {
                return !!this.inputValue.find(isMatch);
            }

            return isMatch(this.inputValue);
        },
    },

    watch: {
        checked (value) {
            value ? this.inputValue = this.option : this.inputValue = null;
        },
    },
};
</script>
