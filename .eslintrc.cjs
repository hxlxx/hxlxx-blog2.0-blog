/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    quotes: ['error', 'single'],
    semi: [0],
    'comma-dangle': [0],
    'prefer-const': [0],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'Icon']
      }
    ]
  }
}
