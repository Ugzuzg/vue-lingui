module.exports = {
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src/'],
      exclude: ['*/node_modules/*'],
    },
  ],
  locales: ['en', 'ru'],
  sourceLocale: 'en',
  format: 'po',
  runtimeConfigModule: ['@ugzuzg/lingui-vue', 'i18n'],
  extractBabelOptions: {
    presets: ['@vue/cli-plugin-babel/preset'],
  },
}
