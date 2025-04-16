"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialSkillKanteleila = void 0);
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  TimeUtil_1 = require("../../../../../../Common/TimeUtil"),
  SpecialSkillBase_1 = require("./SpecialSkillBase");
class SpecialSkillKanteleila extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments),
      (this.MMc = !1),
      (this.nun = 0),
      (this.qsn = 0),
      (this.EMc = 0),
      (this.lLo = 0),
      (this.oUe = 0),
      (this.rbt = 0),
      (this.Lz = Vector_1.Vector.Create()),
      (this.IMc = Vector_1.Vector.Create()),
      (this._$r = Vector_1.Vector.Create());
  }
  OnTick(t) {
    var i, s, h;
    this.MMc &&
      ((t *= TimeUtil_1.TimeUtil.Millisecond),
      (h = this.SpecialSkillComponent.Entity.GetComponent(3)),
      (i = this.SpecialSkillComponent.Entity.GetComponent(44)),
      (s =
        this.SpecialSkillComponent.Entity.GetComponent(
          61,
        ).GetMoveDirectionCache()),
      (h = this.TMc(h.InputDirectProxy, s, t)).IsNearlyZero() ||
        i?.MoveCharacter(h, t, "SpecialSkillKanteleila"));
  }
  BeginAddMoveByInputDirect(t, i, s, h) {
    (this.MMc = !0),
      (this.lLo = 0),
      (this.oUe = 0),
      (this.rbt = h),
      this.IMc.Reset(),
      this._$r.Reset(),
      (this.nun = 0 < t ? t : 0),
      (this.qsn = 0 < i ? this.nun / i : 0),
      (this.EMc = 0 < s ? this.nun / s : 0);
  }
  EndAddMoveByInputDirect() {
    this.MMc = !1;
  }
  TMc(t, i, s) {
    return (
      this._$r.Equals(i) || (this.oUe = 0),
      this._$r.DeepCopy(i),
      (this.oUe += s),
      this.oUe < this.rbt || t.IsNearlyZero()
        ? ((this.lLo -= this.EMc * s), (this.lLo = Math.max(this.lLo, 0)))
        : ((this.lLo += this.qsn * s),
          (this.lLo = Math.min(this.lLo, this.nun)),
          this.IMc.DeepCopy(t)),
      this.Lz.DeepCopy(this.IMc),
      this.Lz.Normalize(),
      this.Lz.MultiplyEqual(this.lLo * s),
      this.Lz
    );
  }
}
exports.SpecialSkillKanteleila = SpecialSkillKanteleila;
//# sourceMappingURL=SpecialSkillKanteleila.js.map
