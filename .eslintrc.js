module.exports = {
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },

  root: true,

  env: {
    node: true,
    browser: true
  },

  extends: [
    "plugin:vue/recommended",
    "plugin:vue/essential",
    "@vue/prettier",
    "plugin:prettier/recommended"
  ],

  parserOptions: {
    parser: "babel-eslint"
  }
};
