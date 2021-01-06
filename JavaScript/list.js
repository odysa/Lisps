class List {
  val = null;
  next = null;
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
  car() {
    return this.val;
  }
  cdr() {
    return this.next;
  }
  appendToTail(newNode) {
    let node = this;
    while (node.next) {
      node = node.next;
    }
    node.next = newNode;
  }
  asArray() {
    return this.next ? [this.val].concat(this.next.asArray()) : [this.val];
  }
}
export default List;
