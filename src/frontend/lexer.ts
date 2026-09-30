import { frontendLanguageFeatures } from './language-features.js';
import type { BaseType, LexicalDefinition } from './language-features.js';

interface Token {
	baseType: BaseType
	tokenType: string
	value: string;
	line: number;
	column: {
		end: number
		start: number
	};
}

type State = {
	column: number;
	current: string;
	currentLexem(): string;
	line: number;
	next: string;
	currentToken: Token | null
};

const isLetter = /^[a-zA-Z]$/;
const isAlphanumeric = /^[a-zA-z][a-zA-z0-9_]*$/;
// Is number or number which includes decimal point or number with exponent
const isNumeric = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
// Fin hexadecimal numbers that are prefixed with 16# and can include underscore
const isHexadecimal = /^16#[0-9A-Fa-f_]+$/;

const isSpecialCharAscii = /^[^\w\s]|_$/;
const isWhitespace = /^\s$/;

const finalizeToken = (token: Token): Token => {
	return token;
};

const createNewToken = (state: State): Token => {
	let baseType: BaseType = 'Ignorable';
	if (isNumeric.test(state.current)) {
		baseType = 'Number';
	} else if (isLetter.test(state.current)) {
		baseType = 'Identifier';
	} else if (isSpecialCharAscii.test(state.current)) {
		baseType = 'Symbole';
	}

	return {
		baseType,
		column: {
			end: state.column,
			start: state.column,
		},
		line: state.line,
		tokenType: '',
		value: state.current,
	};
};

const lexicalAnalyser = (input: string, startLine: number = 1): Token[] => {
	const tokens: Token[] = [];
	const { lexical } = frontendLanguageFeatures;

	const state: State = {
		column: 0,
		current: '',
		currentLexem() {
			return this.current+this.next;
		},
		currentToken: null,
		line: startLine,
		next: '',
	};

	let ignoreFollowingUntil: null | string = null;
	for (let index = 0; index < input.length; index++) {
		state.current = input[index];
		state.next = input[index + 1];

		if (state.current === '' || state.current === ' ' || state.current === '\t') {
			state.column++;
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

		if (state.currentToken) {
			const currentVal = state.currentToken.value + state.current;
			if (state.currentToken.baseType === 'Identifier' && isAlphanumeric.test(currentVal)) {
				state.currentToken.value += state.current;
			} else if (state.currentToken.baseType === 'Number' && (isNumeric.test(currentVal) || isHexadecimal.test(currentVal) || [
				'.', 'e', 'E', '+', '-', '#',
			].includes(state.current))) {
				state.currentToken.value += state.current;
			} else if (state.currentToken.baseType === 'Symbole' && isSpecialCharAscii.test(state.current) ) {
				state.currentToken.value += state.current;
			} else {
				state.currentToken.column.end++;
				tokens.push(finalizeToken(state.currentToken));
				state.currentToken = createNewToken(state);
			}
		} else {
			state.currentToken = createNewToken(state);
		}

		if (isWhitespace.test(state.next)) {
			state.currentToken.column.end++;
			tokens.push(finalizeToken(state.currentToken));
			state.currentToken = null;
		}
	}

	return tokens;
};

export { lexicalAnalyser };
