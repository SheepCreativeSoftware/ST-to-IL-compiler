import type { BaseTokenDefinition } from './base-token.js';

const operatorDefinition: BaseTokenDefinition = {
	tokenType: 'operator',
	pattern: {
		startsWith: /^[^\w\s]$/,
		startToFollow: /^[^\w\s]+$/,
		satisfies: /^[^\w\s]{1,2}$/,
	},
};

export { operatorDefinition };
