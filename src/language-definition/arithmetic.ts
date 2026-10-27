import { frontendLanguageFeatures } from '../frontend/language-features.js';

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'INT',
		tokenType: 'TYPE_INT',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'UINT',
		tokenType: 'TYPE_UINT',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'DINT',
		tokenType: 'TYPE_DINT',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'UDINT',
		tokenType: 'TYPE_UDINT',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '+',
		tokenType: 'OP_ARITHM_ADD',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '-',
		tokenType: 'OP_ARITHM_SUB',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '*',
		tokenType: 'OP_ARITHM_MUL',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Symbole',
		lexem: '/',
		tokenType: 'OP_ARITHM_DIV',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'MOD',
		tokenType: 'OP_ARITHM_MOD',
	},
});
