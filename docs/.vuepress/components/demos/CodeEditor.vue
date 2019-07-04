<template>
    <n-codemirror
        v-model="code"
        label="Edit the code"
        :options="editorOptions"
        :modes="editorModes"
    ></n-codemirror>
</template>

<script>
export default {
    data () {
        return {
            editorOptions: {
                tabSize: 4,
                mode: 'text/x-vue',
                theme: 'noah',
                lineNumbers: true,
                lineWrapping: false,
                line: true,
            },
            editorModes: [
                'htmlmixed',
                'vue',
            ],
            code: '',
        };
    },

    mounted () {
        this.code = require(`!!raw-loader!./CodeEditor.vue`).default;
    },
};
</script>
