function tokenize(text) {
  return text
    .replace(/\(/g, " ( ")
    .replace(/\)/g, " ) ")
    .split(" ")
    .filter((ch) => ch != "");
}
export { tokenize };
