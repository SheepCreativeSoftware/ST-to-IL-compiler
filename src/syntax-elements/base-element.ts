import type { Token } from '../lexical-analysis/lexical-analyser.js';

class BaseElement {
	private readonly line: number;
	private readonly column: number;

	constructor(line: number, column: number) {
		this.line = line;
		this.column = column;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- This is an abstract method
	static createFromTokens(_tokens: Token[], _currentSearchIndex: number): { lastSearchIndex: number, value: BaseElement } {
		throw new Error('Method not implemented.');
	};

	getLine(): number {
		return this.line;
	}

	getColumn(): number {
		return this.column;
	}
}

export { BaseElement };
