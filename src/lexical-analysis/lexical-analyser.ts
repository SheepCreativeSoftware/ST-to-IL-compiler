import { ALL_OPERATORS, DELIMITERS } from './token-constants.js';
import { KEYWORDS } from './keywords-constants.js';

interface Token {
	type: 'keyword' | 'identifier' | 'operator' | 'delimiter' | 'number' | 'unknown';
	value: string;
	line?: number;
	column?: number;
}

const LAST_WORD = -1;

const hasDelimiter = (word: string): boolean => {
	if (word.startsWith('(')) return true;

	if (DELIMITERS.includes(word.at(LAST_WORD) ?? '')) return true;

	return false;
};

const checkForKnownWord = (word: string, line: number, column: number): Token | null => {
	if (ALL_OPERATORS.includes(word)) return { column, line, type: 'operator', value: word };
	if (KEYWORDS.includes(word)) return { column, line, type: 'keyword', value: word };
	// Is number or number which includes decimal point or number with exponent
	if (/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.exec(word)) return { column, line, type: 'number', value: word };
	// Find characters from A-Z and numbers, but numbers can't be at the beginning
	if (/^[a-zA-z][a-zA-z0-9]*$/.exec(word)) return { column, line, type: 'identifier', value: word };

	return null;
};

// eslint-disable-next-line complexity -- This function is complex by nature
const lexicalAnalyser = (input: string): Token[] => {
	const tokens: Token[] = [];

	const lines = input.split('\n');

	let ignoreFollowingLine = false;
	for (const [lineNumber, line] of lines.entries()) {
		const words = line.split(' ');
		if (words.length === 1 && words[0] === '') continue;

		for (const [wordNumber, word] of words.entries()) {
			const trimmedWord = word.trim();
			if (trimmedWord === '') continue;

			if (ignoreFollowingLine && trimmedWord.includes('*)')) {
				ignoreFollowingLine = false;
				continue;
			}

			if (ignoreFollowingLine) continue;

			// Ignore following words when a comment is found
			if (trimmedWord === '//') break;
			if (trimmedWord === '(*') {
				ignoreFollowingLine = true;
				break;
			}

			const currentPosition = {
				column: wordNumber + 1,
				line: lineNumber + 1,
			};

			if (hasDelimiter(trimmedWord)) {
				const nextWordNumber = currentPosition.column + 1;
				if (trimmedWord.startsWith('(')) {
					tokens.push({ ...currentPosition, type: 'delimiter', value: '(' });
					const wordWithoutParenthesis = trimmedWord.substring(1);

					const knownWordResult = checkForKnownWord(wordWithoutParenthesis, currentPosition.line, nextWordNumber);
					// eslint-disable-next-line max-depth -- This is a complex function
					if (knownWordResult) tokens.push(knownWordResult);
					continue;
				}

				if (DELIMITERS.includes(trimmedWord.at(LAST_WORD) ?? '')) {
					const wordWithoutDelimiter = trimmedWord.substring(0, trimmedWord.length - 1);
					const knownWordResult = checkForKnownWord(wordWithoutDelimiter, currentPosition.line, currentPosition.column);
					// eslint-disable-next-line max-depth -- This is a complex function
					if (knownWordResult) tokens.push(knownWordResult);
					tokens.push({ ...currentPosition, column: nextWordNumber, type: 'delimiter', value: trimmedWord.at(LAST_WORD) ?? '' });
					continue;
				}
			}

			const knownWordResult = checkForKnownWord(trimmedWord, currentPosition.line, currentPosition.column);
			if (knownWordResult) {
				tokens.push(knownWordResult);
				continue;
			}

			tokens.push({ ...currentPosition, type: 'unknown', value: word });
		}
	}

	return tokens;
};

export { lexicalAnalyser };
export type { Token };
