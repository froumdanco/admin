import Vue from 'vue'
import CKEditor from 'ckeditor4-vue';
Vue.use( CKEditor );

import AudioVisual from 'vue-audio-visual'

Vue.use(AudioVisual)
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
Vue.component('Dropzone', Dropzone);

import carousel from 'v-owl-carousel'
Vue.component('carousel', carousel);

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

