class List {
  car = null;
  cdr = null;
  constructor(car, cdr) {
    this.car = car;
    this.cdr = cdr;
  }
  car() {
    return this.car;
  }
  cdr() {
    return this.cdr;
  }
  appendToTail(newNode) {
    let node = this;
    while (node.cdr) {
      node = node.cdr;
    }
    node.cdr = newNode;
  }
  asArray() {
    return this.cdr ? [this.cdr].concat(this.cdr.asArray()) : [this.car];
  }
}
export default List;
