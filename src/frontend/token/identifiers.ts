import type { BaseTokenDefinition } from './base-token.js';

const identifierDefinition: BaseTokenDefinition = {
	tokenType: 'identifier',
	pattern: {
		startsWith: /^[a-z_]$/i,
		startToFollow: /^[a-z_][a-z0-9_]*$/i,
		satisfies: /^[a-z_][a-z0-9_]*$/i,
	},
};

export { identifierDefinition };
