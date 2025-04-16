"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHideWorldEntityAndLevelPlay = void 0);
class FbHideWorldEntityAndLevelPlay {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.oxh = !1),
      (this.nxh = void 0);
  }
  static Create(t) {
    if (t) return new FbHideWorldEntityAndLevelPlay(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ExcludeEntities() {
    if (!this.oxh) {
      (this.oxh = !0), (this.nxh = new Array());
      var i = this.FbDataInternal.excludeEntitiesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.nxh.push(this.FbDataInternal.excludeEntities(t));
    }
    return this.nxh;
  }
}
exports.FbHideWorldEntityAndLevelPlay = FbHideWorldEntityAndLevelPlay;
//# sourceMappingURL=FbHideWorldEntityAndLevelPlay.js.map
