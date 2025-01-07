/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
}
