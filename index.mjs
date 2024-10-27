import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintCommentsPlugin from "eslint-plugin-eslint-comments";
import functionalPlugin from "eslint-plugin-functional";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {Array<import('eslint').Linter.Config>} */
const config = [
	{
		// Global settings
		ignores: ["**/dist/**", "**/node_modules/**"],
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
	},
	{
		// Base config for all JavaScript/TypeScript files
		plugins: {
			"eslint-comments": eslintCommentsPlugin,
			functional: functionalPlugin,
			import: importPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			// Vanilla ESLint
			"no-console": ["warn", { allow: ["error", "info", "table", "warn"] }],
			"no-undef": "error",
			"sort-imports": ["error", { ignoreDeclarationSort: true }],

			// eslint-comments
			"eslint-comments/disable-enable-pair": [
				"error",
				{ allowWholeFile: true },
			],
			"eslint-comments/no-unused-disable": "error",

			// functional
			"functional/immutable-data": [
				"error",
				{ ignoreAccessorPattern: "this.**" },
			],

			// import
			"import/extensions": ["error", "always", { ts: "never", tsx: "never" }],
			"import/first": "error",
			"import/newline-after-import": "error",
			"import/no-absolute-path": "error",
			"import/no-amd": "error",
			"import/no-commonjs": "error",
			"import/no-cycle": "error",
			"import/no-deprecated": "error",
			"import/no-dynamic-require": "error",
			"import/no-mutable-exports": "error",
			"import/no-self-import": "error",
			"import/no-unused-modules": "error",
			"import/no-useless-path-segments": "error",
			"import/order": [
				"error",
				{ alphabetize: { order: "asc" }, "newlines-between": "always" },
			],
			"import/unambiguous": "error",
		},
	},
	{
		// TypeScript-specific configuration
		files: ["**/*.{cts,mts,ts,tsx}"],
		plugins: {
			"@typescript-eslint": tsPlugin,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		rules: {
			// @typescript-eslint
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/explicit-member-accessibility": [
				"error",
				{ accessibility: "explicit" },
			],
			"@typescript-eslint/member-ordering": "error",
			"@typescript-eslint/no-empty-function": "warn",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-unnecessary-condition": "error",
			"@typescript-eslint/no-unnecessary-type-assertion": "error",
			"@typescript-eslint/no-shadow": "error",
			"@typescript-eslint/prefer-readonly": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true,
				},
			],

			// functional
			"functional/prefer-readonly-type": [
				"error",
				{
					ignoreClass: "fieldsOnly",
				},
			],
		},
	},
	{
		// Test files configuration
		files: ["**/*.test.{cjs,cts,js,mjs,mts,ts,tsx}"],
		plugins: {
			jest: jestPlugin,
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off",
		},
	},
	{
		// CommonJS files configuration
		files: ["**/*.cjs"],
		languageOptions: {
			sourceType: "commonjs",
			globals: {
				// Node.js globals
				require: "readonly",
				module: "writable",
				exports: "writable",
				__dirname: "readonly",
				__filename: "readonly",
			},
		},
		rules: {
			"functional/immutable-data": "off",
			"functional/prefer-immutable-types": "off",
			"import/no-commonjs": "off",
			"import/unambiguous": "off",
		},
	},
];

export default config;
