import { BaseToken } from './base-token.js';
import type { FinalToken } from './base-token.js';
import { frontendLanguageFeatures } from './language-features.js';
import type { LexicalDefinition } from './language-features.js';

type State = {
	column: number;
	current: string;
	currentLexem(): string;
	line: number;
	next: string;
	currentInstance: BaseToken | null
};

// eslint-disable-next-line complexity -- It is not getting better
const lexicalAnalyser = (input: string, startLine: number = 1): FinalToken[] => {
	const tokens: FinalToken[] = [];
	const { lexical } = frontendLanguageFeatures;

	const state: State = {
		column: 0,
		current: '',
		currentInstance: null,
		currentLexem() {
			return this.current+this.next;
		},
		line: startLine,
		next: '',
	};

	let ignoreFollowingUntil: null | string = null;
	for (let index = 0; index < input.length; index++) {
		state.current = input[index];
		state.next = input[index + 1];
		state.column++;

		if (state.current === '' || state.current === ' ' || state.current === '\t') {
			continue;
		}

		if (state.current === '\n') {
			state.column = 0;
			state.line++;
			continue;
		}

		if (ignoreFollowingUntil) {
			if (state.currentLexem().endsWith(ignoreFollowingUntil)) {
				if (ignoreFollowingUntil === '\n') {
					state.column = 0;
					state.line++;
				} else {
					state.column += 2;
				}
				ignoreFollowingUntil = null;
				index++;
				continue;
			} else {
				continue;
			}
		}

		if (lexical.ignorables.has(state.currentLexem())) {
			const { patterns } = lexical.ignorables.get(state.currentLexem()) as LexicalDefinition;
			if (patterns && state.currentLexem().startsWith(patterns.startsWith ?? '') && patterns.endsWith) {
				ignoreFollowingUntil = patterns.endsWith;
			} else {
				index++;
			}

			continue;
		}

		const newTokens = BaseToken.checkFollowingChars(state);
		if (newTokens.length) tokens.push(...newTokens);
		/*
		 * If (state.currentToken) {
		 * 	const currentVal = state.currentToken.value + state.current;
		 * 	if (state.currentToken.baseType === 'Identifier' && isAlphanumeric.test(currentVal)) {
		 * 		state.currentToken.value += state.current;
		 * 	} else if (state.currentToken.baseType === 'Number' && (isNumeric.test(currentVal) || isHexadecimal.test(currentVal) || [
		 * 		'.', 'e', 'E', '+', '-', '#',
		 * 	].includes(state.current))) {
		 * 		state.currentToken.value += state.current;
		 * 	} else if (state.currentToken.baseType === 'Symbole' && isSpecialCharAscii.test(state.current) ) {
		 * 		state.currentToken.value += state.current;
		 * 	} else {
		 * 		// New token without whitespace in between
		 * 		state.currentToken.column.end = state.column - 1;
		 * 		tokens.push(finalizeToken(state.currentToken));
		 * 		state.currentToken = createNewToken(state);
		 * 	}
		 * } else {
		 * 	state.currentToken = createNewToken(state);
		 * }
		 */

		/*
		 * If (isWhitespace.test(state.next)) {
		 * 	state.currentToken.column.end = state.column;
		 * 	tokens.push(finalizeToken(state.currentToken));
		 * 	state.currentToken = null;
		 * }
		 */
	}

	return tokens;
};

export { lexicalAnalyser };
export type { State };
