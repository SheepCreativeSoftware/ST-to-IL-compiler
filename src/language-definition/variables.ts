import { frontendLanguageFeatures } from '../frontend/language-features.js';

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'VAR',
		tokenType: 'VAR_STATIC_DEF_START',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'VAR_END',
		tokenType: 'VAR_STATIC_DEF_END',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: ':=',
		tokenType: 'VAR_ASSIGN',
	},
});
