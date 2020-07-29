// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: ['prettier', 'jest'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-undef': 'error',
    'no-extra-semi': 'error',
    'no-template-curly-in-string': 'error',
    'no-caller': 'error',
    'no-control-regex': 'off',
    'no-var': 'error',
    yoda: 'error',
    eqeqeq: ['error', 'smart'],
    'global-require': 'off',
    'brace-style': 'off',
    'eol-last': 'error',
    'no-extra-bind': 'warn',
    'no-process-exit': 'warn',
    'no-use-before-define': 'off',
    'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
    'no-unsafe-negation': 'error',
    'no-loop-func': 'warn',
    'prefer-const': 'error',
    indent: 'off',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.ts', '**/*.spec.js'],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
      globals: {
        jest: true,
        nsObj: false,
      },
    },
  ],
};
