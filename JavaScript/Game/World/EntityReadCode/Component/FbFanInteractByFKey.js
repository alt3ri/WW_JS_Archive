"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFanInteractByFKey = void 0);
class FbFanInteractByFKey {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.uQh = !1),
      (this.dQh = void 0);
  }
  static Create(t) {
    if (t) return new FbFanInteractByFKey(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TidInteractOptionText() {
    return (
      this.uQh ||
        ((this.uQh = !0),
        (this.dQh = this.FbDataInternal.tidInteractOptionText())),
      this.dQh
    );
  }
}
exports.FbFanInteractByFKey = FbFanInteractByFKey;
//# sourceMappingURL=FbFanInteractByFKey.js.map
