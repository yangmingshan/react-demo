module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    'react-hot-loader/babel',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: false,
        useESModules: true
      }
    ],
    '@babel/plugin-syntax-dynamic-import'
  ]
};
