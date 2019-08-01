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
  plugins: ['react-hooks'],
  rules: {
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
    'no-console': isProd ? 2 : 0,
    'no-debugger': isProd ? 2 : 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
