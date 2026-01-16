module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  ignorePatterns: ['src/grammar.js', 'src/types.test.ts'],
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
        browser: true,
      },
    },
  ],
  rules: {
    // Add custom rules here if needed
  },
};