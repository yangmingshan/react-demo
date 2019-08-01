module.exports = ({ env }) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
        targets: env('development') ? 'last 1 Chrome versions' : undefined
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
    [
      '@babel/plugin-proposal-optional-chaining',
      {
        loose: true
      }
    ],
    [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      {
        loose: true
      }
    ]
  ]
});
