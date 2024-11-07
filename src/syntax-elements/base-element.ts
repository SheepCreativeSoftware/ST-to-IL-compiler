class BaseElement {
	private readonly line: number;
	private readonly column: number;

	constructor(line: number, column: number) {
		this.line = line;
		this.column = column;
	}

	getLine(): number {
		return this.line;
	}

	getColumn(): number {
		return this.column;
	}
}

export { BaseElement };
