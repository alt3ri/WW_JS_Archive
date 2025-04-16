"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbModelId = void 0);
class FbModelId {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hNh = !1),
      (this.lNh = 0);
  }
  static Create(t) {
    if (t) return new FbModelId(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ModelId() {
    return (
      this.hNh || ((this.hNh = !0), (this.lNh = this.FbDataInternal.modelId())),
      this.lNh
    );
  }
}
exports.FbModelId = FbModelId;
//# sourceMappingURL=FbModelId.js.map
