import { TypeBool } from './type-bool.js';
import { TypeDINT } from './type-dint.js';
import { TypeDWORD } from './type-dword.js';

interface TypeInterface {
	checkSemantic(): void | never;
	getCompiledType(): string;
	getCompiledValue(): string | null;
}

type TypeCreation = (column: number, line: number, value: string | null) => TypeInterface;

const TYPE_MAPPING: Record<string, { create: TypeCreation } | undefined> = {
	'BOOL': TypeBool,
	'DINT': TypeDINT,
	'DWORD': TypeDWORD,
} as const;

export { TYPE_MAPPING };
export type { TypeInterface };
