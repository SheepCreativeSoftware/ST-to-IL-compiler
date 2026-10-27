import { frontendLanguageFeatures } from '../frontend/language-features.js';

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'PROGRAM',
		tokenType: 'CONTR_PROG_START',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'END_PROGRAM',
		tokenType: 'CONTR_PROG_END',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'FUNCTION',
		tokenType: 'CONTR_FUNC_START',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'END_FUNCTION',
		tokenType: 'CONTR_FUNC_END',
	},
});
