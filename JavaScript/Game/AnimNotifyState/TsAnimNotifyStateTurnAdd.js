"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
  GravityUtils_1 = require("../Utils/GravityUtils");
class TurningParams {
  constructor(t) {
    (this.NeedTurn = !1),
      (this.AddRate = 0),
      (this.TotalTime = 0),
      (this.StartAngle = 0),
      (this.EndAngle = 0),
      (this.PreFrameAngle = 0),
      (this.IsInit = !1),
      (this.IsRootMotionValid = !1),
      (this.TotalTime = t);
  }
  CalcTurningRate(t, e, i) {
    var r,
      n = t.Entity.GetComponent(175),
      n =
        ((this.EndAngle = n.MainAnimInstance.GetMainAnimsCurveValueWithDelta(
          CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK,
          this.TotalTime,
        )),
        (this.StartAngle = n.MainAnimInstance.GetMainAnimsCurveValueWithDelta(
          CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK,
          0,
        )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Test",
            6,
            "TurnAdd 1058338",
            ["EntityId", t.Entity.Id],
            ["endAngle", this.EndAngle],
            ["startTime", e],
            ["startAngle", this.StartAngle],
          ),
        this.EndAngle - this.StartAngle);
    MathUtils_1.MathUtils.IsNearlyZero(n) ||
      ((r =
        (e = MathUtils_1.MathUtils.WrapAngle(
          GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInput(t),
        )) - (this.IsRootMotionValid ? n : 0)),
      (this.AddRate = r / n),
      (this.NeedTurn = !0),
      (this.PreFrameAngle = this.StartAngle),
      (this.IsInit = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "TurnAdd 1058338",
          ["EntityId", t.Entity.Id],
          ["needAddAngle", r],
          ["Current", t.ActorRotationProxy],
          ["Input", t.InputRotatorProxy],
          ["Delta", e],
        ));
  }
}
class TsAnimNotifyStateTurnAdd extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(t, e, i) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var r = t.CharacterActorComponent;
    if (!r?.Valid) return !1;
    if (r.GetSequenceBinding()) return !1;
    if (!r.IsMoveAutonomousProxy) return !1;
    TsAnimNotifyStateTurnAdd.Initialize();
    (i = new TurningParams(i)),
      (i.IsRootMotionValid = !r.Actor.GetAttachParentActor()?.IsValid()),
      TsAnimNotifyStateTurnAdd.CachedMap.set(t, i),
      (t = r.Entity.GetComponent(179));
    return t && (t.IsTurning = !0), !0;
  }
  K2_NotifyTick(t, e, i) {
    var r,
      n,
      s,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !(
        !(r = t.CharacterActorComponent)?.Valid ||
        r.GetSequenceBinding() ||
        !r.IsMoveAutonomousProxy ||
        !(n = r.Entity.GetComponent(175))?.Valid ||
        !(t = TsAnimNotifyStateTurnAdd.CachedMap.get(t)) ||
        (t.IsInit || t.CalcTurningRate(r, this.CurrentTimeLength, i),
        !t.NeedTurn) ||
        ((i = t.AddRate),
        (n = n.MainAnimInstance.GetMainAnimsCurveValueWithDelta(
          CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK,
          0,
        )),
        (s = t.PreFrameAngle),
        (TsAnimNotifyStateTurnAdd.TmpRotator.Yaw = i * (n - s)),
        r.AddActorLocalRotation(
          TsAnimNotifyStateTurnAdd.TmpRotator,
          "TsAnimNotifyStateTurnAdd",
          !1,
        ),
        (t.PreFrameAngle = n),
        0)
      )
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var i = t.CharacterActorComponent;
    if (!i?.Valid) return !1;
    if (i.GetSequenceBinding()) return !1;
    if (!i.IsMoveAutonomousProxy) return !1;
    TsAnimNotifyStateTurnAdd.CachedMap?.delete(t);
    t = i.Entity.GetComponent(179);
    return (
      t && (t.IsTurning = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "TurnAdd End",
          ["EntityId", i.Entity.Id],
          ["Current", i.ActorRotationProxy],
          ["Input", i.InputRotatorProxy],
        ),
      !0
    );
  }
  GetNotifyName() {
    return "根据RootLook曲线控制角色转向";
  }
  static Initialize() {
    TsAnimNotifyStateTurnAdd.IsInit ||
      ((TsAnimNotifyStateTurnAdd.CachedMap = new Map()),
      (TsAnimNotifyStateTurnAdd.TmpRotator = new UE.Rotator(0, 0, 0)),
      (TsAnimNotifyStateTurnAdd.IsInit = !0));
  }
}
(TsAnimNotifyStateTurnAdd.IsInit = !1),
  (TsAnimNotifyStateTurnAdd.CachedMap = void 0),
  (TsAnimNotifyStateTurnAdd.TmpRotator = void 0),
  (exports.default = TsAnimNotifyStateTurnAdd);
//# sourceMappingURL=TsAnimNotifyStateTurnAdd.js.map
