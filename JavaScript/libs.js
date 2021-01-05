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
      const scope = form[1].reduce((acc, x, i) => {
        acc[x.value] = args[i];
        return acc;
      }, {});
      return interpreter(form[2], new Context(scope, context));
    };
  },
  if: (form, context) =>
    interpreter(form[0], context)
      ? interpreter(form[1], context)
      : interpreter(form[2], context),
};
