import type { BaseTokenDefinition } from './base-token.js';

const constantDefinition: BaseTokenDefinition = {
	tokenType: 'constant',
	pattern: [
		{
			startsWith: /^[+\-0-9]$/,
			startToFollow: /^[+\-0-9][+\-0-9.eE]*$/,
			satisfies: /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/,
			subType: 'REAL',
		},
		{
			startsWith: /^[+\-0-9]$/,
			startToFollow: /[+\-0-9_]/,
			satisfies: /^[-+]?[0-9]?[0-9_]?$/,
			subType: 'INT',
		},
		{
			startsWith: /^1$/i,
			startToFollow: /^1[0-9A-B_#]+$/i,
			satisfies: /^16#[0-9A-B]?[0-9A-B_]*[0-9A-B]$/i,
			subType: 'HEX',
		},
		{
			startsWith: /^2$/i,
			startToFollow: /^2[0-1_#]+$/i,
			satisfies: /^2#[0-9]?[0-9_]*[0-9]$/i,
			subType: 'BIN',
		},
	],
};

export { constantDefinition };
