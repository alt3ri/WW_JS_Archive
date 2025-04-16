"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetAreaState = void 0);
class FbSetAreaState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Yph = !1),
      (this.zph = 0),
      (this.Bch = !1),
      (this.Cbo = 0);
  }
  static Create(t) {
    if (t) return new FbSetAreaState(t);
  }
  get AreaId() {
    return (
      this.Yph || ((this.Yph = !0), (this.zph = this.FbDataInternal.areaId())),
      this.zph
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbSetAreaState = FbSetAreaState;
//# sourceMappingURL=FbSetAreaState.js.map
