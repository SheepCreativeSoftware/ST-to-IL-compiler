import { frontendLanguageFeatures } from '../frontend/language-features.js';

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'IF',
		tokenType: 'COND_IF_START',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'THEN',
		tokenType: 'COND_IF_THEN',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'ELSE',
		tokenType: 'COND_ELSE',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'ELSEIF',
		tokenType: 'COND_ELSE_IF',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'END_IF',
		tokenType: 'COND_IF_END',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'CASE',
		tokenType: 'COND_CASE_START',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'OF',
		tokenType: 'COND_CASE_OF',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'END_CASE',
		tokenType: 'COND_CASE_END',
	},
});
