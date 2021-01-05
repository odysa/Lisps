function tokenize(text) {
  return text.replace(/\(/g, " ( ").replace(/\)/g, " ) ").trim().split(/\s+/);
}
export { tokenize };
