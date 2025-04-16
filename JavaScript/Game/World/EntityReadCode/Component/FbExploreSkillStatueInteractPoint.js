"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExploreSkillStatueInteractPoint = void 0);
class FbExploreSkillStatueInteractPoint {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.FWh = !1),
      (this.NWh = 0),
      (this.HWh = !1),
      (this.WWh = void 0);
  }
  static Create(t) {
    if (t) return new FbExploreSkillStatueInteractPoint(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PullTime() {
    return (
      this.FWh ||
        ((this.FWh = !0), (this.NWh = this.FbDataInternal.pullTime())),
      this.NWh
    );
  }
  get HangingPointList() {
    if (!this.HWh) {
      (this.HWh = !0), (this.WWh = new Array());
      var i = this.FbDataInternal.hangingPointListLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.WWh.push(this.FbDataInternal.hangingPointList(t));
    }
    return this.WWh;
  }
}
exports.FbExploreSkillStatueInteractPoint = FbExploreSkillStatueInteractPoint;
//# sourceMappingURL=FbExploreSkillStatueInteractPoint.js.map
