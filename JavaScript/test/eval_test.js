import Context from "../context.js";
import { interpreter } from "../eval.js";
import { libs } from "../libs.js";
import { parse } from "../parse.js";

testEval();
testEnvEval();
function testEval() {
  const form = parse("(+ 10 (* 2 2))");
  const res = interpreter(form);
  if (res !== 14) {
    throw new Error(`eval failed! got ${res} should be ${14}`);
  }
}
function testEnvEval() {
  const env = new Context({ x: 7, y: 1 }, new Context(libs));
  const form = parse("(+ x y)");
  const res = interpreter(form, env);
  if (res !== 8) {
    throw new Error(`eval failed! got ${res} should be ${7}`);
  }
}
