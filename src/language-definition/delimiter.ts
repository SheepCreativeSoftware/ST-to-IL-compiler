import { frontendLanguageFeatures } from '../frontend/language-features.js';

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: ';',
		tokenType: 'DELIM_INSTR_END',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '(',
		tokenType: 'DELIM_BRACKET_START',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: ')',
		tokenType: 'DELIM_BRACKET_END',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: ':',
		tokenType: 'DELIM_DECLARE',
	},
});
