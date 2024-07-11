"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const MathCommon_1 = require("../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateInteractionRotateToLocation extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.RotateSpeed = -0), (this.Rotator = -0);
  }
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var t = t.CharacterActorComponent?.Entity;
    const a = t.GetComponent(26);
    var t = t.GetComponent(3);
    if (!a?.Valid || !t?.Valid) return !1;
    const o = Vector_1.Vector.Create();
    a.GetInteractionTargetLocation().Subtraction(t.ActorLocationProxy, o),
      (this.Rotator = o.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg);
    let i = t.ActorRotationProxy.Yaw - this.Rotator;
    return (
      i > 180 && (i = 360 - i),
      (i = Math.abs(i)),
      (this.RotateSpeed = i / r),
      !0
    );
  }
  K2_NotifyTick(t, e, r) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = t.CharacterActorComponent?.Entity?.GetComponent(161)) &&
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
// # sourceMappingURL=TsAnimNotifyStateInteractionRotateToLocation.js.map
