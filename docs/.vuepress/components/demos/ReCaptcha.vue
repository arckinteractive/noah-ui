<template>
    <n-div flex center-top>
        <n-div col sm:12 md:6>
            <n-div flex stacked stretched>
                <n-form
                    @submit="submitForm"
                    @done="formSubmitted"
                >
                    <n-div flex gap="small" stacked stretched>
                        <n-text-field
                            label="Message"
                            v-model="model.message"
                            type="textarea"
                            placeholder="Type a message to initialize captcha"
                            required
                            :validation-events="[]"
                        />

                        <n-recaptcha
                            v-if="!!model.message"
                            v-model="model.captcha"
                            :verify-callback="verifyCaptcha"
                            ref="recaptcha"
                        />
                    </n-div>

                    <template slot="footer" slot-scope="{ saving }">
                        <n-div flex left-center margin-top="medium" class="footer">
                            <n-button
                                type="submit"
                                color="secondary"
                                text="Send Message"
                                icon="fas fa-paper-plane"
                                size="large"
                                style="width: 100%"
                                :loading="saving"
                            />
                        </n-div>
                    </template>
                </n-form>
            </n-div>
        </n-div>

        <n-div col sm:12 md:6>
            <n-codemirror
                label="Model data"
                :options="{ readOnly: true, mode: 'application/json' }"
                :modes="['javascript']"
                :value="JSON.stringify(model, null, 2)"
            />
        </n-div>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            model: {
                message: '',
                captcha: '',
            },
        };
    },

    methods: {
        submitForm () {
            return new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
        },

        formSubmitted () {
            this.$alert('Thank you for your message');

            this.model.message = '';
            this.model.captcha = '';

            this.$refs.recaptcha.reset();
        },

        verifyCaptcha (captcha) {
            // Send a request to your server to verify the captcha
            // https://developers.google.com/recaptcha/docs/verify
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 1000);
            });
        },
    },
};
</script>
