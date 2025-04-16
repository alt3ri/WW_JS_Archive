"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcPerformOnInteract = void 0);
class FbNpcPerformOnInteract {
  constructor(t) {
    (this.FbDataInternal = t), (this.mgh = !1), (this.Cgh = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcPerformOnInteract(t);
  }
  get Montage() {
    return (
      this.mgh || ((this.mgh = !0), (this.Cgh = this.FbDataInternal.montage())),
      this.Cgh
    );
  }
}
exports.FbNpcPerformOnInteract = FbNpcPerformOnInteract;
//# sourceMappingURL=FbNpcPerformOnInteract.js.map
