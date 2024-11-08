import type { TypeInterface } from './type-mapping.js';
import { VarType } from './var-type.js';

class TypeDWORD extends VarType implements TypeInterface {
	// Hex number prefixed with 16# and 8 digits long (32-bit)
	public readonly SUPPORTED_VALUE_REGEX = /^16#[0-9A-F]{8}$/;
	constructor(
		column: number,
		line: number,
		value: string | null,
	) {
		super(column, line, 'DWORD', value);
	}

	static create(column: number, line: number, value: string | null): TypeInterface {
		const preparedValue = value?.toUpperCase().replace('_', '') ?? null;
		return new TypeDWORD(column, line, preparedValue);
	}

	getCompiledType(): string {
		return 'R';
	}

	getCompiledValue(): string | null {
		const value = this.getValue();
		if (!value) return null;
		// Remove the prefix 16# from the hex number
		return `${value.replace('16#', '0')}h`;
	}

	checkSemantic(): void | never {
		const value = this.getValue();
		// eslint-disable-next-line curly -- It gets too long
		if (value && !this.SUPPORTED_VALUE_REGEX.test(value)) {
			throw new TypeError(`Invalid value "${value}" for DWORD type:${this.line}:${this.column}`);
		}
	}
}

export { TypeDWORD };
