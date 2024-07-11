"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
const MINUS_180 = -180;
const MAX_TURN_TIME = 1e4;
class TurningParams {
  constructor(t) {
    (this.NeedTurn = !1),
      (this.TargetAngle = 0),
      (this.AddRate = 0),
      (this.StartAngle = 0),
      (this.EndAngle = 0),
      (this.PreFrameAngle = 0);
    const e = t.Entity.GetComponent(160);
    (this.TargetAngle = t.InputRotator.Yaw),
      (this.EndAngle = e.MainAnimInstance.GetMainAnimsCurveValueWithDelta(
        CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK,
        MAX_TURN_TIME,
      )),
      (this.StartAngle = e.MainAnimInstance.GetMainAnimsCurveValueWithDelta(
        CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK,
        -MAX_TURN_TIME,
      )),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "TurnAdd 1058338",
          ["EntityId", t.Entity.Id],
          ["endAngle", this.EndAngle],
          ["startAngle", this.StartAngle],
        ),
      this.Bse(t);
  }
  Bse(e) {
    const r = this.EndAngle - this.StartAngle;
    if (!MathUtils_1.MathUtils.IsNearlyZero(r)) {
      let t = e.InputRotator.Yaw - e.ActorRotationProxy.Yaw - r;
      for (; t > 180; ) t -= 360;
      for (; t < MINUS_180; ) t += 360;
      (t /= r),
        (this.AddRate = t),
        (this.NeedTurn = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Test",
            6,
            "TurnAdd 1058338",
            ["EntityId", e.Entity.Id],
            ["needAdd", t],
            ["Current", e.ActorRotationProxy.Yaw],
            ["Input", e.InputRotator.Yaw],
          );
    }
  }
}
class TsAnimNotifyStateTurnAdd extends UE.KuroAnimNotifyState {
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    const i = t.CharacterActorComponent;
    if (!i?.Valid) return !1;
    if (i.GetSequenceBinding()) return !1;
    if (!i.IsAutonomousProxy) return !1;
    TsAnimNotifyStateTurnAdd.Initialize(),
      TsAnimNotifyStateTurnAdd.CachedMap.set(t, new TurningParams(i));
    t = i.Entity.GetComponent(163);
    return t && (t.IsTurning = !0), !0;
  }
  K2_NotifyTick(t, e, r) {
    let i;
    let n;
    let a;
    let s;
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(i = t.CharacterActorComponent)?.Valid &&
      !i.GetSequenceBinding() &&
      !(
        !i.IsAutonomousProxy ||
        !(a = i.Entity.GetComponent(160))?.Valid ||
        !(t = TsAnimNotifyStateTurnAdd.CachedMap.get(t))?.NeedTurn ||
        ((n = t.AddRate),
        (a = a.MainAnimInstance.GetMainAnimsCurveValueWithDelta(
          CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK,
          0,
        )),
        (s = t.PreFrameAngle),
        (TsAnimNotifyStateTurnAdd.TmpRotator.Yaw =
          i.ActorRotation.Yaw + n * (a - s)),
        i.SetActorRotation(
          TsAnimNotifyStateTurnAdd.TmpRotator,
          "TsAnimNotifyStateTurnAdd",
          !1,
        ),
        (t.PreFrameAngle = a),
        0)
      )
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    const r = t.CharacterActorComponent;
    if (!r?.Valid) return !1;
    if (r.GetSequenceBinding()) return !1;
    if (!r.IsAutonomousProxy) return !1;
    TsAnimNotifyStateTurnAdd.CachedMap?.delete(t);
    t = r.Entity.GetComponent(163);
    return (
      t && (t.IsTurning = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          6,
          "TurnAdd End",
          ["EntityId", r.Entity.Id],
          ["Current", r.ActorRotationProxy.Yaw],
          ["Input", r.InputRotator.Yaw],
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
// # sourceMappingURL=TsAnimNotifyStateTurnAdd.js.map
