import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Target file types
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      ecmaVersion: 'latest', // ECMAScript 2022+
      sourceType: 'module', // Enable ESM syntax
      globals: globals.browser, // Add browser global variables
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Base JavaScript rules
      ...tseslint.configs.recommended.rules, // TypeScript-specific rules
      ...pluginReact.configs.recommended.rules, // React-specific rules
      'prettier/prettier': 'error', // Ensure Prettier formatting rules are enforced
      'react/react-in-jsx-scope': 'off', // React 17+ no longer requires `React` in scope
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ], // Ignore unused vars prefixed with `_`
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
]
