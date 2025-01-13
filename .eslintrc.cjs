/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true // 启用 Node.js 全局变量支持
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-undef': 'error', // 检查未定义变量
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off'
  }
}
