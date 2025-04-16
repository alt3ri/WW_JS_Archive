"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHideWorldMonsterAndMonsterTreasureGroup = void 0);
class FbHideWorldMonsterAndMonsterTreasureGroup {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hxh = !1),
      (this.lxh = void 0);
  }
  static Create(t) {
    if (t) return new FbHideWorldMonsterAndMonsterTreasureGroup(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get HideRangeEntities() {
    if (!this.hxh) {
      (this.hxh = !0), (this.lxh = new Array());
      var e = this.FbDataInternal.hideRangeEntitiesLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.lxh.push(this.FbDataInternal.hideRangeEntities(t));
    }
    return this.lxh;
  }
}
exports.FbHideWorldMonsterAndMonsterTreasureGroup =
  FbHideWorldMonsterAndMonsterTreasureGroup;
//# sourceMappingURL=FbHideWorldMonsterAndMonsterTreasureGroup.js.map
