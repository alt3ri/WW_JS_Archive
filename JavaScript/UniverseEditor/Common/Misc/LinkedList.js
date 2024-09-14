"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinkedList = exports.Node = void 0);
class Node {
  constructor(t, s = Node.Undefined, e = Node.Undefined) {
    (this.Element = t), (this.Next = s), (this.Prev = e);
  }
}
(exports.Node = Node).Undefined = new Node(void 0);
class LinkedList {
  constructor() {
    (this.Cme = Node.Undefined), (this.XAa = Node.Undefined), (this.TT = 0);
  }
  get Size() {
    return this.TT;
  }
  IsEmpty() {
    return this.Cme === Node.Undefined;
  }
  Clear() {
    let t = this.Cme;
    for (; t !== Node.Undefined; ) {
      var s = t["Next"];
      (t.Next = Node.Undefined), (t.Prev = Node.Undefined), (t = s);
    }
    (this.Cme = Node.Undefined), (this.XAa = Node.Undefined), (this.TT = 0);
  }
  Unshift(t) {
    return this.ya(t, !1);
  }
  Push(t) {
    return this.ya(t, !0);
  }
  Shift() {
    var t;
    if (this.Cme !== Node.Undefined)
      return (t = this.Cme.Element), this.jp(this.Cme), t;
  }
  Pop() {
    var t;
    if (this.XAa !== Node.Undefined)
      return (t = this.XAa.Element), this.jp(this.XAa), t;
  }
  ya(t, s) {
    const e = new Node(t);
    this.Cme === Node.Undefined
      ? ((this.Cme = e), (this.XAa = e))
      : s
        ? ((t = this.XAa), (((this.XAa = e).Prev = t).Next = e))
        : ((s = this.Cme), (((this.Cme = e).Next = s).Prev = e)),
      (this.TT += 1);
    let i = !1;
    return () => {
      i || ((i = !0), this.jp(e));
    };
  }
  jp(t) {
    var s;
    t.Prev !== Node.Undefined && t.Next !== Node.Undefined
      ? (((s = t.Prev).Next = t.Next), (t.Next.Prev = s))
      : t.Prev === Node.Undefined && t.Next === Node.Undefined
        ? ((this.Cme = Node.Undefined), (this.XAa = Node.Undefined))
        : t.Next === Node.Undefined
          ? ((this.XAa = this.XAa.Prev), (this.XAa.Next = Node.Undefined))
          : t.Prev === Node.Undefined &&
            ((this.Cme = this.Cme.Next), (this.Cme.Prev = Node.Undefined)),
      --this.TT;
  }
  *[Symbol.iterator]() {
    let t = this.Cme;
    for (; t !== Node.Undefined; ) yield t.Element, (t = t.Next);
  }
}
exports.LinkedList = LinkedList;
//# sourceMappingURL=LinkedList.js.map
