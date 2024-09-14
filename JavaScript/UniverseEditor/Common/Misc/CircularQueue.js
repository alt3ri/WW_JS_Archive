"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CircularQueue = void 0);
class CircularQueue {
  constructor(t) {
    (this.f7 = t),
      (this.e4 = new Array(t)),
      (this.kAa = 0),
      (this.NAa = -1),
      (this.t6 = 0);
  }
  FAa() {
    var t = 2 * this.f7,
      s = new Array(t);
    for (let t = 0; t < this.t6; t++) s[t] = this.e4[(this.kAa + t) % this.f7];
    (this.e4 = s), (this.kAa = 0), (this.NAa = this.t6 - 1), (this.f7 = t);
  }
  EnQueue(t) {
    this.IsFull() && this.FAa(),
      (this.NAa = (this.NAa + 1) % this.f7),
      (this.e4[this.NAa] = t),
      this.t6++;
  }
  DeQueue() {
    var t;
    if (!this.IsEmpty())
      return (
        (t = this.e4[this.kAa]),
        (this.kAa = (this.kAa + 1) % this.f7),
        this.t6--,
        t
      );
  }
  Peek() {
    if (!this.IsEmpty()) return this.e4[this.kAa];
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
