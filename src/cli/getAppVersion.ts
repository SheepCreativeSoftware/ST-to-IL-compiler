import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

const getAppVersion = async () => {
	const filename = fileURLToPath(import.meta.url);
	const dirname = path.dirname(filename);
	const appPackageJsonPath = path.join(dirname, '..', '..', '..', 'package.json');
	const appPackage = await readFile(appPackageJsonPath, 'utf-8');
	const appPackageJson = JSON.parse(appPackage);
	const version = appPackageJson.version;
	return version;
};

export { getAppVersion };
