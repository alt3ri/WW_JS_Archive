"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckDirection = void 0);
const UE = require("ue");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDirection extends LevelGeneralBase_1.LevelConditionBase {
  constructor() {
    super(...arguments), (this.tLe = Vector_1.Vector.Create());
  }
  Check(e, r) {
    if (e.LimitParams && r) {
      const t = e.LimitParams.get("Dir");
      var e = e.LimitParams.get("CheckWay");
      if (t && e && Global_1.Global.BaseCharacter) {
        const s = Global_1.Global.BaseCharacter.CharacterActorComponent;
        const a =
          (this.tLe.FromUeVector(r.K2_GetActorLocation()),
          this.tLe.Subtraction(s.ActorLocationProxy, this.tLe),
          this.tLe.Normalize(),
          MathUtils_1.MathUtils.GetAngleByVectorDot(this.tLe, s.ActorForward));
        switch (e) {
          case "1":
            return parseFloat(t) >= a;
          case "2":
            return parseFloat(t) <= a;
          case "3":
            return parseFloat(t) !== a;
        }
      }
    }
    return !1;
  }
  CheckNew(e) {
    let r;
    let t = Global_1.Global.BaseCharacter;
    return (
      !!t &&
      ((t = t.CharacterActorComponent),
      (r = Vector_1.Vector.Create()),
      t.ActorRotationProxy.Vector(r),
      r.Normalize(),
      (t = Vector_1.Vector.Create(
        e.Direction.X ?? 0,
        e.Direction.Y ?? 0,
        e.Direction.Z ?? 0,
      )),
      (t = Vector_1.Vector.Create(
        UE.Rotator.MakeFromEuler(t.ToUeVector()).Vector(),
      )).Normalize(),
      MathUtils_1.MathUtils.GetAngleByVectorDot(t, r) < e.AngleInterval)
    );
  }
}
exports.LevelConditionCheckDirection = LevelConditionCheckDirection;
// # sourceMappingURL=LevelConditionCheckDirection.js.map
