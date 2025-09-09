/* eslint-disable no-undef */
require('dotenv').config()
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI
}

// export default defineConfig([
//   {
//     ignores: ["dist/**"], files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser }, rules: {
//       'eqeqeq': 'error',
//     'no-trailing-spaces': 'error',
//     'object-curly-spacing': [
//         'error', 'always'
//     ],
//     'arrow-spacing': [
//         'error', { 'before': true, 'after': true }
//     ],
//     'no-console': 0
//     },
//   },
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
//   pluginReact.configs.flat.recommended,
// ]);