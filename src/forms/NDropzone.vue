<template>
    <n-field v-bind="fieldProps">
        <template v-for="name in ['before', 'after', 'label', 'help', 'errors']">
            <slot :name="name" :slot="name"></slot>
        </template>

        <n-list v-if="items.length" :class="config.children.list" striped outlined margin-bottom="xsmall">
            <template v-for="(item, index) in items">
                <!-- Provide custom item view -->
                <slot name="preview" :item="item">
                    <n-tile
                        :key="index"
                        :title="item.clientFile.name"
                    >
                        <n-media
                            v-if="getPreviewSrc(item)"
                            slot="icon"
                            avatar
                        >
                            <n-img
                                :src="getPreviewSrc(item)"
                                :rotate="item.clientFile.rotate"
                            />
                        </n-media>

                        <n-icon
                            v-else
                            slot="icon"
                            :icon="getPreviewIcon(item)"
                        ></n-icon>

                        <n-div slot="actions">
                            <template v-if="!item.processing">
                                <n-button
                                    circle
                                    ghost
                                    :icon="item.serverFile ? config.icons.delete : config.icons.remove"
                                    v-confirm="'Are you sure you want to remove this file?'"
                                    @click="remove(item)"
                                    tag-name="a"
                                    aria-label="Delete File"
                                ></n-button>
                            </template>

                            <template v-if="item.processing">
                                <n-button
                                    circle
                                    ghost
                                    tag-name="div"
                                    loading
                                />
                            </template>

                            <template v-if="item.error">
                                <n-icon warning :icon="config.icons.error"/>
                            </template>
                        </n-div>
                    </n-tile>
                </slot>
            </template>
        </n-list>

        <n-control v-bind="controlProps">
            <n-div
                :class="config.children.area"
                ref="dropzone"
                v-dropzone="addFiles"
            >
                <label>
                    <input
                        type="file"
                        multiple
                        style="display: none;"
                        @change="input"
                        tabindex="0"
                        v-bind="inputProps"
                    />

                    <!-- Override placeholder -->
                    <slot name="placeholder">
                        <n-div :class="config.children.placeholder">Drop files here or click to upload</n-div>
                    </slot>
                </label>
            </n-div>
        </n-control>
    </n-field>
</template>

<script>
import InputMixin from '../mixins/Input';
import StylingMixin from '../mixins/Styling';
import FileMixin from '../mixins/File';

import Dropzone from '../directives/VDropzone';
import Confirm from '../directives/VConfirm';

/**
 * Dropzone component allows you to implement a file input with a drag&drop support and previews.
 * You can add your custom handler if you want to upload files to your server before the form is submitted.
 * You can add a handler to delete files from the server.
 *
 * If you don't provide a send handler, the input value will contain a list of selected file objects. Files will have
 * base64 property attached to them, which you can use to upload files to the server.
 */
export default {
    mixins: [InputMixin, StylingMixin, FileMixin],

    directives: {
        Dropzone,
        Confirm,
    },

    data () {
        const items = this.serverFiles.map((e) => {
            return {
                serverFile: e,
                clientFile: {
                    name: e.name,
                    url: e.url,
                },
                error: null,
                processing: false,
            };
        });

        return {
            localConfig: {
                name: 'NDropzone',
                config: {
                    baseClass: 'n-dropzone',
                    children: {
                        area: 'n-dropzone__area n-input',
                        placeholder: 'n-control__placeholder',
                        list: 'n-dropzone__list',
                    },
                    icons: {
                        delete: 'fas fa-trash',
                        remove: 'fas fa-times',
                        warning: 'fas fa-exclamation-triangle',
                        mimes: {
                            'application\/pdf': 'far fa-file-pdf', /* eslint-disable-line */
                            'application\/g?zip': 'far fa-file-archive', /* eslint-disable-line */
                            'image\/.*': 'far fa-file-image', /* eslint-disable-line */
                            'video\/.*': 'far fa-file-video', /* eslint-disable-line */
                            'audio\/.*': 'far fa-file-audio', /* eslint-disable-line */
                            '.*': 'far fa-file-alt',
                        },
                    },
                },
            },
            items,
        };
    },

    props: {
        /**
         * An array of files that have been uploaded previously.
         * These can be used to implement remove handler
         * Make sure objects have name and url properties
         * { id: 123, name: 'filename.jpg', url: 'http://example.com/file-location.jpg' }
         */
        serverFiles: {
            type: Array,
            default () {
                return [];
            },
        },
    },

    methods: {
        input (e) {
            this.addFiles(e.target.files);
        },

        async addFiles (files) {
            for (let i = 0; i < files.length; i++) {
                const index = this.items.length;

                const item = {
                    serverFile: null,
                    clientFile: files[i],
                    error: null,
                    processing: true,
                };

                this.Vue.set(this.items, index, item);

                this.readFileSrc(files[i]).then((file) => {
                    this.Vue.set(item, 'clientFile', file);

                    const handler = this.$listeners.send;

                    if (handler) {
                        handler(file).then((serverFile) => {
                            this.Vue.set(item, 'serverFile', serverFile);
                            this.Vue.set(item, 'processing', false);
                        });
                    } else {
                        this.Vue.set(item, 'processing', false);
                    }
                }).catch((err) => {
                    this.Vue.set(item, 'error', err);
                    this.Vue.set(item, 'processing', false);
                });
            }
        },

        remove (item) {
            this.Vue.set(item, 'processing', true);

            const handler = this.$listeners.remove;

            if (handler) {
                handler(item.serverFile).then(() => {
                    const index = this.items.findIndex((e) => e.serverFile.id === item.serverFile.id);

                    this.Vue.delete(this.items, index);
                });
            } else {
                const index = this.items.findIndex((e) => e.clientFile === item.clientFile);

                this.Vue.delete(this.items, index);
            }
        },

        getPreviewSrc (item) {
            if (item.clientFile.url) {
                return item.clientFile.url;
            }

            if (/\.(jpe?g|png|gif|svg)$/i.test(item.clientFile.name)) {
                return item.clientFile.base64;
            }

            return null;
        },

        getPreviewIcon (item) {
            const mime = item.clientFile.type;

            const keys = Object.keys(this.config.icons.mimes);

            const match = keys.find((e) => {
                const regex = new RegExp(e);

                return regex.test(mime);
            });

            return this.config.icons.mimes[match];
        },

        /**
         * Reset dropzone
         * @public
         */
        reset () {
            this.Vue.set(this, 'items', []);
        },
    },

    watch: {
        items: {
            deep: true,
            handler () {
                this.inputValue = this.items.map((e) => {
                    return this.$listeners.send ? e.serverFile : e.clientFile;
                });
            },
        },
    },
};
</script>

<style scoped lang="scss">
    .n-dropzone__area[data-active],
    .n-dropzone__area:focus,
    .n-dropzone__area:active {
        border-color: var(--color-primary);
        background-color: var(--color-primary-fade);
        box-shadow: var(--box-shadow-focus);
    }
</style>
