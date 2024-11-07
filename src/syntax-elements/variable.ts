import { BaseElement } from './base-element.js';
import type { CompilerInterface } from '../compiler-interface.js';
import type { Token } from '../lexical-analysis/lexical-analyser.js';

const VARIABLE_TYPE = [
	'BIT',
	'BOOL',
	'DWORD',
	'WORD',
	'INT',
	'DINT',
	'REAL',
] as const;
type VariableType = typeof VARIABLE_TYPE[number];

const TYPE_MAPPING: Record<VariableType, string> = {
	BIT: 'F',
	BOOL: 'F',
	DINT: 'R',
	DWORD: 'R FLOAT',
	INT: 'R',
	REAL: 'R FLOAT',
	WORD: 'R FLOAT',
};

const VALUE_MAPPING: Record<string, string> = {
	'FALSE': '0',
	'TRUE': '1',
};

const VALID_BIT_VALUES = [0, 1];
const VALID_BOOL_VALUES = [...VALID_BIT_VALUES, true, false];
// Regex for DWORD values which is a 32-bit unsigned integer and can be in decimal or hexadecimal
const VALID_DWORD_VALUES = /^(0x[0-9A-Fa-f]+|\d+)$/;
// Regex for WORD values which is a 16-bit unsigned integer and can be in decimal or hexadecimal
const VALID_WORD_VALUES = /^(0x[0-9A-Fa-f]+|\d+)$/;
// Regex for INT values which is a 16-bit signed integer and can be in decimal
const VALID_INT_VALUES = /^-?\d+$/;
// Regex for DINT values which is a 32-bit signed integer and can be in decimal
const VALID_DINT_VALUES = /^-?\d+$/;
// Regex for REAL values which is a 32-bit floating point number that has a decimal point or an exponent or both
const VALID_REAL_VALUES = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;

class VariableDefinition extends BaseElement implements CompilerInterface {
	private constructor(
		line: number,
		column: number,
		private name: string,
		private type: VariableType,
		private value: string | number | boolean | null,
	) {
		super(line, column);
	}

	getName(): string {
		return this.name;
	}

	getType(): VariableType {
		return this.type;
	}

	getValue(): string | number | boolean | null {
		return this.value;
	}

	/* eslint-disable complexity, no-magic-numbers -- evaluation of the type is complex by nature */
	static createFromTokens(tokens: Token[], currentSearchIndex: number): { lastSearchIndex: number, value: CompilerInterface } {
		const name = tokens[currentSearchIndex];
		if (name.type !== 'identifier') throw new SyntaxError(`VariableDefinition name is not an valid identifier:${name.line}:${name.column}`);

		const typeAssignment = tokens[currentSearchIndex + 1];
		// eslint-disable-next-line curly -- Line gets too long
		if (typeAssignment.type !== 'delimiter' || typeAssignment.value !== ':') {
			throw new SyntaxError(`Missing colon in variable assignment:${typeAssignment.line}:${typeAssignment.column}`);
		}

		const type = tokens[currentSearchIndex + 2];
		/* @ts-expect-error -- This is to check if the type is the same as the variableType */
		// eslint-disable-next-line curly -- Line gets too long
		if (type.type !== 'keyword' && !VARIABLE_TYPE.includes(type.value)) {
			throw new SyntaxError(`VariableDefinition type is not a valid keyword:${type.line}:${type.column}`);
		}

		let valueToken = null;
		let lastSearchIndex = currentSearchIndex + 3;
		if (tokens[currentSearchIndex + 3].type === 'operator' && tokens[currentSearchIndex + 3].value === ':=') {
			valueToken = tokens[currentSearchIndex + 4];
			// eslint-disable-next-line curly -- Line gets too long
			if (valueToken.type !== 'identifier' && valueToken.type !== 'number' && valueToken.type !== 'keyword') {
				throw new SyntaxError(`Variable value "${valueToken.value}" is not valid:${valueToken.line}:${valueToken.column}`);
			}

			const lineEnd = tokens[currentSearchIndex + 5];

			// eslint-disable-next-line curly -- Line gets too long
			if (lineEnd.type !== 'delimiter' || lineEnd.value !== ';') {
				throw new SyntaxError(`Missing semicolon at the end:${lineEnd.line}:${lineEnd.column}`);
			}
			lastSearchIndex += 2;
		} else if (tokens[currentSearchIndex + 3].type !== 'delimiter' || tokens[currentSearchIndex + 3].value !== ';') {
			throw new SyntaxError(`Missing semicolon at the end:${type.line}:${type.column}`);
		}

		return {
			lastSearchIndex,
			value: new VariableDefinition(name.line, name.column, name.value, type.value as VariableType, valueToken?.value ?? null),
		};
	}
	/* eslint-enable complexity, no-magic-numbers -- End */
	// eslint-disable-next-line complexity -- It must check every possible type
	semanticCheck(): void {
		if (this.value === null) return;

		switch (this.type) {
			case 'BIT':
				/* eslint-disable curly -- Line gets too long */
				if (!VALID_BIT_VALUES.includes(this.value as number)) {
					throw new SyntaxError(`Variable value "${this.value}" is not valid for type ${this.type}:${this.getLine()}:${this.getColumn()}`);
				}

				break;
			case 'BOOL':
				if (!VALID_BOOL_VALUES.includes(this.value as number | boolean)) {
					throw new SyntaxError(`Variable value "${this.value}" is not valid for type ${this.type}:${this.getLine()}:${this.getColumn()}`);
				}

				break;
			case 'DWORD':
				if (!VALID_DWORD_VALUES.exec(this.value as string)) {
					throw new SyntaxError(`Variable value "${this.value}" is not valid for type ${this.type}:${this.getLine()}:${this.getColumn()}`);
				}

				break;
			case 'WORD':
				if (!VALID_WORD_VALUES.exec(this.value as string)) {
					throw new SyntaxError(`Variable value "${this.value}" is not valid for type ${this.type}:${this.getLine()}:${this.getColumn()}`);
				}

				break;
			case 'INT':
				if (!VALID_INT_VALUES.exec(this.value as string)) {
					throw new SyntaxError(`Variable value "${this.value}" is not valid for type ${this.type}:${this.getLine()}:${this.getColumn()}`);
				}

				break;
			case 'DINT':
				if (!VALID_DINT_VALUES.exec(this.value as string)) {
					throw new SyntaxError(`Variable value "${this.value}" is not valid for type ${this.type}:${this.getLine()}:${this.getColumn()}`);
				}

				break;
			case 'REAL':
				if (!VALID_REAL_VALUES.exec(this.value as string)) {
					throw new SyntaxError(`Variable value "${this.value}" is not valid for type ${this.type}:${this.getLine()}:${this.getColumn()}`);
				}

				break;
			default:
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- This should never happen
				throw new SyntaxError(`Unknown type ${this.type}:${this.getLine()}:${this.getColumn()}`);
		}
		/* eslint-enable curly -- End */
	}
	compile(): string {
		if (this.value === null) return `${this.name} EQU ${TYPE_MAPPING[this.type]};`;
		// eslint-disable-next-line curly -- Line gets too long
		if (typeof this.value === 'string' && VALUE_MAPPING[this.value]) {
			return `${this.name} EQU ${TYPE_MAPPING[this.type]} := ${VALUE_MAPPING[this.value]};`;
		};

		return `${this.name} EQU ${TYPE_MAPPING[this.type]} := ${this.value};`;
	}
}

export { VariableDefinition };
export type { VariableType };
