const defaultEnv = { next: null, x: 3 };
function lookUp(key, env) {
  if (!env) return null;
  return env[key] ? env[key] : lookUp(key, env.next);
}
function extEnv(inner, outer) {
  inner.next = outer;
}
function interperator(form, env) {
  if (typeof form === "number") return form;
  if (typeof form === "string") return lookUp(form, env);
  const v1 = interperator(form[1], env);
  const v2 = interperator(form[2], env);
  switch (form[0]) {
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
      throw new Error("Invalid operation " + form[0]);
  }
}
const form = ["+", ["-", ["*", "x", 4], 2], ["+", 1, 2]];
console.log(interperator(form, defaultEnv));
