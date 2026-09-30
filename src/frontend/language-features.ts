import { buntstift } from 'buntstift';

type BaseType = 'Number' | 'Identifier' | 'Symbole' | 'Ignorable';
type LexicalDefinition = {
	baseType: BaseType
	lexem: string
	tokenType: string
	patterns?: {
		startsWith?: string
		hasWithing?: string
		endsWith?: string
	}
};
type FrontendLanguageFeatureDefinition = {
	lexical: LexicalDefinition
};

class FrontendLanguageFeature {
	lexical: {
		ignorables: Map<string, LexicalDefinition>
		identifiers: Map<string, LexicalDefinition>
		operators: Map<string, LexicalDefinition>
		numbers: Map<string, LexicalDefinition>
	} = {
		identifiers: new Map(),
		ignorables: new Map(),
		numbers: new Map(),
		operators: new Map(),
	};

	register({ lexical }: FrontendLanguageFeatureDefinition) {
		if (lexical.baseType === 'Ignorable') {
			this.lexical.ignorables.set(lexical.lexem, lexical);
		} else {
			buntstift.error(`Failed to register: ${lexical.lexem}`);
		}
	};
}

const frontendLanguageFeatures = new FrontendLanguageFeature();

export { frontendLanguageFeatures };
export type { BaseType, FrontendLanguageFeatureDefinition, LexicalDefinition };
