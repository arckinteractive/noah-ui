<template>
    <n-field v-bind="fieldProps">
        <template v-for="name in ['before', 'after', 'label', 'help', 'errors']">
            <slot :name="name" :slot="name"></slot>
        </template>

        <n-control v-bind="controlProps">
            <template v-for="name in ['prefixIcon', 'suffixIcon', 'prefixLabel', 'suffixLabel']">
                <slot :name="name" :slot="name"></slot>
            </template>

            <slot name="input" slot="default" v-bind="inputProps" :value="inputValue">
                <div :class="config.children.wrapper">
                    <div ref="card" :tabindex="inputProps.tabIndex"></div>
                </div>
            </slot>
        </n-control>
    </n-field>
</template>

<script>
import validators from '../utils/validators';
import InputMixin from '../mixins/Input';
import StylingMixin from '../mixins/Styling';

/**
 * Stripe card input, which generates a token during validation
 * If you are not using NForm, you should call `getToken()` programmatically.
 */
export default {
    mixins: [InputMixin, StylingMixin],

    props: {
        /**
         * Options to pass to the Stripe.elements()
         * See the [docs](https://stripe.com/docs/stripe-js/reference#element-options)
         */
        options: {
            type: Object,
            default () {
                return {
                    style: {
                        base: {
                            fontSize: '20px',
                            color: '#242424',
                        },
                    },
                };
            },
        },
    },

    data () {
        return {
            localConfig: {
                name: 'NStripeCard',
                config: {
                    baseClass: 'n-stripe-card',
                    children: {
                        wrapper: 'n-stripe-card__wrapper',
                    },
                },
            },
            instance: null,
            stripe: null,
        };
    },

    mounted () {
        this.$nextTick(() => {
            this.$stripe.load().then((stripe) => {
                this.stripe = stripe(this.$stripe.publishableKey);

                this.instance = this.stripe.elements().create('card', this.options);
                this.instance.mount(this.$refs.card);

                this.instance.on('change', (event) => {
                    this.inputValue = null;

                    if (event.error) {
                        this.error = event.error.message;
                    } else {
                        this.error = null;
                    }
                });

                this.validationRules.push(
                    validators.custom(() => {
                        if (this.inputValue) {
                            return Promise.resolve(true);
                        }

                        return this.getToken()
                            .then(() => true)
                            .catch((e) => {
                                const msg = e.message || 'There was an issue processing the card, your card has not been charged. Please try again.';

                                throw new Error(msg);
                            });
                    }),
                );
            });
        });
    },

    beforeDestroy () {
        if (this.instance) {
            this.instance.destroy();
        }
    },

    methods: {
        /**
         * Generate a token programmatically
         *
         * @public
         */
        getToken () {
            return new Promise((resolve, reject) => {
                this.stripe.createToken(this.instance)
                    .then((result) => {
                        if (result.error) {
                            this.error = result.error.message;
                            this.inputValue = null;

                            reject(new Error(result.error.message));
                        } else {
                            this.error = null;
                            this.inputValue = result.token.id;

                            resolve(result);
                        }
                    });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .StripeElement {
        border: 1px solid var(--field-color, var(--color-grey));
        border-radius: var(--field-radius);
        padding: var(--space-s);
        box-shadow: var(--field-box-shadow);
    }
</style>
