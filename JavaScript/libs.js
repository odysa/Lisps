import Context from "./context.js";
import { interpreter } from "./eval.js";
const accumulate = (args, op) => args.reduce((acc, x) => op(acc, x));

export const libs = {
  "+": (...args) => accumulate(args, (x, y) => x + y),
  "-": (...args) => accumulate(args, (x, y) => x - y),
  "*": (...args) => accumulate(args, (x, y) => x * y),
  "/": (...args) => accumulate(args, (x, y) => x / y),
  print: (x) => {
    console.log(x);
  },
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
  let: (form, context) => {
    const env = form[0].reduce((acc, x) => {
      acc.add(x[0].value, interpreter(x[1], context));
      return acc;
    }, new Context({}, context));
    return interpreter(form[1], env);
  },
  define: (form, context) => {
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
    // no args passed
    if (definition.length === 1) func = func();
    context.add(definition[0].value, func);
    return definition[0].value;
  },
};
