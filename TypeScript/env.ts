class Env {
  private parent: Env;
  private map: Map<any, any>;
  constructor(parent: Env) {
    this.parent = parent;
  }
  public set(key: string, value: any) {
    if (this.map == null) {
      this.map = new Map<any, any>();
    }
    this.map.set(key, value);
  }
  public get(key: string) {
    if (key in this.map) {
      return this.get(key);
    }
    if (this.parent != null) {
      return this.parent.get(key);
    }
    return null;
  }
}
