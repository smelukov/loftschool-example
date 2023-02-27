// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
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
      files: ['**/*.spec.[jt]s', '**/*.spec.[jt]s'],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
      globals: {
        jest: true,
        nsObj: false,
      },
    },
    {
      parser: '@typescript-eslint/parser',
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        'no-case-declarations': 'off',
      },
      extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: ['prettier', '@typescript-eslint'],
    },
  ],
};
