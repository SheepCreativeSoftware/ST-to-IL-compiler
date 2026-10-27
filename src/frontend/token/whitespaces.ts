import type { BaseTokenDefinition } from './base-token.js';

const whitespaceDefinition: BaseTokenDefinition = {
	tokenType: 'whitespace',
	pattern: {
		startsWith: /^\s$/,
		startToFollow: /^\s+$/,
		satisfies: /^\s+$/,
	},
};

export { whitespaceDefinition };
