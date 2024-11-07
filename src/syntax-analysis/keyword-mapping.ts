/* eslint-disable @typescript-eslint/unbound-method -- There is not "this" in use */
import type { BaseElement } from '../syntax-elements/base-element.js';
import type { Token } from '../lexical-analysis/lexical-analyser.js';
import { VarBlock } from '../syntax-elements/variable-block.js';

type CreateFromTokens = (tokens: Token[], currentSearchIndex: number) => {
	lastSearchIndex: number;
	value: BaseElement;
};

const KEYWORD_MAPPING: Record<string, CreateFromTokens | undefined> = {
	'VAR': VarBlock.createFromTokens,
};

export { KEYWORD_MAPPING };
