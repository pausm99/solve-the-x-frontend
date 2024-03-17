module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
    ],
    parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
  
      'indent': ['error', 4],
      'vue/html-indent': ['error', 4],
      'vue/script-indent': ['error', 4, { 'baseIndent': 1 }],
      'vue/html-closing-bracket-newline': ['error', { 'multiline': 'always' }],
      'vue/max-attributes-per-line': ['error', {
        'singleline': 3,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }],
      
      'quotes': ['error', 'single'],
      'vue/html-quotes': ['error', 'single'],
      'vue/singleline-html-element-content-newline': 'off',
      
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/html-self-closing': ['error', {
        'html': {
          'void': 'always',
          'normal': 'never',
          'component': 'always'
        },
        'svg': 'always',
        'math': 'always'
      }]
    }
  };
  