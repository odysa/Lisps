import { tokenize } from "./lex.js";
function parse(code) {
  const result = [];
  const tokens = tokenize(code);
  while (tokens.length) {
    result.push(parseToken(tokens));
  }
  return result;
}

function parseToken(tokens) {
  if (tokens.length === 0) throw new Error("unexpected EOF");
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

function categorize(token) {
  if (!isNaN(parseFloat(token)))
    return { type: "literal", value: parseFloat(token) };
  // a string
  if (token[0] === '"' && token.slice(-1) === '"')
    return { type: "literal", value: token.slice(1, -1) };
  return { type: "identifier", value: token };
}

export { parse };
