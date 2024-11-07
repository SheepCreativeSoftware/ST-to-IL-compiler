import path from 'node:path';
import { readFile } from 'node:fs/promises';

const getAppVersion = async () => {
	const appPackageJsonPath = path.join(process.cwd(), 'package.json');
	const appPackage = await readFile(appPackageJsonPath, 'utf-8');
	const appPackageJson = JSON.parse(appPackage);
	const version = appPackageJson.version;
	return version;
};

export { getAppVersion };
