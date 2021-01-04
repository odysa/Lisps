import { parse } from "./parse.js";
import { interperator } from "./eval.js";
testParse();

function testParse() {
  const form = "(+ (* 2 3 4) 2)";
  if (interperator(parse(form)) !== 26) {
    throw new Error("parse and eval failed!!");
  }
}
