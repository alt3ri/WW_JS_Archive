"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSpawnMonsterPreDependOnPreceding = void 0);
class FbSpawnMonsterPreDependOnPreceding {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tkh = !1),
      (this.ikh = void 0);
  }
  static Create(e) {
    if (e) return new FbSpawnMonsterPreDependOnPreceding(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Ids() {
    if (!this.tkh) {
      (this.tkh = !0), (this.ikh = new Array());
      var t = this.FbDataInternal.idsLength();
      if (t)
        for (let e = 0; e < t; ++e) this.ikh.push(this.FbDataInternal.ids(e));
    }
    return this.ikh;
  }
}
exports.FbSpawnMonsterPreDependOnPreceding = FbSpawnMonsterPreDependOnPreceding;
//# sourceMappingURL=FbSpawnMonsterPreDependOnPreceding.js.map
