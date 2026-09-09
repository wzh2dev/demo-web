// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: ['prettier'],
  rules: {
    'no-console': 'error',
    'max-len': ['error', { code: 120 }],
    'array-bracket-newline': ['error', 'consistent']
  }
}
