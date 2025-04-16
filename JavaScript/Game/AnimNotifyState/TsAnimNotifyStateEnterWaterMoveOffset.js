"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateEnterWaterMoveOffset extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.EnterWaterVelocityZ = 800);
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var a = t.CharacterActorComponent?.Entity;
      if (a)
        return (
          t.SetAnimRootMotionTranslationScale(
            MathUtils_1.MathUtils.Clamp(
              Math.abs(t.CharacterMovement.Velocity.Z) /
                this.EnterWaterVelocityZ,
              0.7,
              1,
            ),
          ),
          a.GetComponent(76)?.SetEnterWaterState(!0),
          !0
        );
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Test",
          57,
          "No Entity for TsBaseCharacter",
          ["Name", t.GetName()],
          ["location", t.D_K2_GetActorLocation()],
        );
    }
    return !1;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var r = t.CharacterActorComponent?.Entity;
      if (r)
        return (
          t.SetAnimRootMotionTranslationScale(1),
          r.GetComponent(76)?.SetEnterWaterState(!1),
          !0
        );
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Test",
          57,
          "No Entity for TsBaseCharacter",
          ["Name", t.GetName()],
          ["location", t.D_K2_GetActorLocation()],
        );
    }
    return !1;
  }
  GetNotifyName() {
    return "空中落水移动";
  }
}
exports.default = TsAnimNotifyStateEnterWaterMoveOffset;
//# sourceMappingURL=TsAnimNotifyStateEnterWaterMoveOffset.js.map
