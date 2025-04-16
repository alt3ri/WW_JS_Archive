"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDurationInteract = void 0);
class FbDurationInteract {
  constructor(t) {
    (this.FbDataInternal = t), (this.I_h = !1), (this.y6o = 0);
  }
  static Create(t) {
    if (t) return new FbDurationInteract(t);
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
}
exports.FbDurationInteract = FbDurationInteract;
//# sourceMappingURL=FbDurationInteract.js.map
