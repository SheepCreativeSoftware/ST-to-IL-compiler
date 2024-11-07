#!/usr/bin/env node
import {
	compileFile, getAppVersion, getHelp, verifyFile,
} from '../dist/app.js';
import { buntstift } from 'buntstift';
import commandLineArgs from 'command-line-args';

const cli = async () => {
	/* First - parse the main command */
	const mainDefinitions = [{ defaultOption: true, name: 'command' }];
	const mainOptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true });

	// eslint-disable-next-line no-underscore-dangle -- This is a lib convention
	const argv = mainOptions._unknown || [];

	if (argv.includes('--help')) return getHelp();

	if (argv.includes('--version')) return buntstift.info(await getAppVersion());

	if (mainOptions.command === 'verify') {
		/* Second - parse the command options */
		const verifyDefinitions = [{ alias: 'f', name: 'file', type: String }];
		const verifyOptions = commandLineArgs(verifyDefinitions, { argv });
		if (verifyOptions.file) return verifyFile({ filename: verifyOptions.file });

		buntstift.error('No file specified.');
		return buntstift.info('Use "st-to-il-compiler --help" for usage information');
	}

	if (mainOptions.command === 'compile') {
		/* Second - parse the command options */
		const compileDefinitions = [{ alias: 'f', name: 'file', type: String }];
		const compileOptions = commandLineArgs(compileDefinitions, { argv });
		if (compileOptions.file) return compileFile({ filename: compileOptions.file });

		buntstift.error('No file specified.');
		return buntstift.info('Use "st-to-il-compiler --help" for usage information');
	}

	buntstift.error(`Command unknown or missing: ${JSON.stringify(mainOptions)}`);
	return buntstift.info('Use "n4-simple-build --help" for usage information');
};

cli();
