"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  CameraController_1 = require("../Camera/CameraController"),
  CameraUtility_1 = require("../Camera/CameraUtility"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
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
      (this.DisableMotionBlur = !0);
  }
  K2_Notify(t, e) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!CameraUtility_1.CameraUtility.CheckCameraSequenceCondition(
        t,
        this.生效客户端,
      ) &&
      (CameraController_1.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(
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
      ),
      !0)
    );
  }
  GetNotifyName() {
    return "特写镜头";
  }
}
exports.default = TsAnimNotifySwitchSequenceCamera;
//# sourceMappingURL=TsAnimNotifySwitchSequenceCamera.js.map
