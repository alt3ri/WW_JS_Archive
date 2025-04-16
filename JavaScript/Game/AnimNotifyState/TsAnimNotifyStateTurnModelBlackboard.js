"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  tmpQuat = Quat_1.Quat.Create();
class TurnModelBlackboardParams {
  constructor() {
    (this.TotalDuration = 0),
      (this.TurnModel = Rotator_1.Rotator.Create()),
      (this.TurnModelQuat = Quat_1.Quat.Create()),
      (this.RunTime = 0);
  }
}
class TsAnimNotifyStateTurnModelBlackboard extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.TurnModelKey = ""),
      (this.Curve = void 0),
      (this.TurnActorOnEnd = !0),
      (this.Absolute = !1),
      (this.ParamsMap = new Map());
  }
  Constructor() {
    this.ParamsMap = new Map();
  }
  Init() {
    this.ParamsMap || (this.ParamsMap = new Map());
  }
  K2_NotifyBegin(t, r, e) {
    this.Init();
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var a = t.CharacterActorComponent.Entity;
    if (!a.GetComponent(175)?.Valid) return !1;
    a = a.Id;
    if (!this.TurnModelKey) return !1;
    a =
      ControllerHolder_1.ControllerHolder.BlackboardController.GetRotatorValueByEntity(
        a,
        this.TurnModelKey,
      );
    if (!a) return !1;
    this.Absolute &&
      ((s = t.CharacterActorComponent?.ActorRotationProxy),
      (a.Pitch -= s?.Pitch ?? 0),
      (a.Yaw -= s?.Yaw ?? 0),
      (a.Roll -= s?.Roll ?? 0));
    var s = new TurnModelBlackboardParams();
    return (
      (s.TotalDuration = e),
      s.TurnModel.FromUeRotator(a),
      s.TurnModel.Quaternion(s.TurnModelQuat),
      (s.RunTime = 0),
      this.ParamsMap.set(t, s),
      !0
    );
  }
  K2_NotifyTick(t, r, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var a = t.CharacterActorComponent.Entity.GetComponent(175);
    if (!a?.Valid) return !1;
    t = this.ParamsMap.get(t);
    if (!t) return !1;
    var s = t.TotalDuration,
      i = t.TurnModelQuat,
      o = t.RunTime,
      n = o + e;
    let u = 0;
    return (
      (u = this.Curve
        ? this.Curve.GetFloatValue(n / s) - this.Curve.GetFloatValue(o / s)
        : e / s),
      Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, i, u, tmpQuat),
      a.AddModelQuat(tmpQuat, !0),
      (t.RunTime = n),
      !0
    );
  }
  K2_NotifyEnd(t, r) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var e = t.CharacterActorComponent,
      a = t.CharacterActorComponent.Entity,
      s = this.ParamsMap.get(t);
    if (!s) return !1;
    this.ParamsMap.delete(t),
      this.TurnActorOnEnd &&
        e.AddActorLocalRotation(
          s.TurnModel.ToUeRotator(),
          "TsAnimNotifyStateTurnModelBlackboard",
          !1,
        );
    t = a.GetComponent(175);
    return !!t && (t.ResetModelQuat(), !0);
  }
  GetNotifyName() {
    return "黑板旋转角色";
  }
}
exports.default = TsAnimNotifyStateTurnModelBlackboard;
//# sourceMappingURL=TsAnimNotifyStateTurnModelBlackboard.js.map
