<template>
    <n-div flex center-center>
        <n-div col sm:12 md:8>
            <n-div flex stacked stretched>
                <n-module v-if="!done" title="Checkout" type="card">
                    <n-form
                        padding="medium"
                        @submit="submitForm"
                        @done="formSubmitted"
                    >
                        <n-div flex gap="small" stacked stretched>
                            <n-tile
                                title="Boxes of lorem ipsum"
                                subtitle="There is a ton of dolores in these boxes"
                            >
                                <n-div slot="actions">
                                    <n-text-field
                                        type="number"
                                        step="1"
                                        min="1"
                                        length="2"
                                        style="width: 64px"
                                        v-model="model.quantity"
                                    />
                                </n-div>
                            </n-tile>

                            <hr/>

                            <n-div text-align="right">
                                <n-text level="4">Total: {{ total | formatPrice }}</n-text>
                            </n-div>

                            <n-stripe-card
                                v-model="model.token"
                            ></n-stripe-card>
                        </n-div>

                        <template slot="footer" slot-scope="{ saving }">
                            <n-div flex left-center margin-top="medium" class="footer">
                                <n-button
                                    type="submit"
                                    color="black"
                                    text="Order & Pay"
                                    icon="fas fa-shield-alt"
                                    size="large"
                                    style="width: 100%"
                                    :loading="saving"
                                />
                            </n-div>
                        </template>
                    </n-form>
                </n-module>

                <n-div v-else>
                    <n-text level="4" text-align="center">
                        <n-text text-color="primary" margin="large" style="font-size: 100px">
                            <n-icon icon="fas fa-shipping-fast"></n-icon>
                        </n-text>

                        Thank you for your order!<br/>

                        <small>A payment of {{ total | formatPrice }} has been successful.</small>
                    </n-text>
                </n-div>
            </n-div>
        </n-div>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            done: false,
            price: 1256,
            model: {
                quantity: 1,
            },
        };
    },

    filters: {
        formatPrice (value) {
            const formatted = (value / 100).toFixed(2);
            return `€${formatted}`;
        },
    },

    methods: {
        submitForm () {
            return new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
        },

        formSubmitted () {
            this.done = true;
        },
    },

    computed: {
        total () {
            return this.price * this.model.quantity;
        },
    },

};
</script>
