import { Token } from "./types";
export function eval(exp: Token | Token[], env: Env): any {
  if (!env) return eval(exp, new Env(null));
  if (exp instanceof Array) return evalList(exp, env);
  if (exp.type === "literal") return exp.value;
  if (exp.type === "identifier") return env.get(exp.value);
}

function evalList(exp: Token[], env: Env): any {
  const list = exp.map((item) => eval(item, env));
  if (list[0] instanceof Function) return list[0](list.slice(1));
  return list.length > 1 ? list : list[0];
}
