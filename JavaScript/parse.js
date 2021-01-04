import { tokenize } from "./lex.js";
function parse(code) {
  return parseToken(tokenize(code));
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
  return atom(token);
}
function atom(token) {
  const res = parseInt(token);
  if (!isNaN(res)) return res;
  return token;
}

export { parse };
