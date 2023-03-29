module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"airbnb",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "prettier"],
	rules: {
		"no-nested-ternary": 0,
	},
	settings: {
		"import/resolver": {
			node: {
				extentions: [".js", ".ts"],
			},
		},
	},
};
