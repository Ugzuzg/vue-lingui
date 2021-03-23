import { createApp } from 'vue'
import { en, ru } from 'make-plural/plurals'
import App from './App.vue'
import { LinguiPlugin, setupI18n } from '@ugzuzg/lingui-vue'
import enCatalog from './locales/en/messages'
import ruCatalog from './locales/ru/messages'

export const i18n = setupI18n()
i18n.load('en', enCatalog.messages)
i18n.load('ru', ruCatalog.messages)
i18n.loadLocaleData('en', { plurals: en })
i18n.loadLocaleData('ru', { plurals: ru })
i18n.activate('en')

const app = createApp(App)
app.use(LinguiPlugin, { i18n, defaultTag: 'div' })
app.mount('#app')
