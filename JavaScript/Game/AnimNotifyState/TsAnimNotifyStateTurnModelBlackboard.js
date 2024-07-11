"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  BlackboardController_1 = require("../World/Controller/BlackboardController"),
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
  Init() {
    this.ParamsMap || (this.ParamsMap = new Map());
  }
  K2_NotifyBegin(t, r, e) {
    this.Init();
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var a = t.CharacterActorComponent.Entity;
    if (!a.GetComponent(162)?.Valid) return !1;
    a = a.Id;
    if (!this.TurnModelKey) return !1;
    a = BlackboardController_1.BlackboardController.GetRotatorValueByEntity(
      a,
      this.TurnModelKey,
    );
    if (!a) return !1;
    this.Absolute &&
      ((i = t.CharacterActorComponent?.ActorRotationProxy),
      (a.Pitch -= i?.Pitch ?? 0),
      (a.Yaw -= i?.Yaw ?? 0),
      (a.Roll -= i?.Roll ?? 0));
    var i = new TurnModelBlackboardParams();
    return (
      (i.TotalDuration = e),
      i.TurnModel.FromUeRotator(a),
      i.TurnModel.Quaternion(i.TurnModelQuat),
      (i.RunTime = 0),
      this.ParamsMap.set(t, i),
      !0
    );
  }
  K2_NotifyTick(t, r, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var a = t.CharacterActorComponent.Entity.GetComponent(162);
    if (!a?.Valid) return !1;
    t = this.ParamsMap.get(t);
    if (!t) return !1;
    var i = t.TotalDuration,
      s = t.TurnModelQuat,
      o = t.RunTime,
      n = o + e;
    let u = 0;
    return (
      (u = this.Curve
        ? this.Curve.GetFloatValue(n / i) - this.Curve.GetFloatValue(o / i)
        : e / i),
      Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, s, u, tmpQuat),
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
      i = this.ParamsMap.get(t);
    if (!i) return !1;
    this.ParamsMap.delete(t),
      this.TurnActorOnEnd &&
        e.AddActorLocalRotation(
          i.TurnModel.ToUeRotator(),
          "TsAnimNotifyStateTurnModelBlackboard",
          !1,
        );
    t = a.GetComponent(162);
    return !!t && (t.ResetModelQuat(), !0);
  }
  GetNotifyName() {
    return "黑板旋转角色";
  }
}
exports.default = TsAnimNotifyStateTurnModelBlackboard;
//# sourceMappingURL=TsAnimNotifyStateTurnModelBlackboard.js.map
