"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNotifyMonsterPlayStandbyTags = void 0);
class FbNotifyMonsterPlayStandbyTags {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bvh = !1),
      (this.Lvh = void 0);
  }
  static Create(t) {
    if (t) return new FbNotifyMonsterPlayStandbyTags(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get StandbyTags() {
    if (!this.bvh) {
      (this.bvh = !0), (this.Lvh = new Array());
      var s = this.FbDataInternal.standbyTagsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.Lvh.push(this.FbDataInternal.standbyTags(t));
    }
    return this.Lvh;
  }
}
exports.FbNotifyMonsterPlayStandbyTags = FbNotifyMonsterPlayStandbyTags;
//# sourceMappingURL=FbNotifyMonsterPlayStandbyTags.js.map
