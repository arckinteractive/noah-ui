<template>
    <n-module type="demo">
        <div class="demo" slot="header">
            <component :is="`demos-${name}`"/>
        </div>

        <div class="code">
            <ClientOnly>
                <codemirror :options="cmOptions" :value="raw"></codemirror>
            </ClientOnly>
        </div>
    </n-module>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
    },

    data () {
        return {
            raw: '',
            cmOptions: {
                tabSize: 4,
                mode: 'text/x-vue',
                theme: 'noah',
                lineNumbers: true,
                lineWrapping: false,
                line: true,
                readOnly: true,
            },
        };
    },

    mounted () {
        this.raw = require(`!!raw-loader!./demos/${this.name}.vue`).default;
    },
};
</script>
