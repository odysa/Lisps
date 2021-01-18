export function tokenize(text: string): string[] {
  return text.replace(/\(/g, " ( ").replace(/\)/g, " ) ").trim().split(/\s+/);
}
