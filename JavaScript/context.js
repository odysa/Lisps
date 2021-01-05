class Context {
  env = {};
  parent = null;
  constructor(env, parent) {
    this.env = env;
    this.parent = parent;
  }
  get(key) {
    if (key in this.env) {
      return this.env[key];
    }
    if (this.parent) return this.parent.get(key);
    return null;
  }
  add(key, value) {
    if (!this.env) this.env = {};
    this.env[key] = value;
  }
}

export default Context;
