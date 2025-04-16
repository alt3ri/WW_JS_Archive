"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyStateCameraSensitivity extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.水平视角灵敏度 = 1),
      (this.垂直视角灵敏度 = 1),
      (this.瞄准水平视角灵敏度 = 1),
      (this.瞄准垂直视角灵敏度 = 1);
  }
  Constructor() {}
  K2_NotifyBegin(e, a, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !(
        !(e = e.CharacterActorComponent)?.Valid ||
        !e?.IsAutonomousProxy ||
        !ModelManager_1.ModelManager.CameraModel ||
        ((ModelManager_1.ModelManager.CameraModel.IsEnableSpecificCameraSensitivity =
          !0),
        (ModelManager_1.ModelManager.CameraModel.SpecificCameraBaseYawSensitivity =
          this.水平视角灵敏度),
        (ModelManager_1.ModelManager.CameraModel.SpecificCameraBasePitchSensitivity =
          this.垂直视角灵敏度),
        (ModelManager_1.ModelManager.CameraModel.SpecificCameraAimingYawSensitivity =
          this.瞄准水平视角灵敏度),
        (ModelManager_1.ModelManager.CameraModel.SpecificCameraAimingPitchSensitivity =
          this.瞄准垂直视角灵敏度),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Camera",
            57,
            "[CameraSensitivity Ans Start]",
            ["水平视角灵敏度", this.水平视角灵敏度],
            ["垂直视角灵敏度", this.垂直视角灵敏度],
            ["瞄准水平视角灵敏度", this.瞄准水平视角灵敏度],
            ["瞄准垂直视角灵敏度", this.瞄准垂直视角灵敏度],
          ),
        0)
      )
    );
  }
  K2_NotifyEnd(e, a) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !(
        !(e = e.CharacterActorComponent)?.Valid ||
        !e.IsAutonomousProxy ||
        !ModelManager_1.ModelManager.CameraModel ||
        ((ModelManager_1.ModelManager.CameraModel.IsEnableSpecificCameraSensitivity =
          !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Camera", 57, "[CameraSensitivity Ans Stop]"),
        0)
      )
    );
  }
  GetNotifyName() {
    return "设置镜头灵敏度";
  }
}
exports.default = TsAnimNotifyStateCameraSensitivity;
//# sourceMappingURL=TsAnimNotifyStateCameraSensitivity.js.map
