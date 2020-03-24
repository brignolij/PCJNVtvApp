import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';
import VueMoment from 'vue-moment'

import App from '../imports/ui/App.vue';
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(VueMeteorTracker);
Vue.use(BootstrapVue);
Vue.use(VueMoment);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Meteor.startup(() => {

  new Vue({

    el: '#app',

    ...App,

  });

});

