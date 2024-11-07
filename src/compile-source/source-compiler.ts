import type { ParseTree } from '../syntax-analysis/syntax-analyser.js';

const sourceCompiler = (parseTree: ParseTree): string => {
	return parseTree.map((element) => element.compile()).join('\n');
};

export { sourceCompiler };
