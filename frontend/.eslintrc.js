module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/v-bind-style": "off",
    "vue/v-on-style": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-param-reassign": "off"
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
