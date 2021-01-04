import { interperator } from "./eval.js";

testEval();
testEnvEval()
function testEval() {
  const form = ["+", ["-", ["*", 2, 4], 2], ["+", 1, 2], 1, 1, 1, 1, 1];
  const res = interperator(form);
  if (res !== 14) {
    throw new Error(`eval failed! got ${res} should be ${14}`);
  }
}
function testEnvEval() {
  const env = {
    x: 1,
    y: 2,
    next: { z: 3 },
  };
  const form = ["+", "x", ["*", "y", "z"]];
  const res = interperator(form, env);
  if (res !== 7) {
    throw new Error(`eval failed! got ${res} should be ${7}`);
  }
}
