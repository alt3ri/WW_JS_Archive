"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWalkingPatternComponent = void 0);
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbWalkingPatternComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.zYh = !1),
      (this.JYh = 0),
      (this.ZYh = !1),
      (this.ezh = void 0),
      (this.tzh = !1),
      (this.izh = 0),
      (this.rzh = !1),
      (this.ozh = void 0);
  }
  static Create(t) {
    if (t) return new FbWalkingPatternComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get EndEntityId() {
    return (
      this.zYh ||
        ((this.zYh = !0), (this.JYh = this.FbDataInternal.endEntityId())),
      this.JYh
    );
  }
  get ScoreVar() {
    var t, i;
    return (
      !this.ZYh &&
        ((this.ZYh = !0),
        (t = this.FbDataInternal.scoreVarType()),
        (i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.ezh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.scoreVar(i),
        )),
      this.ezh
    );
  }
  get SpineEffectExistDuration() {
    return (
      this.tzh ||
        ((this.tzh = !0),
        (this.izh = this.FbDataInternal.spineEffectExistDuration())),
      this.izh
    );
  }
  get ReplaySpineEffect() {
    return (
      this.rzh ||
        ((this.rzh = !0), (this.ozh = this.FbDataInternal.replaySpineEffect())),
      this.ozh
    );
  }
}
exports.FbWalkingPatternComponent = FbWalkingPatternComponent;
//# sourceMappingURL=FbWalkingPatternComponent.js.map
