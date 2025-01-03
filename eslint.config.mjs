import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import storybook from "eslint-plugin-storybook";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    eslintPluginPrettierRecommended,
    eslintConfigPrettier,
    importPlugin.flatConfigs.recommended,
    ...storybook.configs["flat/recommended"],
    {
    languageOptions: {
        globals: {
            ...globals.node
        },
        parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "import/named": "off",
        },
    }
);
