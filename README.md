# eslint-config-willclarktech

Default ESLint configuration for personal projects.

## Installation

Install the package:

```sh
npm install --save-dev https://github.com/willclarktech/eslint-config-willclarktech
```

Install the required peer dependencies:

```sh
npm install --save-dev eslint eslint-config-prettier eslint-plugin-functional eslint-plugin-import eslint-plugin-jest eslint-plugin-prettier
```

For TS projects also install these optional dependencies:

```sh
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

For React projects also install these optional dependencies:

```sh
npm install --save-dev eslint-config-react-app eslint-plugin-i18next eslint-plugin-react
```

## Usage

In JS/TS projects extend from the default config in your ESLint configuration file `.eslintrc.cjs`:

```js
module.exports = {
	extends: ["eslint-config-willclarktech"],
};
```

For TS projects, mark the `tsconfigRootDir` for detecting the location of the correct `tsconfig.json`:

```js
module.exports = {
	extends: ["eslint-config-willclarktech"],
	parserOptions: {
		// Make sure correct `tsconfig.json` is found eg in a monorepo
		tsconfigRootDir: __dirname,
	},
};
```

In React projects extend from the `react` config:

```js
module.exports = {
	extends: ["eslint-config-willclarktech/react"],
};
```

If you are using this config in a monorepo, and experiencing the error `ESLint couldn't determine the plugin "xxx" uniquely`, you can apply this patch in your `.eslintrc.cjs` file to solve the issue:

```js
require("eslint-config-willclarktech/patch/modern-module-resolution.cjs");
```

## Known issues

1. ESLint has some issues in monorepos as a result of its [dependency resolution method](https://eslint.org/blog/2022/08/new-config-system-part-2/#:~:text=Use%20native%20loading,JavaScript%20runtime%20directly), which requires us to install ESLint plugins in both the client project and the ESLint config itself.
   1. This should be solved by ESLint's [new flat config system](https://eslint.org/blog/2022/08/new-config-system-part-1/).
