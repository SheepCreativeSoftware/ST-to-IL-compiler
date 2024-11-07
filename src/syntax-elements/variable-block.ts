import { BaseElement } from './base-element.js';
import type { Token } from '../lexical-analysis/lexical-analyser.js';
import { VariableDefinition } from './variable.js';

class VarBlock extends BaseElement {
	static startKeyword = 'VAR';
	static endKeyword = 'END_VAR';

	constructor(
		line: number,
		column: number,
		private variables: VariableDefinition[],
	) {
		super(line, column);
	}

	getVariables(): VariableDefinition[] {
		return this.variables;
	}

	static createFromTokens(tokens: Token[], currentSearchIndex: number): { lastSearchIndex: number, value: BaseElement } {
		const line = tokens[currentSearchIndex].line;
		const column = tokens[currentSearchIndex].column;

		// eslint-disable-next-line curly -- Line gets too long
		if (tokens[currentSearchIndex].value !== VarBlock.startKeyword) {
			throw new SyntaxError(`Expected keyword ${VarBlock.startKeyword} but got ${tokens[currentSearchIndex].value}:${line}:${column}`);
		}

		const variables: VariableDefinition[] = [];

		let lastSearchIndex = currentSearchIndex + 1;
		while (tokens[lastSearchIndex].value !== VarBlock.endKeyword) {
			const variable = VariableDefinition.createFromTokens(tokens, lastSearchIndex);
			variables.push(variable.value as VariableDefinition);
			lastSearchIndex = variable.lastSearchIndex + 1;
		}

		return {
			lastSearchIndex,
			value: new VarBlock(line, column, variables),
		};
	}
}

export { VarBlock };
