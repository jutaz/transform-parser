module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  ignorePatterns: ['src/grammar.js'],
  rules: {
    // Add custom rules here if needed
  },
};