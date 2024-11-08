const VARIABLE_TYPE = [
	'BOOL',
	'DWORD',
	'FREAL',
	'WORD',
	'INT',
	'DINT',
	'REAL',
] as const;

type VariableType = typeof VARIABLE_TYPE[number];

class VarType {
	public readonly SUPPORTED_ST_VALUES: string[] | number[] = [];
	public readonly SUPPORTED_VALUE_REGEX: RegExp | null = null;
	constructor(
		public readonly column: number,
		public readonly line: number,
		public readonly type: VariableType,
		public readonly value: string | null,
	) { }

	getType(): VariableType {
		return this.type;
	}

	getValue(): string | null {
		return this.value;
	}
}

export { VarType, VARIABLE_TYPE };
export type { VariableType };
