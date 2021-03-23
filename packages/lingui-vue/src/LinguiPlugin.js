import { reactive } from 'vue'

import { linguiI18n } from './i18n-context.js'

export let i18n = null

export const LinguiPlugin = {
  install: (app, options) => {
    const opts = (app.observable || reactive)(options)
    i18n = (app.observable || reactive)(options.i18n)
    options.i18n.on('change', () => {
      opts.i18n = options.i18n
      i18n = options.i18n
    })
    app.config.globalProperties[linguiI18n] = opts
  },
}
