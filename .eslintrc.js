const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    isProd ? 'plugin:prettier/recommended' : 'prettier',
    'prettier/standard',
    'prettier/react'
  ],
  rules: {
    'react/prop-types': 0,
    'no-console': isProd ? 'error' : 'off',
    'no-debugger': isProd ? 'error' : 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
