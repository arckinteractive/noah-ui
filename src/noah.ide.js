/**
 * Helper file for IDE autocomplete
 * Actual files are loaded in main.js based on async/loader config
 */

import Vue from 'vue';

Vue.component('NBadge', () => import('./atoms/NBadge.vue'));
Vue.component('NButton', () => import('./atoms/NButton.vue'));
Vue.component('NControl', () => import('./atoms/NControl.vue'));
Vue.component('NDiv', () => import('./atoms/NDiv.vue'));
Vue.component('NField', () => import('./atoms/NField.vue'));
Vue.component('NForm', () => import('./atoms/NForm.vue'));
Vue.component('NHighlight', () => import('./atoms/NHighlight.vue'));
Vue.component('NIcon', () => import('./atoms/NIcon.vue'));
Vue.component('NImg', () => import('./atoms/NImg.vue'));
Vue.component('NLayer', () => import('./atoms/NLayer.vue'));
Vue.component('NList', () => import('./atoms/NList.vue'));
Vue.component('NMedia', () => import('./atoms/NMedia.vue'));
Vue.component('NMessage', () => import('./atoms/NMessage.vue'));
Vue.component('NTag', () => import('./atoms/NTag.vue'));
Vue.component('NText', () => import('./atoms/NText.vue'));
Vue.component('NCarousel', () => import('./molecules/NCarousel.vue'));
Vue.component('NCheckbox', () => import('./molecules/NCheckbox.vue'));
Vue.component('NCheckboxGroup', () => import('./molecules/NCheckboxGroup.vue'));
Vue.component('NDialog', () => import('./molecules/NDialog.vue'));
Vue.component('NDrawer', () => import('./molecules/NDrawer.vue'));
Vue.component('NDropzone', () => import('./molecules/NDropzone.vue'));
Vue.component('NEmbed', () => import('./molecules/NEmbed.vue'));
Vue.component('NHero', () => import('./molecules/NHero.vue'));
Vue.component('NMenu', () => import('./molecules/NMenu.vue'));
Vue.component('NMenuItem', () => import('./molecules/NMenuItem.vue'));
Vue.component('NModule', () => import('./molecules/NModule.vue'));
Vue.component('NPagination', () => import('./molecules/NPagination.vue'));
Vue.component('NPopup', () => import('./molecules/NPopup.vue'));
Vue.component('NRadio', () => import('./molecules/NRadio.vue'));
Vue.component('NRadioGroup', () => import('./molecules/NRadioGroup.vue'));
Vue.component('NSelect', () => import('./molecules/NSelect.vue'));
Vue.component('NTable', () => import('./molecules/NTable.vue'));
Vue.component('NTabs', () => import('./molecules/NTabs.vue'));
Vue.component('NTextField', () => import('./molecules/NTextField.vue'));
Vue.component('NTile', () => import('./molecules/NTile.vue'));
Vue.component('NDataTable', () => import('./organisms/NDataTable.vue'));
Vue.component('NAlert', () => import('./plugins/NAlert.vue'));
Vue.component('NConfirm', () => import('./plugins/NConfirm.vue'));