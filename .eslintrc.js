module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/recommended"
  ],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },

  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/recommended",
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier"
  ],

  parserOptions: {
    parser: "babel-eslint"
  }
};
