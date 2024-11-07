/* eslint-disable @typescript-eslint/no-floating-promises -- This is a test */
/* eslint-disable no-magic-numbers -- This is a test */
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { lexicalAnalyser } from './lexical-analyser.ts';

describe('lexicalAnalyser', () => {
	describe('comments', () => {
		it('should ignore the rest of the line when a single line comment is found', () => {
			const code = `// This is a comment
				procedure Test
				begin // This is another comment`;

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 3);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 2, type: 'identifier', value: 'procedure' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 2, type: 'identifier', value: 'Test' });
			assert.deepStrictEqual(tokens[2], { column: 1, line: 3, type: 'identifier', value: 'begin' });
		});
		it('should ignore following line while a multi-line comment is found', () => {
			const code = `(* This is a comment
				procedure Test
				that spans multiple lines *)
				procedure Test2
				begin (* This is another comment *)`;

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 3);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 4, type: 'identifier', value: 'procedure' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 4, type: 'identifier', value: 'Test2' });
			assert.deepStrictEqual(tokens[2], { column: 1, line: 5, type: 'identifier', value: 'begin' });
		});
	});
	describe('delimiters', () => {
		it('should identify delimiters', () => {
			const code = '( ) ; , :';

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 5);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'delimiter', value: '(' });
			assert.deepStrictEqual(tokens[1], { column: 3, line: 1, type: 'delimiter', value: ')' });
			assert.deepStrictEqual(tokens[2], { column: 4, line: 1, type: 'delimiter', value: ';' });
			assert.deepStrictEqual(tokens[3], { column: 5, line: 1, type: 'delimiter', value: ',' });
			assert.deepStrictEqual(tokens[4], { column: 6, line: 1, type: 'delimiter', value: ':' });
		});
		it('should cut the delimiter from the word when the delimiter is at the end', () => {
			const code = 'begin;';

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 2);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'identifier', value: 'begin' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 1, type: 'delimiter', value: ';' });
		});
		it('should cut the delimiter from the word when a delimiter of a open bracket is at the beginning', () => {
			const code = '(begin';

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 2);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'delimiter', value: '(' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 1, type: 'identifier', value: 'begin' });
		});
	});
	describe('operators', () => {
		it('should identify operators', () => {
			const code = ':= = <> < <= > >=';

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 7);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'operator', value: ':=' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 1, type: 'operator', value: '=' });
			assert.deepStrictEqual(tokens[2], { column: 3, line: 1, type: 'operator', value: '<>' });
			assert.deepStrictEqual(tokens[3], { column: 4, line: 1, type: 'operator', value: '<' });
			assert.deepStrictEqual(tokens[4], { column: 5, line: 1, type: 'operator', value: '<=' });
			assert.deepStrictEqual(tokens[5], { column: 6, line: 1, type: 'operator', value: '>' });
			assert.deepStrictEqual(tokens[6], { column: 7, line: 1, type: 'operator', value: '>=' });
		});
	});
	describe('keywords', () => {
		it('should identify keywords', () => {
			const code = 'begin end IF THEN ELSE WHILE DO';

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 7);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'identifier', value: 'begin' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 1, type: 'identifier', value: 'end' });
			assert.deepStrictEqual(tokens[2], { column: 3, line: 1, type: 'keyword', value: 'IF' });
			assert.deepStrictEqual(tokens[3], { column: 4, line: 1, type: 'keyword', value: 'THEN' });
			assert.deepStrictEqual(tokens[4], { column: 5, line: 1, type: 'keyword', value: 'ELSE' });
			assert.deepStrictEqual(tokens[5], { column: 6, line: 1, type: 'keyword', value: 'WHILE' });
			assert.deepStrictEqual(tokens[6], { column: 7, line: 1, type: 'keyword', value: 'DO' });
		});
	});
	describe('numbers', () => {
		it('should identify numbers without decimal point and without exponent', () => {
			const code = '123 456 789';

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 3);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'number', value: '123' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 1, type: 'number', value: '456' });
			assert.deepStrictEqual(tokens[2], { column: 3, line: 1, type: 'number', value: '789' });
		});
		it('should identify numbers with decimal point', () => {
			const code = '123.456 789.123 456.789';

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 3);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'number', value: '123.456' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 1, type: 'number', value: '789.123' });
			assert.deepStrictEqual(tokens[2], { column: 3, line: 1, type: 'number', value: '456.789' });
		});
		it('should identify numbers with exponent', () => {
			const code = '123e4 456e-4 789E4 456e+4';

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 4);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'number', value: '123e4' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 1, type: 'number', value: '456e-4' });
			assert.deepStrictEqual(tokens[2], { column: 3, line: 1, type: 'number', value: '789E4' });
			assert.deepStrictEqual(tokens[3], { column: 4, line: 1, type: 'number', value: '456e+4' });
		});
	});
	describe('identifiers', () => {
		it('should identify identifiers when words beginning with A-Z/a-z', () => {
			const code = 'a bcd ab23';

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 3);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'identifier', value: 'a' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 1, type: 'identifier', value: 'bcd' });
			assert.deepStrictEqual(tokens[2], { column: 3, line: 1, type: 'identifier', value: 'ab23' });
		});
		it('should not identify identifiers when words beginning with a number', () => {
			const code = '1a 2bcd 3ab23';

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 3);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'unknown', value: '1a' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 1, type: 'unknown', value: '2bcd' });
			assert.deepStrictEqual(tokens[2], { column: 3, line: 1, type: 'unknown', value: '3ab23' });
		});
	});
	describe('complex code', () => {
		it('should identify all tokens in a complex code', () => {
			const code = `procedure Test
				begin
					IF 123 = 123 THEN
						var := 123.456;
					ELSE
						var := 456.789;
					END_IF`;

			const tokens = lexicalAnalyser(code);

			assert.strictEqual(tokens.length, 18);
			assert.deepStrictEqual(tokens[0], { column: 1, line: 1, type: 'identifier', value: 'procedure' });
			assert.deepStrictEqual(tokens[1], { column: 2, line: 1, type: 'identifier', value: 'Test' });
			assert.deepStrictEqual(tokens[2], { column: 1, line: 2, type: 'identifier', value: 'begin' });
			assert.deepStrictEqual(tokens[3], { column: 1, line: 3, type: 'keyword', value: 'IF' });
			assert.deepStrictEqual(tokens[4], { column: 2, line: 3, type: 'number', value: '123' });
			assert.deepStrictEqual(tokens[5], { column: 3, line: 3, type: 'operator', value: '=' });
			assert.deepStrictEqual(tokens[6], { column: 4, line: 3, type: 'number', value: '123' });
			assert.deepStrictEqual(tokens[7], { column: 5, line: 3, type: 'keyword', value: 'THEN' });
			assert.deepStrictEqual(tokens[8], { column: 1, line: 4, type: 'identifier', value: 'var' });
			assert.deepStrictEqual(tokens[9], { column: 2, line: 4, type: 'operator', value: ':=' });
			assert.deepStrictEqual(tokens[10], { column: 3, line: 4, type: 'number', value: '123.456' });
			assert.deepStrictEqual(tokens[11], { column: 4, line: 4, type: 'delimiter', value: ';' });
			assert.deepStrictEqual(tokens[12], { column: 1, line: 5, type: 'keyword', value: 'ELSE' });
			assert.deepStrictEqual(tokens[13], { column: 1, line: 6, type: 'identifier', value: 'var' });
			assert.deepStrictEqual(tokens[14], { column: 2, line: 6, type: 'operator', value: ':=' });
			assert.deepStrictEqual(tokens[15], { column: 3, line: 6, type: 'number', value: '456.789' });
			assert.deepStrictEqual(tokens[16], { column: 4, line: 6, type: 'delimiter', value: ';' });
			assert.deepStrictEqual(tokens[17], { column: 1, line: 7, type: 'keyword', value: 'END_IF' });
		});
	});
});
