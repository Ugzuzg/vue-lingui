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
  runtimeConfigModule: ['./lib/index', 'i18n'],
}
