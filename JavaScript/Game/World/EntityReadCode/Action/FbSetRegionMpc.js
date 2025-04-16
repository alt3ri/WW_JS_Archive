"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetRegionMpc = void 0);
class FbSetRegionMpc {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.mAh = !1),
      (this.CAh = 0);
  }
  static Create(t) {
    if (t) return new FbSetRegionMpc(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get RegionMpcId() {
    return (
      this.mAh ||
        ((this.mAh = !0), (this.CAh = this.FbDataInternal.regionMpcId())),
      this.CAh
    );
  }
}
exports.FbSetRegionMpc = FbSetRegionMpc;
//# sourceMappingURL=FbSetRegionMpc.js.map
