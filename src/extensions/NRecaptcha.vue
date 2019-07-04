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
                <div
                    ref="recaptcha"
                    :data-sitekey="$recaptcha.siteKey"
                    :data-theme="theme"
                    :data-size="size"
                ></div>
            </slot>
        </n-control>
    </n-field>
</template>

<script>
import validators from '../utils/validators';
import InputMixin from '../mixins/Input';

export default {
    mixins: [InputMixin],

    data () {
        return {
            widgetId: null,
            isVerified: false,
        };
    },

    props: {
        /**
         * if you wish to verify the captcha before the form data is submitted to the server,
         * you can provide the function that will receive a recaptcha response as an argument and return a promise
         */
        verifyCallback: {
            type: Function,
        },

        /**
         * ReCapatcha theme: `light` or `dark`
         */
        theme: {
            type: String,
            default: 'light',
        },

        /**
         * ReCaptcha size: `normal` or `compact`
         */
        size: {
            type: String,
            default: 'normal',
        },
    },

    mounted () {
        this.$nextTick(() => {
            this.$recaptcha.load().then((recaptcha) => {
                this.widgetId = recaptcha.render(this.$refs.recaptcha, {
                    callback: this.onSuccess,
                    expiredCallback: this.onExpire,
                    errorCallback: this.onError,
                });
            });
        });

        this.validationRules.push(
            validators.custom((value) => {
                if (!value) {
                    throw new Error('Please solve the captcha');
                }
            }),
        );

        if (this.verifyCallback) {
            this.validationRules.push(
                validators.custom((value) => {
                    if (this.isVerified) {
                        return Promise.resolve(true);
                    }

                    return new Promise((resolve, reject) => {
                        this.verifyCallback(value)
                            .then((response) => {
                                this.isVerified = true;
                                resolve(response);
                            })
                            .catch((err) => {
                                this.reset();
                                reject(err);
                            });
                    });
                }),
            );
        }
    },

    methods: {
        onSuccess (response) {
            this.$emit('success', response);

            this.inputValue = response;
        },

        onExpire () {
            this.$emit('expire');

            this.reset();
        },

        onError (error) {
            this.$emit('error', error);

            this.reset();
        },

        /**
         * Reset ReCaptcha programmatically
         *
         * @public
         */
        reset () {
            this.$emit('reset');

            this.isVerified = false;
            this.inputValue = null;

            this.$recaptcha.load().then((recaptcha) => {
                recaptcha.reset(this.widgetId);
            });
        },
    },
};
</script>

<style scoped lang="scss">

</style>
