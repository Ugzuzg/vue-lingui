import { linguiI18n } from './i18n-context.js'

export const LinguiPlugin = {
  install: (Vue, options) => {
    console.log('installing lingui')
    Object.defineProperty(Vue.prototype, linguiI18n, {
      get() {
        return options
      },
    })
  },
}
