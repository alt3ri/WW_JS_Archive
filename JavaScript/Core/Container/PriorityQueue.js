"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PriorityQueue = void 0);
const Log_1 = require("../Common/Log");
class PriorityQueue {
  constructor(t) {
    (this.S7 = t), (this.E7 = new Array()), (this.y7 = new Map());
  }
  Clone(t) {
    this.Clear();
    for (const h of t.E7) this.E7.push(h);
    for (var [i, s] of t.y7) this.y7.set(i, s);
  }
  get Size() {
    return this.E7.length;
  }
  get Empty() {
    return 0 === this.E7.length;
  }
  get Top() {
    if (!(this.E7.length <= 0)) return this.E7[0];
    Log_1.Log.CheckError() && Log_1.Log.Error("Container", 1, "优先队列为空");
  }
  Clear() {
    (this.E7.length = 0), this.y7.clear();
  }
  Push(t) {
    var i = this.E7.push(t) - 1;
    this.y7.set(t, i), this.I7(i);
  }
  Pop() {
    var t, i;
    if (!(this.E7.length <= 0))
      return (
        (t = this.E7[0]),
        this.y7.delete(t),
        (i = this.E7.pop()),
        0 < this.E7.length && ((this.E7[0] = i), this.y7.set(i, 0), this.T7(0)),
        t
      );
    Log_1.Log.CheckError() && Log_1.Log.Error("Container", 1, "优先队列为空");
  }
  Remove(t) {
    var i = this.y7.get(t);
    return void 0 === i
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Container", 1, "元素不在优先队列中"),
        !1)
      : (i === this.E7.length - 1
          ? (this.E7.pop(), this.y7.delete(t))
          : (this.y7.delete(t),
            (t = this.E7.pop()),
            (this.E7[i] = t),
            this.y7.set(t, i),
            this.T7(i)),
        !0);
  }
  Update(t) {
    t = this.y7.get(t);
    return void 0 === t
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Container", 1, "元素不在优先队列中"),
        !1)
      : (this.I7(t) || this.T7(t), !0);
  }
  I7(t) {
    let i = !1,
      s = t;
    for (; 0 < s; ) {
      var h = Math.floor((s - 1) / 2);
      if (0 <= this.S7(this.E7[s], this.E7[h])) break;
      this.fa(s, h), (s = h), (i = !0);
    }
    return i;
  }
  T7(t) {
    let i = !1,
      s = t;
    for (;;) {
      var h = 2 * s + 1,
        r = 2 * s + 2;
      let t = h;
      if (
        (t =
          r < this.E7.length && this.S7(this.E7[r], this.E7[h]) < 0 ? r : t) >=
          this.E7.length ||
        this.S7(this.E7[s], this.E7[t]) <= 0
      )
        break;
      this.fa(s, t), (s = t), (i = !0);
    }
    return i;
  }
  fa(t, i) {
    var s = this.E7[t];
    (this.E7[t] = this.E7[i]),
      (this.E7[i] = s),
      this.y7.set(this.E7[t], t),
      this.y7.set(this.E7[i], i);
  }
}
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=PriorityQueue.js.map
