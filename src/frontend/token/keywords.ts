import type { BaseTokenDefinition } from './base-token.js';

const keywordDefinition: BaseTokenDefinition = {
	tokenType: 'keyword',
	pattern: {
		startsWith: /^[a-z]$/i,
		startToFollow: /^[a-z]\w+$/i,
		satisfies: /^[a-z]\w*[a-z]$/i,
	},
};

export { keywordDefinition };
