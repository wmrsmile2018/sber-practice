import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import boundaries from 'eslint-plugin-boundaries';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettier,
  { ignores: ['dist/**'] },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },

      globals: {
        document: 'readonly',
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      boundaries,
    },

    settings: {
      react: {
        version: 'detect',
      },

      'boundaries/elements': [
        { type: 'shared', pattern: 'src/1-shared/*' },
        { type: 'entities', pattern: 'src/2-entities/*' },
        { type: 'features', pattern: 'src/3-features/*' },
        { type: 'widgets', pattern: 'src/4-widgets/*' },
        { type: 'pages', pattern: 'src/5-pages/*' },
        { type: 'app', pattern: 'src/6-app/*' },
      ],

      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
        node: {
          extensions: ['.ts', '.tsx', '.d.ts'],
        },
      },
    },

    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': 'off',
      'no-unused-vars': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'react-hooks/set-state-in-effect': 'off',

      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            { from: 'shared', allow: ['shared'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'features', allow: ['shared', 'entities'] },
            { from: 'widgets', allow: ['shared', 'features', 'entities'] },
            {
              from: 'pages',
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'app',
              allow: ['shared'],
            },
          ],
        },
      ],
    },
  },
];
