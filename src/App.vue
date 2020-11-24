<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="toggleLocale">{{ locale }}</button>
  </div>
</template>

<script>
import { linguiI18n } from '../lib'

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      locale: 'en',
    }
  },
  watch: {
    locale: {
      immediate: true,
      handler() {
        this[linguiI18n].i18n.activate(this.locale)
      },
    },
  },
  methods: {
    toggleLocale() {
      this.locale = this.locale === 'en' ? 'ru' : 'en'
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
