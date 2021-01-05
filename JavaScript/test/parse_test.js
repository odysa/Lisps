import { parse } from "../parse.js";
testParse();

function testParse() {
  const form = `(+ x y)`;
  const res = [
    [
      { type: "identifier", value: "+" },
      { type: "identifier", value: "x" },
      { type: "identifier", value: "y" },
    ],
  ];
  if (parse(form).length != 1) {
    throw new Error("parse error!");
  }
}
