/* eslint-disable no-magic-numbers -- This is just for testing */

const DEFAULT_LENGTH = 10;

class Random {
	static stringValue(len: number = DEFAULT_LENGTH) {
		return Math.random().toString(36).slice(2, len + 2);
	}
}

export { Random };
