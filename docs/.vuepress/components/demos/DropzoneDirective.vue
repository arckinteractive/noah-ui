<template>
    <n-div flex stacked stretched>
        <p class="n-help">Drop file into the textarea</p>

        <div>
            <textarea v-dropzone="onDrop" v-model="text" :rows="rows"></textarea>
        </div>

        <n-div flex v-if="files.length">
            <n-div v-for="(file, index) in files" :key="index" col sm:2>
                <n-media>
                    <n-img :src="file.base64"></n-img>
                </n-media>
            </n-div>
        </n-div>
    </n-div>
</template>

<script>
import Dropzone from '../../../../src/directives/VDropzone';
import FileMixin from '../../../../src/mixins/File';

export default {
    directives: {
        Dropzone,
    },

    mixins: [FileMixin],

    data () {
        return {
            text: '',
            files: [],
        };
    },

    computed: {
        rows () {
            return this.text.split(/\n/).length;
        },
    },

    methods: {
        onDrop (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                this.readFileSrc(file).then((file) => {
                    this.Vue.set(this.files, this.files.length, file);
                    this.text = `${this.text}![${file.name}](https://example.com/images/${file.name} "Uploaded image")\n`;
                });
            }
        },
    },

};
</script>

<style scoped lang="scss">
    textarea[data-active] {
        border-color: var(--color-primary);
        background-color: var(--color-primary-fade);
    }
</style>
