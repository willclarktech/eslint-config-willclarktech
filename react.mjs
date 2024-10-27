import willclarktechConfig from "eslint-config-willclarktech";
import i18nextPlugin from "eslint-plugin-i18next";
import reactPlugin from "eslint-plugin-react";

/** @type {Array<import('eslint').Linter.Config>} */
const config = [
	// Base willclarktech config
	...willclarktechConfig,

	// React and i18next config
	{
		plugins: {
			react: reactPlugin,
			i18next: i18nextPlugin,
		},
		rules: {
			...reactPlugin.configs.recommended.rules,
			...reactPlugin.configs["jsx-runtime"].rules,
			...i18nextPlugin.configs.recommended.rules,

			// Custom rule configurations
			"react-hooks/exhaustive-deps": [
				"error",
				{
					// support package `use-deep-compare`
					additionalHooks:
						"(useDeepCompareCallback|useDeepCompareEffect|useDeepCompareMemo)",
				},
			],
		},
	},

	// Test and stories files override
	{
		files: ["**/*.{stories,test}.{cjs,cts,js,mjs,mts,ts,tsx}"],
		rules: {
			// test files do not need i18n
			"i18next/no-literal-string": "off",
		},
	},
];

export default config;
