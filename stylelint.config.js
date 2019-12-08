'use strict';

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  extends: [
    'stylelint-config-xo',
    'stylelint-config-css-modules',
    isProd ? 'stylelint-prettier/recommended' : 'stylelint-config-prettier'
  ]
};
