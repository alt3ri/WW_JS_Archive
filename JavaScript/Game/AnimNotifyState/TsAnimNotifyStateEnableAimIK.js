"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
class TsAnimNotifyStateEnableAimIK extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.SkeletonChange = !1),
      (this.SightBoneName = void 0),
      (this.BeginBoneName = void 0),
      (this.EndBoneName = void 0),
      (this.AssistLimit = -0),
      (this.OldSightBoneName = void 0),
      (this.OldBeginBoneName = void 0),
      (this.OldEndBoneName = void 0),
      (this.OldCameraMode = 0),
      (this.OldAssistLimit = -0);
  }
  K2_NotifyBegin(e, t, i) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var s = e.CharacterActorComponent?.Entity;
      if (s) {
        var s = s.GetComponent(160).MainAnimInstance;
        if (
          UE.KuroStaticLibrary.IsObjectClassByName(
            s,
            CharacterNameDefines_1.CharacterNameDefines.ABP_MONSTERCOMMON,
          )
        )
          return (
            (this.OldSightBoneName = (s = s)["Sight Bone Name"]),
            (this.OldBeginBoneName = s["Begin Bone Name"]),
            (this.OldEndBoneName = s["End Bone Name"]),
            (this.OldCameraMode = s.CameraMode),
            (this.OldAssistLimit = s["Assist Limit"]),
            (s["Sight Bone Name"] = this.SightBoneName),
            (s["Begin Bone Name"] = this.BeginBoneName),
            (s["End Bone Name"] = this.EndBoneName),
            (s.CameraMode = 3),
            (s["Assist Limit"] = this.AssistLimit),
            this.SkeletonChange && (s.Increment += 1),
            !0
          );
      } else
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
      var i = e.CharacterActorComponent?.Entity;
      if (i) {
        var i = i.GetComponent(160).MainAnimInstance;
        if (
          UE.KuroStaticLibrary.IsObjectClassByName(
            i,
            CharacterNameDefines_1.CharacterNameDefines.ABP_MONSTERCOMMON,
          )
        )
          return (
            ((i = i)["Sight Bone Name"] = this.OldSightBoneName),
            (i["Begin Bone Name"] = this.OldBeginBoneName),
            (i["End Bone Name"] = this.OldEndBoneName),
            (i.CameraMode = this.OldCameraMode),
            (i["Assist Limit"] = this.OldAssistLimit),
            !0
          );
      } else
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
    return "瞄准动作IK";
  }
}
exports.default = TsAnimNotifyStateEnableAimIK;
//# sourceMappingURL=TsAnimNotifyStateEnableAimIK.js.map
