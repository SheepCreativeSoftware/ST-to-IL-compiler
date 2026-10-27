import { frontendLanguageFeatures } from '../frontend/language-features.js';

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '=',
		tokenType: 'COMP_EQUAL',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '<>',
		tokenType: 'COMP_NOT_EQUAL',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '>',
		tokenType: 'COMP_GREATER',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '>=',
		tokenType: 'COMP_GREATER_EQUAL',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '<',
		tokenType: 'COMP_SMALLER',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '<=',
		tokenType: 'COMP_SMALLER_EQUAL',
	},
});
