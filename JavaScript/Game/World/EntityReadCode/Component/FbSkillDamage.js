"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSkillDamage = void 0);
class FbSkillDamage {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.I3h = !1),
      (this.T3h = 0),
      (this.b3h = !1),
      (this.L3h = 0),
      (this.A3h = !1),
      (this.x3h = 0),
      (this.R3h = !1),
      (this.w3h = 0),
      (this.P3h = !1),
      (this.U3h = 0),
      (this.D3h = !1),
      (this.B3h = 0),
      (this.q3h = !1),
      (this.k3h = 0),
      (this.G3h = !1),
      (this.O3h = 0);
  }
  static Create(t) {
    if (t) return new FbSkillDamage(t);
  }
  get DefaultValue() {
    return (
      this.I3h ||
        ((this.I3h = !0), (this.T3h = this.FbDataInternal.defaultValue())),
      this.T3h
    );
  }
  get NormalAttack() {
    return (
      this.b3h ||
        ((this.b3h = !0), (this.L3h = this.FbDataInternal.normalAttack())),
      this.L3h
    );
  }
  get AccumulatorAttack() {
    return (
      this.A3h ||
        ((this.A3h = !0), (this.x3h = this.FbDataInternal.accumulatorAttack())),
      this.x3h
    );
  }
  get SuperSkill() {
    return (
      this.R3h ||
        ((this.R3h = !0), (this.w3h = this.FbDataInternal.superSkill())),
      this.w3h
    );
  }
  get QteAttack() {
    return (
      this.P3h ||
        ((this.P3h = !0), (this.U3h = this.FbDataInternal.qteAttack())),
      this.U3h
    );
  }
  get NormalSkill() {
    return (
      this.D3h ||
        ((this.D3h = !0), (this.B3h = this.FbDataInternal.normalSkill())),
      this.B3h
    );
  }
  get FightVersion() {
    return (
      this.q3h ||
        ((this.q3h = !0), (this.k3h = this.FbDataInternal.fightVersion())),
      this.k3h
    );
  }
  get ExploreVersion() {
    return (
      this.G3h ||
        ((this.G3h = !0), (this.O3h = this.FbDataInternal.exploreVersion())),
      this.O3h
    );
  }
}
exports.FbSkillDamage = FbSkillDamage;
//# sourceMappingURL=FbSkillDamage.js.map
