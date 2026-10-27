import { frontendLanguageFeatures } from '../frontend/language-features.js';

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'BOOL',
		tokenType: 'TYPE_BOOL',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'TRUE',
		tokenType: 'VAL_BOOL',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'FALSE',
		tokenType: 'VAL_BOOL',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'AND',
		tokenType: 'OP_LOGIC_AND',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'OR',
		tokenType: 'OP_LOGIC_OR',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'XOR',
		tokenType: 'OP_LOGIC_XOR',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'NOT',
		tokenType: 'OP_LOGIC_NOT',
	},
});
