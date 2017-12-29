module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
  },
  extends: ['standard', 'plugin:react/recommended'],
  plugins: [
    'react'
  ],
  rules: {
    'semi': [2, 'always', { 'omitLastInOneLineBlock': true }],
    'comma-dangle': [2, 'only-multiline'],
    'space-before-function-paren': [2, 'never'],
    'prefer-promise-reject-errors': 0,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'react/prop-types': 0,
    'react/no-deprecated': 1
  }
}

