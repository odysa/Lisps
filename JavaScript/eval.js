function interperator(form) {
  if (!(form instanceof Array)) return form;
  const v1 = interperator(form[1]);
  const v2 = interperator(form[2]);
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
const form = ["+", ["-", ["*", 3, 4], 2], ["+", 1, 2]];
console.log(interperator(form));
