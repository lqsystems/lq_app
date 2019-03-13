module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    "no-alert": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-param-reassign": "off",
    "no-shadow": "off",
    "no-unused-expressions": ["error", {"allowTernary": true}],
    "consistent-return": "off",
    "vue/v-bind-style": "off",
    "vue/v-on-style": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
