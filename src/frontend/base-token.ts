import type { State } from './lexer.js';

type BaseType = 'Number' | 'Identifier' | 'Symbole' | 'Ignorable';

interface Token {
	baseType: BaseType
	value: string;
	line: number;
	column: {
		end: number
		start: number
	};
}

interface FinalToken extends Token {
	baseType: BaseType
	tokenType: string
	value: string;
	line: number;
	column: {
		end: number
		start: number
	};
}

type Patterns = Record<Exclude<BaseType, 'Ignorable'>, { pattern: { start: RegExp, startToFollow: RegExp | RegExp[], incomplete?: RegExp } }>;
const patterns: Patterns = {
	Identifier: {
		pattern: {
			// Starts with a A-Z case intensitive
			start: /^[a-zA-Z]$/,
			// Starts the same but allows numbers and underscore following
			startToFollow: /^[a-zA-z][a-zA-z0-9_]*$/,
		},
	},
	Number: {
		pattern: {
			// An incomplete Number may include these signs.
			incomplete: /[.eE+\-#]/,
			// Is number or number which includes decimal point or number with exponent
			start: /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/,
			// Is number or number which includes decimal point or number with exponent
			startToFollow: [
				/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/,
				// Hexadecimal numbers that are prefixed with 16# and can include underscore
				/^16#[0-9A-Fa-f_]+$/,
			],
		},
	},
	Symbole: {
		pattern: {
			// Every sign that is not alphanumeric
			start: /^[^\w\s]|_$/,
			startToFollow: /^[^\w\s]|_$/,
		},
	},
};

const isWhitespace = /^\s$/;

class BaseToken {
	token: Token;

	constructor(state: State) {
		let baseType: BaseType = 'Ignorable';
		if (patterns.Number.pattern.start.test(state.current + state.next)) {
			baseType = 'Number';
		} else if (patterns.Identifier.pattern.start.test(state.current)) {
			baseType = 'Identifier';
		} else if (patterns.Symbole.pattern.start.test(state.current)) {
			baseType = 'Symbole';
		}

		this.token = {
			baseType,
			column: {
				end: state.column,
				start: state.column,
			},
			line: state.line,
			value: state.current,
		};
	};

	testFollowingIdentifier(previous: string, current: string): boolean {
		const currentVal = previous + current;
		if (Array.isArray(patterns.Identifier.pattern.startToFollow)) {
			return patterns.Identifier.pattern.startToFollow.some((regex) => regex.test(currentVal));
		}

		return patterns.Identifier.pattern.startToFollow.test(currentVal);
	}

	testFollowingNumber(previous: string, current: string): boolean {
		const currentVal = previous + current;
		/* eslint-disable @stylistic/array-bracket-newline -- This style cannot be fixed */
		const tests = [
			...Array.isArray(patterns.Number.pattern.startToFollow) ? patterns.Number.pattern.startToFollow : [patterns.Number.pattern.startToFollow],
		];
		/* eslint-enable @stylistic/array-bracket-newline -- This style cannot be fixed */

		const result = tests.some((regex) => regex.test(currentVal));
		if (!result && patterns.Number.pattern.incomplete) {
			return patterns.Number.pattern.incomplete.test(current);
		}

		return result;
	}

	testFollowingSymbol(previous: string, current: string): boolean {
		const currentVal = previous + current;
		if (Array.isArray(patterns.Identifier.pattern.startToFollow)) {
			return patterns.Identifier.pattern.startToFollow.some((regex) => regex.test(currentVal));
		}

		return patterns.Identifier.pattern.startToFollow.test(currentVal);
	}

	static checkFollowingChars(state: State): FinalToken[] {
		const tokens: FinalToken[] = [];
		if (state.currentInstance) {
			const { current, currentInstance: currentToken } = state;
			const { value: previous } = currentToken.token;
			if (currentToken.token.baseType === 'Identifier' && currentToken.testFollowingIdentifier(previous, current)) {
				currentToken.token.value += current;
			} else if (currentToken.token.baseType === 'Number' && currentToken.testFollowingNumber(previous, current)) {
				currentToken.token.value += current;
			} else if (currentToken.token.baseType === 'Symbole' && currentToken.testFollowingSymbol(previous, current)) {
				currentToken.token.value += current;
			} else {
				// New token without whitespace in between
				currentToken.token.column.end = state.column - 1;
				tokens.push(currentToken.finalizeToken());
				state.currentInstance = new BaseToken(state);
			}
		} else {
			state.currentInstance = new BaseToken(state);
		}

		if (isWhitespace.test(state.next)) {
			state.currentInstance.token.column.end = state.column;
			tokens.push(state.currentInstance.finalizeToken());
			state.currentInstance = null;
		}

		return tokens;
	}

	finalizeToken(): FinalToken {
		if (!this.token) throw new Error('Finalize uninitialized Token');

		return { ...this.token, tokenType: '' };
	};
}

export { BaseToken };
export type { BaseType, FinalToken };
