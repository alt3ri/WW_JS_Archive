"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInhaledChangeSelfState = void 0);
class FbInhaledChangeSelfState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.GFh = !1),
      (this.OFh = void 0);
  }
  static Create(t) {
    if (t) return new FbInhaledChangeSelfState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ChangeSelfState() {
    return (
      this.GFh ||
        ((this.GFh = !0), (this.OFh = this.FbDataInternal.changeSelfState())),
      this.OFh
    );
  }
}
exports.FbInhaledChangeSelfState = FbInhaledChangeSelfState;
//# sourceMappingURL=FbInhaledChangeSelfState.js.map
