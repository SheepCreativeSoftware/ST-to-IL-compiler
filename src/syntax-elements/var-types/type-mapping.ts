import { TypeBool } from './type-bool.js';
import { TypeDINT } from './type-dint.js';
import { TypeDWORD } from './type-dword.js';
import { TypeFREAL } from './type-freal.js';
import { TypeREAL } from './type-real.js';

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
	'FREAL': TypeFREAL,
	'REAL': TypeREAL,
} as const;

export { TYPE_MAPPING };
export type { TypeInterface };
