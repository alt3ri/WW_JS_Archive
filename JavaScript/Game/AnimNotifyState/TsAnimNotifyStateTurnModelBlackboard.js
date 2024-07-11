"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const BlackboardController_1 = require("../World/Controller/BlackboardController");
const totalDurationMap = new Map();
const turnModelMap = new Map();
const runTimeMap = new Map();
const tmpQuat = Quat_1.Quat.Create();
class TsAnimNotifyStateTurnModelBlackboard extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.TurnModelKey = ""),
      (this.Curve = void 0),
      (this.TurnActorOnEnd = !0),
      (this.Absolute = !1),
      (this.TargetRotator = new Rotator_1.Rotator());
  }
  K2_NotifyBegin(t, r, a) {
    let e;
    let o;
    let i;
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !(
        !(e = t.CharacterActorComponent.Entity).GetComponent(160)?.Valid ||
        ((e = e.Id), !this.TurnModelKey) ||
        ((o =
          BlackboardController_1.BlackboardController.GetRotatorValueByEntity(
            e,
            this.TurnModelKey,
          )),
        (this.TargetRotator = Rotator_1.Rotator.Create(o)),
        !o) ||
        (this.Absolute &&
          ((i = t.CharacterActorComponent?.ActorRotationProxy),
          (o.Pitch -= i?.Pitch ?? 0),
          (o.Yaw -= i?.Yaw ?? 0),
          (o.Roll -= i?.Roll ?? 0)),
        totalDurationMap.set(e, a),
        turnModelMap.set(e, Rotator_1.Rotator.Create(o).Quaternion()),
        runTimeMap.set(e, 0),
        t.CharacterActorComponent?.SetOverrideTurnSpeed(void 0),
        0)
      )
    );
  }
  K2_NotifyTick(t, r, a) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var t = t.CharacterActorComponent.Entity;
    const e = t.GetComponent(160);
    if (!e?.Valid) return !1;
    var t = t.Id;
    const o = totalDurationMap.get(t);
    if (!o) return !1;
    const i = turnModelMap.get(t);
    const n = runTimeMap.get(t);
    const s = n + a;
    let u = 0;
    return (
      (u = this.Curve
        ? this.Curve.GetFloatValue(s / o) - this.Curve.GetFloatValue(n / o)
        : a / o),
      Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, i, u, tmpQuat),
      e.AddModelQuat(tmpQuat, !0),
      runTimeMap.set(t, s),
      !0
    );
  }
  K2_NotifyEnd(t, r) {
    let a;
    let e;
    let o;
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((o = t.CharacterActorComponent),
      (a = (t = t.CharacterActorComponent.Entity).Id),
      (e = turnModelMap.get(a)),
      this.TurnActorOnEnd &&
        e &&
        (this.Absolute
          ? (o.SetActorRotation(
              this.TargetRotator.ToUeRotator(),
              "TsAnimNotifyStateTurnModelBlackboard",
              !1,
            ),
            o.SetInputRotator(this.TargetRotator.ToUeRotator()))
          : ((e = o.ActorQuat.op_Multiply(e.ToUeQuat()).Rotator()),
            o.SetActorRotation(e, "TsAnimNotifyStateTurnModelBlackboard", !1),
            o.SetInputRotator(e))),
      totalDurationMap.delete(a),
      turnModelMap.delete(a),
      runTimeMap.delete(a),
      !!(o = t.GetComponent(160))) &&
      (o.ResetModelQuat(), !0)
    );
  }
  GetNotifyName() {
    return "黑板旋转角色";
  }
}
exports.default = TsAnimNotifyStateTurnModelBlackboard;
// # sourceMappingURL=TsAnimNotifyStateTurnModelBlackboard.js.map
