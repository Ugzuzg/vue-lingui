import Vue from 'vue'
import App from './App.vue'
import { LinguiPlugin, setupI18n } from './'
import enCatalog from './locales/en/messages'
import ruCatalog from './locales/ru/messages'

Vue.config.productionTip = false

export const i18n = setupI18n()
i18n.load('en', enCatalog)
i18n.load('ru', ruCatalog)
i18n.activate('ru')

Vue.use(LinguiPlugin, { i18n, defaultTag: 'div' })

new Vue({
  render: h => h(App),
}).$mount('#app')
