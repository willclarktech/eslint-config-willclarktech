import willclarktechConfig from "./index.mjs";

const config = [
	...willclarktechConfig,
	{
		ignores: ["!.*", "build/", "node_modules/", "types/"],
	},
];

export default config;
