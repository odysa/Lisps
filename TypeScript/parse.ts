import { Token } from "./types";

function parse(tokens: string[]): Token[] {
  const res = [];
  while (tokens.length) {
    res.push(parseToken(tokens));
  }
  return res;
}

function parseToken(tokens: string[]) {
  const token = tokens.shift();
  if (token === "(") {
    const expr = [];
    while (tokens[0] !== ")") {
      expr.push(parseToken(tokens));
    }
    tokens.shift();
    return expr;
  }
  if (token === ")") throw new Error("unexpected )");
  return categorize(token);
}

function categorize(token: string): Token {
  const num = parseFloat(token);
  if (!isNaN(num)) return { type: "literal", value: num };
  if (token[0] === '"' && token.slice(-1) === '"')
    return { type: "literal", value: token.slice(1, -1) };
  return {
    type: "identifier",
    value: token,
  };
}

export { parse };
