import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { includeIgnoreFile } from '@eslint/compat'
import stylistic from '@stylistic/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import importX from 'eslint-plugin-import-x'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

const defaultConfig = [

  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
  }),
  ...tseslint.config(
    ...tseslint.configs.stylistic,
    ...tseslint.configs.strict,
    {
      plugins: {
        '@stylistic': stylistic,
      },
      languageOptions: {
        parser: parserTs,
      },
      rules: {
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'no-undef-init': 'error',

        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        // 'no-extra-semi': 'off',
        // '@typescript-eslint/no-extra-semi': 'error',
        '@stylistic/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'comma',
              requireLast: true,
            },
            singleline: {
              delimiter: 'comma',
              requireLast: true,
            },
          },
        ],

      },
    },
    {
      plugins: {
        'import-x': importX,
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: true,
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
      rules: {
        'import-x/order': [
          'error',
          {
            'groups': [
              'builtin', // Built-in types are first
              ['sibling', 'parent'], // Then sibling and parent types. They can be mingled together
              'index', // Then the index file
              'object',
            ],
            'alphabetize': {
              order: 'asc',
              caseInsensitive: true,
            },
            'newlines-between': 'always',
          },
        ],
      },
    },
  ),
]

export default [
  includeIgnoreFile(gitignorePath),
  ...defaultConfig,
]
