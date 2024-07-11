"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Switcher = void 0);
class Switcher {
  constructor(t, s = void 0) {
    (this.vYo = new Set()), (this.Egr = t), (this.Sgr = s);
  }
  get Active() {
    return 0 < this.vYo.size !== this.Egr;
  }
  SetActive(t, s) {
    var i = this.Active;
    this.Egr !== s ? this.vYo.add(t) : this.vYo.delete(t),
      i !== this.Active && this.Sgr && this.Sgr(this.Active);
  }
}
exports.Switcher = Switcher;
//# sourceMappingURL=Switcher.js.map
