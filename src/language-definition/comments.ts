import { frontendLanguageFeatures } from '../frontend/language-features.js';

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Ignorable',
		lexem: '//',
		patterns: {
			endsWith: '\n',
			startsWith: '//',
		},
		tokenType: 'COMMENT',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Ignorable',
		lexem: '(*',
		patterns: {
			endsWith: '*)',
			startsWith: '(*',
		},
		tokenType: 'COMMENT',
	},
});

frontendLanguageFeatures.register({
	lexical: {
		baseType: 'Ignorable',
		lexem: '*)',
		tokenType: 'COMMENT',
	},
});
