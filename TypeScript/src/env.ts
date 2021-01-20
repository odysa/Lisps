class Env {
  private parent: Env | null;
  private map: Map<any, any>;
  constructor(parent: Env | null) {
    this.parent = parent;
    this.map = new Map();
  }
  public set(key: string, value: any) {
    this.map.set(key, value);
  }
  public get(key: string): any {
    if (key in this.map) {
      return this.get(key);
    }
    if (this.parent != null) {
      return this.parent.get(key);
    }
    return null;
  }
}
