module.exports = {
  extends: 'erb',
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 'off',
    'lines-between-class-members': 'off',
    'import/extensions': 'off',
    'import/namespace': 'off',
    'import/no-unresolved': 'off',
    'import/no-import-module-exports': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'promise/always-return': ['error', { ignoreLastCallback: true }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
  },
};
