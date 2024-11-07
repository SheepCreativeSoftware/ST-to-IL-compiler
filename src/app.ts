import { buntstift } from 'buntstift';
import { lexicalAnalyser } from './lexical-analysis/lexical-analyser.js';
import { readFile } from 'fs/promises';

export { getHelp } from './cli/getHelp.js';
export { getAppVersion } from './cli/getAppVersion.js';

const verifyFile = async ({ filename }: { filename: string }): Promise<void> => {
	buntstift.info(`Verifying file: ${filename}`);

	const fileContent = await readFile(filename, 'utf-8');

	const tokens = lexicalAnalyser(fileContent);

	// eslint-disable-next-line no-console -- CLI output
	console.dir(tokens);
};

export { verifyFile };
