"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActorLookAtEmptyData = void 0);
class FbActorLookAtEmptyData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Yfh = !1),
      (this.d3l = !1);
  }
  static Create(t) {
    if (t) return new FbActorLookAtEmptyData(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Lock() {
    return (
      this.Yfh || ((this.Yfh = !0), (this.d3l = this.FbDataInternal.lock())),
      this.d3l
    );
  }
}
exports.FbActorLookAtEmptyData = FbActorLookAtEmptyData;
//# sourceMappingURL=FbActorLookAtEmptyData.js.map
