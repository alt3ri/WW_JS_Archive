"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Switcher = void 0);
class Switcher {
  constructor(t, s = void 0) {
    (this.E$o = new Set()), (this.ICr = t), (this.TCr = s);
  }
  get Active() {
    return this.E$o.size > 0 !== this.ICr;
  }
  SetActive(t, s) {
    const i = this.Active;
    this.ICr !== s ? this.E$o.add(t) : this.E$o.delete(t),
      i !== this.Active && this.TCr && this.TCr(this.Active);
  }
}
exports.Switcher = Switcher;
// # sourceMappingURL=Switcher.js.map
