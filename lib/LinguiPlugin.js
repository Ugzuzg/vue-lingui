import { linguiI18n } from './i18n-context.js'

export let i18n = null

export const LinguiPlugin = {
  install: (Vue, options) => {
    const opts = Vue.observable(options)
    i18n = Vue.observable(options.i18n)
    options.i18n.on('change', () => {
      opts.i18n = options.i18n
      i18n = options.i18n
    })
    Object.defineProperty(Vue.prototype, linguiI18n, {
      get() {
        return opts
      },
    })
  },
}
