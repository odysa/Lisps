export type TokenType = "literal" | "identifier";
export type Token = {
  type: TokenType;
  value: any;
};

