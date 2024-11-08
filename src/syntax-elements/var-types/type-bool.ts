import type { TypeInterface } from './type-mapping.js';
import { VarType } from './var-type.js';

class TypeBool extends VarType implements TypeInterface {
	public readonly SUPPORTED_ST_VALUES = [
		'TRUE', 'FALSE', '1', '0',
	];
	constructor(
		column: number,
		line: number,
		value: string | null,
	) {
		super(column, line, 'BOOL', value);
	}

	static create(column: number, line: number, value: string | null): TypeInterface {
		return new TypeBool(column, line, value);
	}

	getCompiledType(): string {
		return 'F';
	}
	getCompiledValue(): string {
		return this.getValue() === 'TRUE' ? '1' : '0';
	}
	checkSemantic(): void | never {
		const value = this.getValue();
		// eslint-disable-next-line curly -- It gets too long
		if (value && !this.SUPPORTED_ST_VALUES.includes(value)) {
			throw new TypeError(`Invalid value "${value}" for BOOL type:${this.line}:${this.column}`);
		}
	}
}

export { TypeBool };
