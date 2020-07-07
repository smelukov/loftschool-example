module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV);

  return {
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          targets: {
            ie: '11',
          },
        },
      ],
    ],
    plugins: ['@babel/transform-runtime'],
    env: {
      test: {
        presets: [
          [
            '@babel/env',
            {
              modules: 'commonjs',
              targets: {
                node: 'current',
              },
            },
          ],
        ],
      },
    },
  };
};
