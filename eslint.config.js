import eslintPlugin from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactQueryPlugin from "@tanstack/eslint-plugin-query";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tseslintPlugin from "typescript-eslint";

export default tseslintPlugin.config(
  eslintPlugin.configs.recommended,
  ...tseslintPlugin.configs.recommended,
  // Prettier.
  prettierPlugin,
  // React.
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
    },
    settings: {
      react: {
        version: "detect", // You can add this if you get a warning about the React version when you lint
      },
    },
  },
  {
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: reactHooksPlugin.configs.recommended.rules,
  },
  // React-query.
  ...reactQueryPlugin.configs["flat/recommended"],
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    ignores: [".next/*"],
  },
);
