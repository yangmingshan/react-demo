'use strict';

const confusingBrowserGlobals = require('confusing-browser-globals');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  extends: [
    'xo/esnext',
    require.resolve('xo/config/plugins'),
    'xo-react',
    'plugin:prettier/recommended',
    'prettier/unicorn',
    'prettier/react'
  ],
  rules: {
    'no-console': isProd ? 2 : 0,
    'no-debugger': isProd ? 2 : 0,
    'no-restricted-globals': [2, ...confusingBrowserGlobals],
    'import/no-unassigned-import': 0,
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};

if (!isProd) {
  config.extends = [
    ...config.extends,
    'silent',
    'silent/import',
    'silent/prettier',
    'silent/react',
    'silent/unicorn'
  ];
}

module.exports = config;
