import type { TypeInterface } from './type-mapping.js';
import { VarType } from './var-type.js';

class TypeDINT extends VarType implements TypeInterface {
	// Regex for DINT values which is a 32-bit signed integer and can be in decimal
	public readonly SUPPORTED_VALUE_REGEX = /^-?\d+$/;
	// Min and Max Number in signed range of 32-bit
	// eslint-disable-next-line no-magic-numbers -- It's a constant
	public readonly SUPPORTED_ST_VALUES = [-2147483648, 2147483647];
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

		if (!this.SUPPORTED_VALUE_REGEX.test(value)) {
			throw new TypeError(`Invalid value "${value}" for DWORD type:${this.line}:${this.column}`);
		}

		if (this.SUPPORTED_ST_VALUES[0] > parseInt(value) || this.SUPPORTED_ST_VALUES[1] < parseInt(value)) {
			throw new TypeError(`Value "${value}" is out of range for DINT type:${this.line}:${this.column}`);
		}
	}
}

export { TypeDINT };
