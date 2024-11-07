export { getHelp } from './cli/getHelp.js';
export { getAppVersion } from './cli/getAppVersion.js';

const verifyFile = ({ filename }: { filename: string }): void => {
	// eslint-disable-next-line no-console -- CLI
	console.log(`Hello, ${filename}`);
};

export { verifyFile };
