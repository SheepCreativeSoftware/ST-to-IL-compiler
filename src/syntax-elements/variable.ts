import { TYPE_MAPPING, type TypeInterface } from './var-types/type-mapping.js';
import { BaseElement } from './base-element.js';
import type { CompilerInterface } from '../compiler-interface.js';
import type { Token } from '../lexical-analysis/lexical-analyser.js';

class VariableDefinition extends BaseElement implements CompilerInterface {
	private constructor(
		line: number,
		column: number,
		private name: string,
		private type: TypeInterface,
	) {
		super(line, column);
	}

	getName(): string {
		return this.name;
	}

	/* eslint-disable complexity, no-magic-numbers -- evaluation of the type is complex by nature */
	static createFromTokens(tokens: Token[], currentSearchIndex: number): { lastSearchIndex: number, value: CompilerInterface } {
		const tokensAtCurrentIndex = tokens.slice(currentSearchIndex);
		const endTokenIndex = tokensAtCurrentIndex.findIndex((token) => token.type === 'delimiter' && token.value === ';');
		if (endTokenIndex === -1) throw new SyntaxError(`Missing semicolon at the end of line:${tokens[currentSearchIndex].line}`);

		const tokensToEvaluate = tokensAtCurrentIndex.slice(0, endTokenIndex);
		const name = tokensToEvaluate[0];

		// eslint-disable-next-line curly -- Line gets too long
		if (name.type !== 'identifier') {
			throw new SyntaxError(`VariableDefinition name "${name.value}" is not an valid identifier:${name.line}:${name.column}`);
		}

		const typeAssignment = tokensToEvaluate[1];
		// eslint-disable-next-line curly -- Line gets too long
		if (typeAssignment.type !== 'delimiter' || typeAssignment.value !== ':') {
			throw new SyntaxError(`Missing colon in variable assignment:${typeAssignment.line}:${typeAssignment.column}`);
		}

		const type = tokensToEvaluate[2];

		let valueToken = null;
		let lastSearchIndex = currentSearchIndex + 3;
		if (tokensToEvaluate.length === 5) {
			valueToken = tokensToEvaluate[4];
			// eslint-disable-next-line curly -- Line gets too long
			if (valueToken.type !== 'identifier' && valueToken.type !== 'number' && valueToken.type !== 'keyword') {
				throw new SyntaxError(`Variable value "${valueToken.value}" is not valid:${valueToken.line}:${valueToken.column}`);
			}

			lastSearchIndex += 2;
		}

		const typeFactory = TYPE_MAPPING[type.value];
		if (!typeFactory) throw new SyntaxError(`Type "${type.value}" is not supported:${type.line}:${type.column}`);
		const typeValue = typeFactory.create(name.column, name.line, valueToken?.value ?? null);

		return {
			lastSearchIndex,
			value: new VariableDefinition(name.line, name.column, name.value, typeValue),
		};
	}
	/* eslint-enable complexity, no-magic-numbers -- End */

	semanticCheck(): void {
		this.type.checkSemantic();
	}
	compile(): string {
		if (this.type.getCompiledValue() === null) return `${this.name} EQU ${this.type.getCompiledType()}`;

		return `${this.name} EQU ${this.type.getCompiledType()} := ${this.type.getCompiledValue()}`;
	}
}

export { VariableDefinition };
