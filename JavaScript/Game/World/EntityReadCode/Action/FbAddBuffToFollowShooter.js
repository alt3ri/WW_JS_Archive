"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAddBuffToFollowShooter = void 0);
class FbAddBuffToFollowShooter {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Vph = !1),
      (this.jph = void 0),
      (this.XO_ = !1),
      (this.YO_ = 0);
  }
  static Create(t) {
    if (t) return new FbAddBuffToFollowShooter(t);
  }
  get BuffIds() {
    if (!this.Vph) {
      (this.Vph = !0), (this.jph = new Array());
      var o = this.FbDataInternal.buffIdsLength();
      if (o)
        for (let t = 0; t < o; ++t)
          this.jph.push(Number(this.FbDataInternal.buffIds(t) ?? 0));
    }
    return this.jph;
  }
  get FollowShooterId() {
    return (
      this.XO_ ||
        ((this.XO_ = !0), (this.YO_ = this.FbDataInternal.followShooterId())),
      this.YO_
    );
  }
}
exports.FbAddBuffToFollowShooter = FbAddBuffToFollowShooter;
//# sourceMappingURL=FbAddBuffToFollowShooter.js.map
