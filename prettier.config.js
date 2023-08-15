/** @type {import("prettier").Config} */
export default {
  tabWidth: 2,
  singleQuote: true,
  semi: false,
  printWidth: 80,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
