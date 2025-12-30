module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    // Regras personalizadas (ajuste conforme seu estilo)
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-explicit-any": "off",
    "vue/multi-word-component-names": "off"
  }
};



// original abaixo
// module.exports = {
//   root: true,
//   env: {
//     node: true,
//   },
//   extends: [
//     'plugin:vue/vue3-essential',
//     'eslint:recommended',
//   ],
// }
