type BaseToken = 'identifier' | 'keyword' | 'operator' | 'delimiter' | 'constant' | 'strings' | 'comment' | 'whitespace' | 'NONE';

type Pattern = {
	// Check against first character
	startsWith: RegExp
	// Check against incomplete string
	startToFollow: RegExp
	// Check against full string
	satisfies: RegExp
};

type SubType = { subType: string };

type PatternWithType = Pattern & SubType;

interface BaseTokenDefinition {
	tokenType: BaseToken
	pattern: Pattern | PatternWithType[]
};

type DefinitionSatisfaction = {
	noMatch: boolean,
	startMatch: boolean,
	followMatch: boolean,
	fullyMatch: boolean,
	length: number;
} & SubType & Pick<BaseTokenDefinition, 'tokenType'>;

const testStringAgainstDefinition = ({ definition, charString }: {
	definition: BaseTokenDefinition,
	charString: string
}): DefinitionSatisfaction => {
	const { pattern, tokenType } = definition;
	const patterns: PatternWithType[] = Array.isArray(pattern) ? pattern : [{ ...pattern, subType: 'NONE' }];

	const results: DefinitionSatisfaction[] = patterns.map(({ satisfies, startToFollow, startsWith, subType }) => {
		const matches = {
			startMatch: startsWith.test(charString[0]),
			followMatch: startToFollow.test(charString),
			fullyMatch: satisfies.test(charString),
		};

		const noMatch = !matches.followMatch && !matches.fullyMatch && !matches.startMatch;

		return {
			...matches,
			length: charString.length,
			noMatch,
			subType: noMatch ? 'NONE' : subType,
			tokenType: noMatch ? 'NONE': tokenType,
		};
	});

	const filtered = results.filter((result) => !result.noMatch);

	if (filtered.length < 1) {
		return results[0];
	}

	return filtered[0];
};

export { testStringAgainstDefinition };
export type { BaseToken, BaseTokenDefinition };
