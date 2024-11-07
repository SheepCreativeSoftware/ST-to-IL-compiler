const ARITHMETIC_OPERATORS = [
	'**',
	'-',
	'*',
	'/',
	'%',
	'+',
];

const COMPARISON_OPERATORS = [
	'=',
	'<',
	'>',
	'<=',
	'>=',
	'<>',
];

const LOGICAL_OPERATORS = [
	'AND',
	'OR',
	'XOR',
	'NOT',
];

const ASSIGNMENT_OPERATORS = [':='];

const ALL_OPERATORS = [
	...ARITHMETIC_OPERATORS,
	...COMPARISON_OPERATORS,
	...LOGICAL_OPERATORS,
	...ASSIGNMENT_OPERATORS,
];

const DELIMITERS = [
	',',
	';',
	'(',
	')',
	':',
];

const COMMENT = [
	'//',
	'(*',
	'*)',
];

export { ALL_OPERATORS, ARITHMETIC_OPERATORS, ASSIGNMENT_OPERATORS, COMMENT, COMPARISON_OPERATORS, DELIMITERS, LOGICAL_OPERATORS };
