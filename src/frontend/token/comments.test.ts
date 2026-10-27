/* eslint-disable no-magic-numbers -- This is a test */
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { commentsDefinition } from './comments.ts';
import { testStringAgainstDefinition } from './base-token.ts';
import { Random } from '../../test/random.ts';

const testFunction = (charString: string) => testStringAgainstDefinition({ definition: commentsDefinition, charString });

describe('token definition: comments', () => {
	describe('Subtype Block 1', () => {
		it('Does not match when provided with empty string', () => {
			const result = testFunction('');
			assert.strictEqual(result.length, 0);
			assert.strictEqual(result.tokenType, 'NONE');
			assert.strictEqual(result.subType, 'NONE');
			assert.ok(result.noMatch);
		});
		it('Does not match when provided with some random charachters', () => {
			const result = testFunction(Random.stringValue(10));
			assert.strictEqual(result.length, 10);
			assert.strictEqual(result.tokenType, 'NONE');
			assert.strictEqual(result.subType, 'NONE');
			assert.ok(result.noMatch);
		});
		it('Does match with some random characters within a comment block', () => {
			const result = testFunction('(*'+Random.stringValue(10)+'*)');
			assert.ok(result.fullyMatch);
			assert.ok(result.startMatch);
			assert.ok(result.followMatch);
			assert.strictEqual(result.length, 14);
			assert.strictEqual(result.tokenType, 'comment');
			assert.strictEqual(result.subType, 'COM_BLOCK_1');
			assert.ok(!result.noMatch);
		});
		it('Fully satisfies with a empty comment', () => {
			const result = testFunction('(**)');
			assert.ok(result.fullyMatch);
			assert.ok(result.startMatch);
			assert.ok(result.followMatch);
			assert.strictEqual(result.length, 4);
			assert.strictEqual(result.tokenType, 'comment');
			assert.strictEqual(result.subType, 'COM_BLOCK_1');
			assert.ok(!result.noMatch);
		});
	});
});
