const tsConfig = {
	plugins: ["@typescript-eslint"],
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:functional/external-typescript-recommended",
		"plugin:import/typescript",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
	},
	rules: {
		// @typescript-eslint
		"@typescript-eslint/consistent-type-imports": "error",
		// encourage use of private accessibility modifier
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
		// use with functional/prefer-readonly-type
		// mark class variables as readonly if not mutated
		"@typescript-eslint/prefer-readonly": "error",

		// functional
		// use with @typescript-eslint/prefer-readonly
		"functional/prefer-readonly-type": [
			"error",
			{
				// allow mutating class variables
				ignoreClass: "fieldsOnly",
			},
		],
	},
	overrides: [
		{
			files: ["**/*.test.{cts,mts,ts,tsx}"],
			rules: {
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-unsafe-argument": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-unsafe-return": "off",
			},
		},
	],
};

module.exports = {
	plugins: ["eslint-comments", "functional", "import", "prettier"],
	extends: [
		"eslint:recommended",
		"prettier",
		"plugin:prettier/recommended",
		"plugin:eslint-comments/recommended",
		"plugin:import/recommended",
		"plugin:functional/external-vanilla-recommended",
		"plugin:functional/no-mutations",
	],
	rules: {
		// Vanilla ESLint
		"no-console": ["warn", { allow: ["error", "info", "table", "warn"] }],
		"no-undef": "error",
		"sort-imports": ["error", { ignoreDeclarationSort: true }],

		// @typescript-eslint
		// emulate TS style of ignoring unused names beginning with _
		// see https://typescript-eslint.io/rules/no-unused-vars/#benefits-over-typescript
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

		// allow disabling eslint rules for whole file without re-enabling it at the end of the file
		"eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
		// make sure every eslint-disable comments are is used
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
	overrides: [
		{
			files: ["**/*.cjs"],
			env: {
				node: true,
			},
			rules: {
				// `exports` object is mutable
				"functional/immutable-data": "off",
				"functional/prefer-immutable-types": "off",
				"import/no-commonjs": "off",
				"import/unambiguous": "off",
			},
		},
		{
			files: ["**/*.test.{cjs,cts,js,mjs,mts,ts,tsx}"],
			plugins: ["jest"],
			extends: ["plugin:jest/recommended"],
			env: {
				node: true,
			},
		},
		{
			files: ["*.{cts,mts,ts,tsx}"],
			...tsConfig,
		},
	],
};
