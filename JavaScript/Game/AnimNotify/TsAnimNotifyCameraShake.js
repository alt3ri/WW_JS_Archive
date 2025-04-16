"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  CameraUtility_1 = require("../Camera/CameraUtility"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
class TsAnimNotifyCameraShake extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.震动配置 = void 0),
      (this.bForSelf = !1),
      (this.Radius = -0);
  }
  Constructor() {}
  K2_Notify(r, e) {
    var t = r.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
        t.EntityId,
      ))?.Valid &&
      !(
        !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(
          t,
        ) ||
        !CameraUtility_1.CameraUtility.CheckCameraShakeCondition(t) ||
        0 !==
          ControllerHolder_1.ControllerHolder.CameraController.Model
            .CameraMode ||
        !ControllerHolder_1.ControllerHolder.CameraController.GetPlayerCameraManager()?.IsValid() ||
        (this.bForSelf
          ? ControllerHolder_1.ControllerHolder.CameraController.PlayCameraShake(
              this.震动配置,
              ControllerHolder_1.ControllerHolder.CameraController.Model
                .ShakeModify,
              0,
              void 0,
              !0,
            )
          : ControllerHolder_1.ControllerHolder.CameraController.PlayWorldCameraShake(
              this.震动配置,
              r?.GetOwner()?.D_K2_GetActorLocation(),
              this.Radius,
              this.Radius,
              1,
              !0,
            ),
        0)
      )
    );
  }
  GetNotifyName() {
    return "相机震屏";
  }
}
exports.default = TsAnimNotifyCameraShake;
//# sourceMappingURL=TsAnimNotifyCameraShake.js.map
