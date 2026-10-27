import { frontendLanguageFeatures } from '../frontend/language-features.js';

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'FOR',
		tokenType: 'LOOP_FOR_START',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'TO',
		tokenType: 'LOOP_FOR_COND',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'BY',
		tokenType: 'LOOP_FOR_BY',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'END_FOR',
		tokenType: 'LOOP_FOR_END',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'WHILE',
		tokenType: 'LOOP_WHILE_START',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'DO',
		tokenType: 'LOOP_WHILE_DO',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'END_WHILE',
		tokenType: 'LOOP_WHILE_END',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'REPEAT',
		tokenType: 'LOOP_REPEAT_START',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'UNTIL',
		tokenType: 'LOOP_REPEAT_COND',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Identifier',
		lexem: 'END_REPEAT',
		tokenType: 'LOOP_REPEAT_END',
	},
});
