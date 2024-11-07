import { type ParseTree, syntaxAnalyser } from './syntax-analysis/syntax-analyser.js';
import { readFile, writeFile } from 'fs/promises';
import { buntstift } from 'buntstift';
import { lexicalAnalyser } from './lexical-analysis/lexical-analyser.js';
import { semanticAnalyser } from './semantic-analysis/semantic-analyser.js';
import { sourceCompiler } from './compile-source/source-compiler.js';

export { getHelp } from './cli/getHelp.js';
export { getAppVersion } from './cli/getAppVersion.js';

const readSourceFile = async ({ filename }: { filename: string }): Promise<string> => {
	buntstift.info(`Reading file: ${filename}`);
	const fileContent = await readFile(filename, 'utf-8');

	return fileContent;
};

const writeTargetFile = async ({ filename, content }: { filename: string; content: string }): Promise<void> => {
	buntstift.info(`Writing target file: ${filename}`);
	await writeFile(filename, content, 'utf-8');
	buntstift.success('Target file written');
};

const verifySource = ({ source }: { source: string }): ParseTree => {
	buntstift.info('Verifying code');

	const tokens = lexicalAnalyser(source);
	// eslint-disable-next-line no-console -- CLI output
	console.dir(tokens);

	const parseTree = syntaxAnalyser(tokens);
	// eslint-disable-next-line no-console -- CLI output
	console.dir(parseTree);

	semanticAnalyser(parseTree);
	buntstift.success('Source verified');

	return parseTree;
};

const verifyFile = async ({ filename }: { filename: string }): Promise<void> => {
	buntstift.info('Verifying code');
	const fileContent = await readSourceFile({ filename });
	verifySource({ source: fileContent });
};

const compileFile = async ({ filename }: { filename: string }): Promise<void> => {
	buntstift.info(`Compiling file: ${filename}`);

	const fileContent = await readSourceFile({ filename });
	const parseTree = verifySource({ source: fileContent });
	const compiledSource = sourceCompiler(parseTree);

	// eslint-disable-next-line no-console -- CLI output
	console.dir(compiledSource);
	await writeTargetFile({ content: compiledSource, filename: filename.replace(/\.st$/, '.src') });

	buntstift.success('File compiled');
};

export { compileFile, verifyFile };
