"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMonsterFormation = void 0);
class FbMonsterFormation {
  constructor(t) {
    (this.FbDataInternal = t), (this.tWh = !1), (this.iWh = void 0);
  }
  static Create(t) {
    if (t) return new FbMonsterFormation(t);
  }
  get FormationPosConfig() {
    if (!this.tWh) {
      (this.tWh = !0), (this.iWh = new Array());
      var s = this.FbDataInternal.formationPosConfigLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.iWh.push(this.FbDataInternal.formationPosConfig(t));
    }
    return this.iWh;
  }
}
exports.FbMonsterFormation = FbMonsterFormation;
//# sourceMappingURL=FbMonsterFormation.js.map
