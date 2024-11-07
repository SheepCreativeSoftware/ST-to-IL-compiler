import { BaseElement } from './base-element.js';
import type { Token } from '../lexical-analysis/lexical-analyser.js';

const variableType = [
	'BIT',
	'BOOL',
	'BYTE',
	'DWORD',
	'WORD',
	'INT',
	'DINT',
	'REAL',
] as const;

type VariableType = typeof variableType[number];

class VariableDefinition extends BaseElement {
	private constructor(
		line: number,
		column: number,
		private name: string,
		private type: VariableType,
		private value: string | number | boolean | null,
	) {
		super(line, column);
	}

	/* eslint-disable complexity, no-magic-numbers -- evaluation of the type is complex by nature */
	static createFromTokens(tokens: Token[], currentSearchIndex: number): { lastSearchIndex: number, value: BaseElement } {
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
		if (type.type !== 'keyword' && !variableType.includes(type.value)) {
			throw new SyntaxError(`VariableDefinition type is not a valid keyword:${type.line}:${type.column}`);
		}

		let valueToken = null;
		let lastSearchIndex = currentSearchIndex + 3;
		if (tokens[currentSearchIndex + 3].type === 'operator' && tokens[currentSearchIndex + 3].value === ':=') {
			valueToken = tokens[currentSearchIndex + 4];
			// eslint-disable-next-line curly -- Line gets too long
			if (valueToken.type !== 'identifier' && valueToken.type !== 'number' && valueToken.type !== 'keyword') {
				throw new SyntaxError(`VariableDefinition value is not valid:${valueToken.line}:${valueToken.column}`);
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

	getName(): string {
		return this.name;
	}

	getType(): VariableType {
		return this.type;
	}

	getValue(): string | number | boolean | null {
		return this.value;
	}
}

export { VariableDefinition };
export type { VariableType };
