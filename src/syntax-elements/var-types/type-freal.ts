import type { TypeInterface } from './type-mapping.js';
import { VarType } from './var-type.js';

class TypeFREAL extends VarType implements TypeInterface {
	// Regex for FLOAT values which is a 32-bit floating point number with exponential notation
	public readonly SUPPORTED_VALUE_REGEX = /^-?\d+(\.\d+)?(E-?\d+)?$/;
	// Min and Max Number in signed range of 32-bit
	// eslint-disable-next-line no-magic-numbers -- It's a constant
	public readonly SUPPORTED_ST_VALUES = [-9.22337E+18, +9.22337E+18];
	constructor(
		column: number,
		line: number,
		value: string | null,
	) {
		super(column, line, 'FREAL', value);
	}

	static create(column: number, line: number, value: string | null): TypeInterface {
		const preparedValue = value?.replace('_', '') ?? null;
		return new TypeFREAL(column, line, preparedValue);
	}

	getCompiledType(): string {
		return 'R FLOAT';
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
		if (this.SUPPORTED_ST_VALUES[0] > Number(value) || this.SUPPORTED_ST_VALUES[1] < Number(value)) {
			throw new TypeError(`Value "${value}" is out of range for DINT type:${this.line}:${this.column}`);
		}
	}
}

export { TypeFREAL };
