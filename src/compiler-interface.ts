interface CompilerInterface {
	semanticCheck(): void | never;
	compile(): string;
};

export type { CompilerInterface };
