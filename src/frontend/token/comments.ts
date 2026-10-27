import type { BaseTokenDefinition } from './base-token.js';

const commentsDefinition: BaseTokenDefinition = {
	tokenType: 'comment',
	pattern: [
		{
			startsWith: /^\($/,
			startToFollow: /\(\*.*$/,
			satisfies: /\(\*.*\*\)/,
			subType: 'COM_BLOCK_1',
		},
		{
			startsWith: /^\/$/,
			startToFollow: /\/\*.*$/,
			satisfies: /^\/\*.*\*\/$/,
			subType: 'COM_BLOCK_2',
		},
		{
			startsWith: /^\/$/,
			startToFollow: /\/\/.*$/,
			satisfies: /^\/\/.*\n$/,
			subType: 'COM_LINE',
		},
	],
};

export { commentsDefinition };
