import Context from "./context.js";
import { interpreter } from "./eval.js";
import List from "./list.js";
const accumulate = (args, op) => args.reduce((acc, x) => op(acc, x));

export const libs = {
  "+": (...args) => accumulate(args, (x, y) => x + y),
  "-": (...args) => accumulate(args, (x, y) => x - y),
  "*": (...args) => accumulate(args, (x, y) => x * y),
  "/": (...args) => accumulate(args, (x, y) => x / y),
  "=": (...args) => accumulate(args, (x, y) => x === y),
  "<": (...args) => accumulate(args, (x, y) => x < y),
  ">": (...args) => accumulate(args, (x, y) => x > y),
  "null?": (x) => x == null,
  print: (x) => {
    if (x instanceof List) {
      console.log(x.asArray());
      return x;
    }
    console.log(x);
    return x;
  },
  car: (list) => list.val,
  cdr: (list) => list.next,
  cons: (x, y) => {
    if (!(y instanceof List)) y = new List(y);
    if (x instanceof List) {
      x.appendToTail(y);
      return x;
    }
    return new List(x, y);
  },
  list: (...args) => args.reduce((acc, x) => libs.cons(acc, x)),
};

export const expr = {
  lambda: function (form, context) {
    return function () {
      const args = arguments;
      const scope = form[0].reduce((acc, x, i) => {
        acc[x.value] = args[i];
        return acc;
      }, {});
      return interpreter(form[1], new Context(scope, context));
    };
  },
  if: (form, context) =>
    interpreter(form[0], context)
      ? interpreter(form[1], context)
      : interpreter(form[2], context),
  cond: (form, context) => {
    const l = form.length;
    for (let i = 0; i < l; ++i) {
      const expr = form[i];
      if (expr[0].value === "else" || interpreter(expr[0], context)) {
        expr.slice(1, -1).forEach((item) => interpreter(item, context));
        return interpreter(expr.slice(-1), context);
      }
    }
  },
  let: (form, context) => {
    const env = form[0].reduce((acc, x) => {
      acc.add(x[0].value, interpreter(x[1], context));
      return acc;
    }, new Context({}, context));
    return interpreter(form[1], env);
  },
  define: (form, context) => {
    // if no args passed, make it a list
    if (!(form[0] instanceof Array)) form[0] = [form[0]];
    const definition = form[0];
    const body = form[1];
    let func = function () {
      const args = arguments;
      const scope = definition.slice(1).reduce((acc, x, i) => {
        acc[x.value] = args[i];
        return acc;
      }, {});
      return interpreter(body, new Context(scope, context));
    };
    // no args passed, get value immediately
    if (definition.length === 1) func = func();
    // add to context
    context.add(definition[0].value, func);
    return definition[0].value;
  },
};
