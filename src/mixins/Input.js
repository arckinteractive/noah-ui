import validators, { validateRule } from '../utils/validators';
import debounce from 'lodash.debounce';

/**
 * @mixin
 */
export default {
    model: {
        prop: 'value',
        event: 'input',
    },

    props: {
        /**
         * Input value
         * @model
         */
        value: {},
        /**
         * Input name
         */
        name: {
            type: String,
        },
        /**
         * Color modifier
         */
        color: {
            type: String,
        },
        /**
         * Make input required
         * Required validation rule will be automatically applied, if true
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * Accessibility ID of the field/input
         */
        id: {
            type: String,
            default () {
                const hash = Math.random()
                    .toString(36)
                    .replace(/[^a-z]+/g, '')
                    .substr(0, 5);

                return `n-field-vue-${hash}`;
            },
        },
        /**
         * Field label
         */
        label: {
            type: String,
        },
        /**
         * Field help text
         */
        help: {
            type: String,
        },
        /**
         * Placeholder text
         */
        placeholder: {
            type: String,
        },
        /**
         * Sets loading state
         */
        loading: {
            type: Boolean,
            default: false,
        },
        /**
         * Input type
         */
        type: {
            type: String,
        },
        /**
         * Prefix icon class of the input
         */
        prefixIcon: {
            type: String,
        },
        /**
         * Suffix icon class of the input
         */
        suffixIcon: {
            type: String,
        },
        /**
         * An array of validation rules
         */
        rules: {
            type: Array,
            default: () => {
                return [];
            },
        },
        validationEvents: {
            type: Array,
            default: () => ['change'],
        },
    },

    data () {
        const validationRules = this.rules || [];

        if (this.required) {
            validationRules.push(validators.required());
        }

        if (this.type) {
            validationRules.push(validators.type(this.type));
        }

        return {
            inputValue: typeof this.value === 'undefined' ? null : this.value,
            lastInputValue: null,
            error: null,
            shouldValidate: true,
            validationRules,
            awaiting: false,
        };
    },

    mounted () {
        const handler = debounce(() => {
            this.validate().catch(() => {});
        }, 300);

        if (this.validationEvents) {
            this.validationEvents.forEach((event) => {
                this.$on(event, handler);
            });
        }

        this.$emit('init');
    },

    computed: {
        fieldProps () {
            return {
                id: this.id,
                required: this.required,
                label: this.label,
                help: this.help,
                error: this.error,
                ...this.filteredAttrs,
            };
        },

        controlProps () {
            return {
                loading: this.loading || this.awaiting,
                prefixIcon: this.prefixIcon,
                suffixIcon: this.suffixIcon,
                color: this.error ? 'danger' : this.color,
                size: this.size,
            };
        },

        inputProps () {
            const propNames = Object.keys(this.$attrs).filter((e) => {
                return Object.keys(this.fieldProps).indexOf(e) !== -1;
            });

            const props = {};

            propNames.forEach((e) => {
                props[e] = this.$attrs[e];
            });

            props.id = this.id;
            props.type = this.type || 'text';
            props.placeholder = this.placeholder || this.label;
            props.tabindex = 0;

            return props;
        },

        listeners () {
            const { input, ...listeners } = this.$listeners;

            return listeners;
        },
    },

    methods: {
        async validate () {
            const promises = this.validationRules.map((rule) => {
                return validateRule(this.inputValue, rule);
            });

            this.awaiting = true;

            return Promise.all(promises)
                .then(() => {
                    this.error = null;
                })
                .catch((err) => {
                    this.error = err.message || 'This field contains an invalid value';

                    throw err;
                })
                .finally(() => {
                    this.awaiting = false;
                });
        },

        setError (error) {
            this.error = error;
        },

        /**
         * Focus the input
         * @public
         */
        focus () {
            this.$nextTick(() => {
                if (!this.$refs.input) {
                    throw new Error('Make sure to have a focusable \'input\' ref in your template');
                }

                this.$refs.input.focus();
                this.$emit('focus');
            });
        },

        /**
         * Blur the input
         * @public
         */
        blur () {
            this.$nextTick(() => {
                if (!this.$refs.input) {
                    throw new Error('Make sure to have a focusable \'input\' ref in your template');
                }

                this.$refs.input.blur();
                this.$emit('blur');
            });
        },
    },

    watch: {
        value (value) {
            this.inputValue = typeof value !== 'undefined' ? value : null;
        },

        inputValue: {
            deep: true,
            handler (value, previousValue) {
                if (typeof value !== 'undefined') {
                    this.$emit('input', value);
                }

                if (value !== previousValue) {
                    this.$emit('change', {
                        value,
                        previousValue,
                    });
                }
            },
        },
    },
};
