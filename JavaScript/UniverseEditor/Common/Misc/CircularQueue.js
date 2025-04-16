"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CircularQueue = void 0);
class CircularQueue {
  constructor(t) {
    (this.f7 = t),
      (this.e4 = new Array(t)),
      (this.uAa = 0),
      (this.cAa = -1),
      (this.t6 = 0);
  }
  mAa() {
    var t = 2 * this.f7,
      s = new Array(t);
    for (let t = 0; t < this.t6; t++) s[t] = this.e4[(this.uAa + t) % this.f7];
    (this.e4 = s), (this.uAa = 0), (this.cAa = this.t6 - 1), (this.f7 = t);
  }
  EnQueue(t) {
    this.IsFull() && this.mAa(),
      (this.cAa = (this.cAa + 1) % this.f7),
      (this.e4[this.cAa] = t),
      this.t6++;
  }
  DeQueue() {
    var t;
    if (!this.IsEmpty())
      return (
        (t = this.e4[this.uAa]),
        (this.uAa = (this.uAa + 1) % this.f7),
        this.t6--,
        t
      );
  }
  Peek() {
    if (!this.IsEmpty()) return this.e4[this.uAa];
  }
  IsEmpty() {
    return 0 === this.t6;
  }
  IsFull() {
    return this.t6 === this.f7;
  }
  Size() {
    return this.t6;
  }
}
exports.CircularQueue = CircularQueue;
//# sourceMappingURL=CircularQueue.js.map
