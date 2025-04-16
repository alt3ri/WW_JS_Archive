"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  MathCommon_1 = require("../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateInteractionRotateToLocation extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.RotateSpeed = -0), (this.Rotator = -0);
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var t = t.CharacterActorComponent?.Entity,
      o = t.GetComponent(29),
      t = t.GetComponent(3);
    if (!o?.Valid || !t?.Valid) return !1;
    var a = Vector_1.Vector.Create();
    o.GetInteractionTargetLocation().Subtraction(t.ActorLocationProxy, a),
      (this.Rotator = a.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg);
    let i = t.ActorRotationProxy.Yaw - this.Rotator;
    return (
      180 < i && (i = 360 - i),
      (i = Math.abs(i)),
      (this.RotateSpeed = i / r),
      !0
    );
  }
  K2_NotifyTick(t, e, r) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = t.CharacterActorComponent?.Entity?.GetComponent(176)) &&
      (t.SmoothCharacterRotationByValue(
        0,
        this.Rotator,
        0,
        this.RotateSpeed,
        r,
        "TsAnimNotifyStateInteractionRotateToLocation",
      ),
      !0)
    );
  }
  GetNotifyName() {
    return "设置交互动作旋转和位置";
  }
}
exports.default = TsAnimNotifyStateInteractionRotateToLocation;
//# sourceMappingURL=TsAnimNotifyStateInteractionRotateToLocation.js.map
