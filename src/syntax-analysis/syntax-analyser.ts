import type { CompilerInterface } from '../compiler-interface.js';
import { KEYWORD_MAPPING } from './keyword-mapping.js';
import type { Token } from '../lexical-analysis/lexical-analyser.js';

type ParseTree = CompilerInterface[];

const syntaxAnalyser = (tokens: Token[]): ParseTree => {
	const parseTree: ParseTree = [];
	for (let index = 0; index < tokens.length; index++) {
		const token = tokens[index];
		const elementFactory = KEYWORD_MAPPING[token.value];

		if (!elementFactory) throw new SyntaxError(`Unknown keyword "${token.type}" with value "${token.value}":${token.line}:${token.column}`);

		const { lastSearchIndex, value } = elementFactory.createFromTokens(tokens, index);
		parseTree.push(value);
		index = lastSearchIndex + 1;
	}

	return parseTree;
};

export { syntaxAnalyser };
export type { ParseTree };
