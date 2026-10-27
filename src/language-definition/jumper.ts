import { frontendLanguageFeatures } from '../frontend/language-features.js';

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'CONTINUE',
		tokenType: 'JUMP_CONTINUE',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'EXIT',
		tokenType: 'JUMP_EXIT',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'RETURN',
		tokenType: 'JUMP_RETURN',
	},
});
