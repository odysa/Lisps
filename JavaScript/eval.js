const defaultEnv = { next: null };
function lookUp(key, env) {
  if (!env) return null;
  return env[key] ? env[key] : lookUp(key, env.next);
}
function extEnv(inner, outer) {
  inner.next = outer;
}
function evalOp(op, v1, v2) {
  switch (op) {
    case "+":
      return v1 + v2;
    case "-":
      return v1 - v2;
    case "/":
      return v1 / v2;
    case "%":
      return v1 % v2;
    case "*":
      return v1 * v2;
    default:
      throw new Error("Invalid operation " + op);
  }
}
function interperator(form, env) {
  if (typeof form === "number") return form;
  if (typeof form === "string") return lookUp(form, env);
  let res = interperator(form[1], env);
  const op = form[0];
  for (let i = 2; i < form.length; ++i) {
    res = evalOp(op, res, interperator(form[i], env));
  }
  return res;
}

export { interperator };
