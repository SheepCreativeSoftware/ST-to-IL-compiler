/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @description Shows a usage guide for cli commands
 */

import { buntstift } from 'buntstift';
import commandLineUsage from 'command-line-usage';

const verifyOptions = [
	{
		alias: 'f',
		description: 'file to be verified',
		name: 'file',
		type: String,
	},
] as commandLineUsage.OptionDefinition[];

/** Shows a usage guide for cli commands */
const getHelp = () => {
	const usage = commandLineUsage([
		{
			content: 'ST to IL compiler tool',
			header: 'ST to IL compiler',
		},
		{
			header: 'Synopsis',
			optionList: [
				{
					description: 'Display this usage guide.',
					name: 'help',
					type: Boolean,
				},
				{
					description: 'Display the tool version.',
					name: 'version',
					type: Boolean,
				},
			],
		},
		{
			content: [{ name: 'verify', summary: 'Verifies that the source code is valid.' }],
			header: 'Command List',
		},
		{
			header: 'Verify Operation Options',
			optionList: verifyOptions,
		},
		{
			content: [
				'$ st-to-il-compiler <command> [options]',
				'$ st-to-il-compiler --help',
				'$ st-to-il-compiler verify -f "/some/file.st"',
			],
			header: 'Examples',
		},
		{
			content: 'Project home: {underline https://github.com/SheepCreativeSoftware/st-to-il-compiler}',
			header: 'Reference',
		},
	]);
	buntstift.raw(usage);
};

export { getHelp };
