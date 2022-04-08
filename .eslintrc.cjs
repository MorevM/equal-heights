module.exports = {
	root: true,
	extends: [
		'@morev/eslint-config/base',
		'@morev/eslint-config/node',
		'@morev/eslint-config/browser',
		'@morev/eslint-config/preset/typescript',
		'@morev/eslint-config/preset/assistive',
		'@morev/eslint-config/preset/html',
	],
	rules: {},
	overrides: [
		{
			files: ['*.js'],
			rules: {
				'no-extra-boolean-cast': 'off',
				'unicorn/no-empty-file': 'off',
			},
		},
		{
			files: ['**/__tests__/unit/tests/**/*.[jt]s?(x)'],
			extends: ['@morev/eslint-config/jest'],
		},
		{
			files: ['**/__tests__/integration/tests/**/*.[jt]s?(x)'],
			extends: ['@morev/eslint-config/cypress'],
		},
	],
};
