import Context from "./context.js";
import { expr, libs } from "./libs.js";
import { parse } from "./parse.js";

function interpreter(form, context) {
  if (!context) return interpreter(form, new Context(libs));
  if (form instanceof Array) return interpreterList(form, context);
  if (form.type === "identifier") return context.get(form.value);
  if (typeof form === "function") return form();
  return form.value;
}
function interpreterList(form, context) {
  if (form[0].value in expr) return expr[form[0].value](form.slice(1), context);
  const list = form.map((item) => interpreter(item, context));
  if (list[0] instanceof Function)
    return list[0].apply(undefined, list.slice(1));
  return list.length > 1 ? list : list[0];
}

function run(codes) {
  const parsed = parse(codes);
  for (let i = 0; i < parsed.length; ++i) {
    interpreter(parsed[i]);
  }
}
export { interpreter, run };
