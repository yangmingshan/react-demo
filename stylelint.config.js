const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  extends: [
    'stylelint-config-standard',
    isProd ? 'stylelint-prettier/recommended' : 'stylelint-config-prettier'
  ]
};
