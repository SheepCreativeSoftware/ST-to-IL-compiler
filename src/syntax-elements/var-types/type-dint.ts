import type { TypeInterface } from './type-mapping.js';
import { VarType } from './var-type.js';

class TypeDINT extends VarType implements TypeInterface {
	// Regex for DINT values which is a 32-bit signed integer and can be in decimal
	public readonly SUPPORTED_VALUE_REGEX = /^-?\d+$/;
	// Min and Max Number in signed range of 32-bit
	public readonly SUPPORTED_ST_VALUES = ['-2147483648', '2147483647'];
	constructor(
		column: number,
		line: number,
		value: string | null,
	) {
		super(column, line, 'DWORD', value);
	}

	static create(column: number, line: number, value: string | null): TypeInterface {
		const preparedValue = value?.replace('_', '') ?? null;
		return new TypeDINT(column, line, preparedValue);
	}

	getCompiledType(): string {
		return 'R';
	}

	getCompiledValue(): string | null {
		const value = this.getValue();
		if (!value) return null;
		// Remove the prefix 16# from the hex number
		return value;
	}

	checkSemantic(): void | never {
		const value = this.getValue();
		if (!value) return;
		// eslint-disable-next-line curly -- It gets too long
		if (!this.SUPPORTED_VALUE_REGEX.test(value)) {
			throw new TypeError(`Invalid value "${value}" for DWORD type:${this.line}:${this.column}`);
		}

		// eslint-disable-next-line curly -- It gets too long
		if (this.SUPPORTED_ST_VALUES[0] > value || this.SUPPORTED_ST_VALUES[1] < value) {
			throw new TypeError(`Value "${value}" is out of range for DINT type:${this.line}:${this.column}`);
		}
	}
}

export { TypeDINT };
