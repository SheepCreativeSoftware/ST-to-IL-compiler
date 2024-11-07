import type { ParseTree } from '../syntax-analysis/syntax-analyser.js';

const semanticAnalyser = (parseTree: ParseTree): void | never => {
	for (const element of parseTree) element.semanticCheck();
};

export { semanticAnalyser };
