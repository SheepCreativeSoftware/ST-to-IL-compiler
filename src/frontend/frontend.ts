// From text to meaning

import { lexicalAnalyser } from './lexer.js';

const frontendParser = ({ source }: { source: string }) => {
	const tokens = lexicalAnalyser( source );
	// eslint-disable-next-line no-console -- CLI output
	console.dir(tokens);
};

export { frontendParser };
