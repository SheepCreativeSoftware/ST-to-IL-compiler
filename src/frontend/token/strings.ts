import type { BaseTokenDefinition } from './base-token.js';

const stringDefinition: BaseTokenDefinition = {
	tokenType: 'strings',
	pattern: [
		/* eslint-disable no-control-regex -- We need to support all of them */
		{
			startsWith: /^"$/,
			startToFollow: /["\u0000-\uFFFF]+$/,
			satisfies: /^"[\u0000-\uFFFF]*"$/,
			subType: 'DWORD',
		},
		{
			startsWith: /^'$/,
			startToFollow: /^'['\x00-\xFF]+$/,
			satisfies: /^'[\x00-\xFF]*'$/,
			subType: 'WORD',
		},
		/* eslint-enable no-control-regex -- We need to support all of them */
	],
};

export { stringDefinition };
