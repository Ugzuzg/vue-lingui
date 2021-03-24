<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="locale = 'en-GB'">en-GB</button>
    <button @click="locale = 'ru'">ru</button>
  </div>
</template>

<script>
import { linguiI18n } from '@ugzuzg/lingui-vue'

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      locale: 'en-GB',
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
