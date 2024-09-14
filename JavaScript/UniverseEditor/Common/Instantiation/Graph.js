"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Graph = exports.Node = void 0);
class Node {
  constructor(t, s) {
    (this.Key = t),
      (this.Data = s),
      (this.Incoming = new Map()),
      (this.Outgoing = new Map());
  }
}
exports.Node = Node;
class Graph {
  constructor(t) {
    (this.pAa = t), (this.fZ = new Map());
  }
  Roots() {
    const s = [];
    return (
      this.fZ.forEach((t) => {
        0 === t.Incoming.size && s.push(t);
      }),
      s
    );
  }
  Leaves() {
    const s = [];
    return (
      this.fZ.forEach((t) => {
        0 === t.Outgoing.size && s.push(t);
      }),
      s
    );
  }
  InsertEdge(t, s) {
    var e = this.LookupOrInsertNode(t),
      o = this.LookupOrInsertNode(s);
    e.Outgoing.set(this.pAa(s), o), o.Incoming.set(this.pAa(t), e);
  }
  RemoveNode(t) {
    const s = this.pAa(t);
    this.fZ.delete(s),
      this.fZ.forEach((t) => {
        t.Outgoing.delete(s), t.Incoming.delete(s);
      });
  }
  LookupOrInsertNode(t) {
    var s = this.pAa(t);
    let e = this.fZ.get(s);
    return e || ((e = new Node(s, t)), this.fZ.set(s, e)), e;
  }
  Lookup(t) {
    return this.fZ.get(this.pAa(t));
  }
  IsEmpty() {
    return 0 === this.fZ.size;
  }
  ToString() {
    const e = [];
    return (
      this.fZ.forEach((t, s) => {
        e.push(
          "" +
            s +
            `
	(-> incoming)[${[...t.Incoming.keys()].join(", ")}]
	(outgoing ->)[${[...t.Outgoing.keys()].join(",")}]
`,
        );
      }),
      e.join("\n")
    );
  }
  FindCycleSlow() {
    const e = [],
      o = new Set(),
      r = (t) => {
        if (!o.has(t.Key)) {
          o.add(t.Key), e.push(t.Data);
          for (const s of t.Outgoing.values())
            if (o.has(s.Key) || r(s)) return !0;
          e.pop();
        }
        return !1;
      };
    for (const t of this.fZ.values()) if (r(t)) return e;
  }
}
exports.Graph = Graph;
//# sourceMappingURL=Graph.js.map
