import { linguiI18n } from './i18n-context.js'

export const LinguiPlugin = {
  install: (Vue, options) => {
    const opts = Vue.observable(options)
    options.i18n.on('change', () => {
      opts.i18n = options.i18n
    })
    Object.defineProperty(Vue.prototype, linguiI18n, {
      get() {
        return opts
      },
    })
  },
}
