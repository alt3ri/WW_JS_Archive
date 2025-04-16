"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHideWorldMonsterAndMonsterTreasure = void 0);
class FbHideWorldMonsterAndMonsterTreasure {
  constructor(e) {
    (this.FbDataInternal = e), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(e) {
    if (e) return new FbHideWorldMonsterAndMonsterTreasure(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbHideWorldMonsterAndMonsterTreasure =
  FbHideWorldMonsterAndMonsterTreasure;
//# sourceMappingURL=FbHideWorldMonsterAndMonsterTreasure.js.map
