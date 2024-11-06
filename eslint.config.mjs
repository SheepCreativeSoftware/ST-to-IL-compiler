/* eslint-disable sort-keys, no-magic-numbers -- That would be insane*/
import comments from '@eslint-community/eslint-plugin-eslint-comments';
import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default [
	pluginJs.configs.recommended,
	/** Default ruleset */
	{
		ignores: [
			'!.*', 'coverage/', 'dist/', 'node_modules/', 'public/',
		],

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2022,
				...globals.builtin,
				...globals.nodeBuiltin,
			},
			parserOptions: {
				ecmaVersion: 2022,
			},

		},
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/linebreak-style': ['error', 'unix'],
			'@stylistic/quotes': ['error', 'single'],
			'@stylistic/semi': ['error', 'always'],
			camelcase: [
				'error',
				{
					properties: 'always',
					ignoreDestructuring: false,
					ignoreImports: false,
					ignoreGlobals: false,
				},
			],
			'capitalized-comments': ['error', 'always'],
			complexity: [
				'error',
				{
					max: 10,
				},
			],
			'consistent-return': [
				'error',
				{
					treatUndefinedAsUnspecified: false,
				},
			],
			'consistent-this': ['error', 'that'],
			curly: ['error', 'multi-or-nest', 'consistent'],
			'default-case': [
				'error',
				{
					commentPattern: '^Skip\\sdefault',
				},
			],
			'default-case-last': 'error',
			'default-param-last': 'error',
			'dot-notation': 'error',
			eqeqeq: ['error', 'always', { 'null': 'ignore' }],
			'func-style': ['error', 'expression'],
			'id-denylist': [
				'error', 'err', 'e', 'cb', 'callback',
			],
			'id-length': [
				'error',
				{
					min: 3,
				},
			],
			'init-declarations': ['error', 'always'],
			'max-depth': [
				'error',
				{
					max: 4,
				},
			],
			'max-lines': [
				'error',
				{
					max: 500,
				},
			],
			'max-lines-per-function': [
				'off',
				{
					max: 20,
				},
			],
			'max-nested-callbacks': ['error', 3],
			'max-params': ['off', 5],
			'@stylistic/multiline-comment-style': ['error', 'starred-block'],
			'new-cap': [
				'error',
				{
					newIsCap: true,
					capIsNew: true,
					properties: true,
				},
			],
			'no-alert': ['error'],
			'no-array-constructor': 'error',
			'no-bitwise': [
				'error',
				{
					allow: ['~'],
				},
			],
			'no-caller': 'error',
			'@stylistic/no-confusing-arrow': 'error',
			'no-console': 'error',
			'no-continue': 'off',
			'no-delete-var': 'error',
			'no-else-return': [
				'error',
				{
					allowElseIf: false,
				},
			],
			'no-empty': [
				'error',
				{
					allowEmptyCatch: true,
				},
			],
			'no-empty-function': 'error',
			'no-eq-null': 'off',
			'@stylistic/no-floating-decimal': 'error',
			'no-implicit-coercion': 'error',
			'no-implicit-globals': 'error',
			'no-implied-eval': 'error',
			'no-inline-comments': 'error',
			'no-invalid-this': 'error',
			'no-label-var': 'error',
			'no-labels': 'error',
			'no-lone-blocks': 'error',
			'no-lonely-if': 'error',
			'no-loop-func': 'error',
			'no-magic-numbers': [
				'error',
				{
					ignore: [0, 1],
					ignoreArrayIndexes: true,
					ignoreDefaultValues: true,
				},
			],
			'@stylistic/no-mixed-operators': ['error', { 'allowSamePrecedence': true }],
			'no-multi-assign': 'error',
			'no-multi-str': 'error',
			'no-negated-condition': 'error',
			'no-nested-ternary': 'error',
			'no-new': 'error',
			'no-new-func': 'error',
			'no-object-constructor': 'error',
			'no-new-wrappers': 'error',
			'no-octal-escape': 'error',
			'no-param-reassign': 'error',
			'no-plusplus': [
				'off',
				{
					allowForLoopAfterthoughts: true,
				},
			],
			'no-proto': 'error',
			'no-redeclare': [
				'error',
				{
					builtinGlobals: true,
				},
			],
			'no-return-assign': 'error',
			'no-script-url': 'error',
			'no-restricted-syntax': ['error', 'SequenceExpression'],
			'no-shadow': [
				'error',
				{
					builtinGlobals: false,
					hoist: 'functions',
					allow: ['resolve', 'reject', 'done'],
					ignoreOnInitialization: false,
				},
			],

			'no-throw-literal': 'error',
			'no-undef-init': 'error',
			'no-undefined': 'error',
			'no-underscore-dangle': 'error',
			'no-unneeded-ternary': 'error',
			'no-unused-expressions': 'error',
			'no-unused-labels': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'no-useless-constructor': 'error',
			'no-useless-escape': 'error',
			'no-multiple-empty-lines': [
				'error',
				{
					max: 1,
					maxBOF: 0,
					maxEOF: 1,
				},
			],
			'no-useless-rename': [
				'error',
				{
					ignoreDestructuring: true,
					ignoreImport: false,
					ignoreExport: false,
				},
			],
			'no-useless-return': 'error',
			'no-var': 'error',
			'no-warning-comments': [
				'error',
				{
					terms: ['todo', 'fixme', 'xxx'],
					location: 'anywhere',
				},
			],
			'object-shorthand': 'error',
			'one-var': ['error', 'never'],
			'@stylistic/one-var-declaration-per-line': [
				'error',
				'initializations',
			],
			'operator-assignment': ['error', 'always'],
			'prefer-const': 'error',
			'prefer-numeric-literals': 'error',
			'prefer-promise-reject-errors': 'error',
			'prefer-rest-params': 'error',
			radix: ['error', 'as-needed'],
			'require-await': 'error',
			'sort-imports': [
				'error',
				{
					ignoreCase: true,
					ignoreDeclarationSort: false,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: [
						'none',
						'all',
						'multiple',
						'single',
					],
					allowSeparatedGroups: false,
				},
			],
			'sort-keys': [
				'error',
				'asc',
				{
					caseSensitive: true,
					natural: false,
					minKeys: 2,
				},
			],
			'sort-vars': [
				'off',
				{
					ignoreCase: true,
				},
			],
			'@stylistic/spaced-comment': ['error', 'always'],
			strict: ['error', 'safe'],
			yoda: 'error',

			'@stylistic/array-bracket-newline': [
				'error',
				{
					multiline: true,
					minItems: 4,
				},
			],
			'@stylistic/array-bracket-spacing': ['error', 'never'],
			'@stylistic/array-element-newline': ['error', 'consistent'],
			'@stylistic/arrow-parens': ['error', 'always'],
			'@stylistic/block-spacing': 'error',
			'@stylistic/brace-style': 'error',
			'@stylistic/comma-dangle': [
				'error',
				{
					arrays: 'always-multiline',
					objects: 'always-multiline',
					imports: 'always-multiline',
					exports: 'always-multiline',
					functions: 'always-multiline',
				},
			],
			'@stylistic/comma-spacing': [
				'error',
				{
					before: false,
					after: true,
				},
			],
			'@stylistic/comma-style': ['error', 'last'],
			'@stylistic/computed-property-spacing': ['error', 'never'],
			'@stylistic/dot-location': ['error', 'property'],
			'@stylistic/eol-last': ['error', 'always'],
			'@stylistic/func-call-spacing': ['error', 'never'],
			'@stylistic/function-call-argument-newline': ['error', 'consistent'],
			'@stylistic/function-paren-newline': ['error', 'multiline'],
			'@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
			'@stylistic/key-spacing': [
				'error',
				{
					beforeColon: false,
					afterColon: true,
					mode: 'strict',
				},
			],
			'@stylistic/keyword-spacing': [
				'error',
				{
					before: true,
					after: true,
					overrides: {

					},
				},
			],
			'@stylistic/line-comment-position': 'error',
			'@stylistic/lines-around-comment': 'off',
			'@stylistic/max-len': [
				'error',
				{
					code: 150,
					ignoreUrls: true,
					ignoreComments: true,
				},
			],
			'@stylistic/max-statements-per-line': [
				'error',
				{
					max: 1,
				},
			],
			'@stylistic/no-extra-parens': 'off',
			'@stylistic/no-trailing-spaces': 'error',
			'@stylistic/no-whitespace-before-property': 'error',
			'@stylistic/nonblock-statement-body-position': ['error', 'beside'],
			'@stylistic/object-curly-newline': [
				'error',
				{
					consistent: true,
				},
			],
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/object-property-newline': [
				'error',
				{
					allowAllPropertiesOnSameLine: true,
				},
			],
			'@stylistic/operator-linebreak': ['error', 'before'],
			'@stylistic/padded-blocks': ['error', 'never'],
			'@stylistic/switch-colon-spacing': 'error',
			'@stylistic/template-curly-spacing': 'error',
			'@stylistic/template-tag-spacing': 'error',
			'no-unused-vars': 'off',
		},
	},
	{
		plugins: { '@eslint-community/eslint-comments': comments },
		rules: {
			'@eslint-community/eslint-comments/disable-enable-pair': [
				'error',
				{ allowWholeFile: true },
			],
			'@eslint-community/eslint-comments/no-aggregating-enable': 'error',
			'@eslint-community/eslint-comments/no-duplicate-disable': 'error',
			'@eslint-community/eslint-comments/no-unlimited-disable': 'off',
			'@eslint-community/eslint-comments/no-unused-enable': 'error',
			'@eslint-community/eslint-comments/require-description': 'error',
		},
	},
	/** Typescript related rules with strict ruleset */
	...tseslint.config(
		pluginJs.configs.recommended,
		...tseslint.configs.strictTypeChecked,
		...tseslint.configs.stylisticTypeChecked,
		{
			rules: {
				'@typescript-eslint/consistent-type-imports': 'error',
				'@typescript-eslint/consistent-type-exports': 'error',
				'default-param-last': 'off',
				'@typescript-eslint/default-param-last': 'error',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-misused-promises': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/restrict-template-expressions': [
					'error',
					{
						allowNumber: true,
						allowBoolean: true,
						allowAny: true,
						allowNullish: true,
					},
				],
			},
			languageOptions: {
				parserOptions: {
					ecmaVersion: 2022,
					project: './tsconfig.eslint.json',
				},
			},
			files: ['**/*.ts', '**/*.mts', '**/*.tsx'],
		},
		/** Prevent type checking on non-TS files (causes parser errors)*/
		{
			files: [
				'**/*.js', '**/*.mjs', '**/*.cjs', '**/*.d.ts', '**/*.config.ts',
			],
			extends: [tseslint.configs.disableTypeChecked],
		},
	),
	{
		ignores: [
			'!.*', '/coverage/', 'dist/', 'node_modules/', 'public/',
		],
	},
];
