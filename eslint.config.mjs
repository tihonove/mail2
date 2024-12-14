import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import importPlugin from "eslint-plugin-import";
import storybook from 'eslint-plugin-storybook'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    eslintPluginPrettierRecommended,
    eslintConfigPrettier,
    importPlugin.flatConfigs.recommended,
    ...storybook.configs['flat/recommended'],
    {
        files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            },
        }
    },
);