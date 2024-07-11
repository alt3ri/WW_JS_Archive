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
  K2_NotifyBegin(e, t, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var a = e.CharacterActorComponent?.Entity;
      if (a)
        return (
          e.SetAnimRootMotionTranslationScale(
            MathUtils_1.MathUtils.Clamp(
              Math.abs(e.CharacterMovement.Velocity.Z) /
                this.EnterWaterVelocityZ,
              0.7,
              1,
            ),
          ),
          a.GetComponent(68)?.SetEnterWaterState(!0),
          !0
        );
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Test",
          58,
          "No Entity for TsBaseCharacter",
          ["Name", e.GetName()],
          ["location", e.K2_GetActorLocation()],
        );
    }
    return !1;
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var r = e.CharacterActorComponent?.Entity;
      if (r)
        return (
          e.SetAnimRootMotionTranslationScale(1),
          r.GetComponent(68)?.SetEnterWaterState(!1),
          !0
        );
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Test",
          58,
          "No Entity for TsBaseCharacter",
          ["Name", e.GetName()],
          ["location", e.K2_GetActorLocation()],
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
