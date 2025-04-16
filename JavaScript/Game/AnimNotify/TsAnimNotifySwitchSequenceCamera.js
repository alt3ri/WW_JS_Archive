"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  CameraUtility_1 = require("../Camera/CameraUtility"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
class TsAnimNotifySwitchSequenceCamera extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.生效客户端 = 0),
      (this.特写镜头配置 = void 0),
      (this.bResetLockOnCamera = !1),
      (this.AdditiveRotation = void 0),
      (this.CameraAttachSocket = ""),
      (this.CameraDetectSocket = ""),
      (this.强制播放Sequence = !1),
      (this.ExtraDetectSphereRadius = -0),
      (this.ExtraSphereLocation = void 0),
      (this.IsShowExtraSphere = !1),
      (this.IsIgnoreCharacterCollision = !1),
      (this.DisableMovementInput = !0),
      (this.DisableLookAtInput = !0),
      (this.DisableMotionBlur = !0),
      (this.启用特定功能下的镜头配置 = !1),
      (this.特定功能下的镜头配置 = void 0);
  }
  Constructor() {}
  K2_Notify(t, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId);
    if (!i?.Valid) return !1;
    if (
      !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(
        i,
      )
    )
      return !1;
    let r = void 0,
      s = this.生效客户端;
    return (
      this.启用特定功能下的镜头配置 &&
        (r = this.GetSpecificConfig()) &&
        (s = r.OverrideCondition),
      !!CameraUtility_1.CameraUtility.CheckCameraSequenceCondition(t, s) &&
        (ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(
          this.特写镜头配置,
          this.bResetLockOnCamera,
          this.AdditiveRotation,
          t,
          FNameUtil_1.FNameUtil.GetDynamicFName(this.CameraAttachSocket),
          FNameUtil_1.FNameUtil.GetDynamicFName(this.CameraDetectSocket),
          this.ExtraSphereLocation,
          this.ExtraDetectSphereRadius,
          this.IsShowExtraSphere,
          this.IsIgnoreCharacterCollision,
          this.DisableMovementInput,
          this.DisableLookAtInput,
          this.DisableMotionBlur,
          this.强制播放Sequence,
          r,
        ),
        !0)
    );
  }
  GetNotifyName() {
    return "特写镜头";
  }
  GetSpecificConfig() {
    if (this.特定功能下的镜头配置) {
      var e = this.特定功能下的镜头配置.Num();
      for (let t = 0; t < e; t++) {
        var i = this.特定功能下的镜头配置.Get(t);
        if (
          i &&
          0 !== i.SpecificType &&
          1 === i.SpecificType &&
          ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()
        )
          return i;
      }
    }
  }
}
exports.default = TsAnimNotifySwitchSequenceCamera;
//# sourceMappingURL=TsAnimNotifySwitchSequenceCamera.js.map
