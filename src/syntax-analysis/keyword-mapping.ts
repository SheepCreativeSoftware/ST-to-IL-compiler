import type { CompilerInterface } from '../compiler-interface.js';
import type { Token } from '../lexical-analysis/lexical-analyser.js';
import { VarBlock } from '../syntax-elements/variable-block.js';

type CreateFromTokens = (tokens: Token[], currentSearchIndex: number) => {
	lastSearchIndex: number;
	value: CompilerInterface;
};

const KEYWORD_MAPPING: Record<string, { createFromTokens: CreateFromTokens } | undefined> = {
	'VAR': VarBlock,
};

export { KEYWORD_MAPPING };
