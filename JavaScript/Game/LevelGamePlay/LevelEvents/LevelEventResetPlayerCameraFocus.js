"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventResetPlayerCameraFocus = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  CameraController_1 = require("../../Camera/CameraController"),
  CameraUtility_1 = require("../../Camera/CameraUtility"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventResetPlayerCameraFocus extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 57, "进入恢复相机调整");
    var r = e;
    if (r)
      if (Global_1.Global.BaseCharacter?.IsValid()) {
        var o = r.FadeInTime,
          t = !r.CannotInterrupt,
          l = r.Duration ?? 0;
        switch (r.ResetType.Type) {
          case "ResetToDefaultDirection":
            CameraUtility_1.CameraUtility.ResetFocus(o, void 0, t, l);
            break;
          case "ResetToFixedDirection":
            var s = r.ResetType;
            LevelEventResetPlayerCameraFocus.mce.Set(
              s.Direction.Y ?? 0,
              s.Direction.Z ?? 0,
              s.Direction.X ?? 0,
            ),
              CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraEulerRotatorWithCurve(
                LevelEventResetPlayerCameraFocus.mce,
                o,
                void 0,
                t,
                l,
              );
        }
        Global_1.Global.BaseCharacter &&
          ModelManager_1.ModelManager.CreatureModel.GetEntityById(
            Global_1.Global.BaseCharacter.EntityId,
          )
            ?.Entity?.GetComponent(61)
            ?.InterruptAutoMoving("进入相机调整ResetPlayerCameraFocus", !0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Event", 57, "结束恢复相机调整");
      } else this.FinishExecute(!1);
    else this.FinishExecute(!1);
  }
}
(exports.LevelEventResetPlayerCameraFocus =
  LevelEventResetPlayerCameraFocus).mce = Rotator_1.Rotator.Create();
//# sourceMappingURL=LevelEventResetPlayerCameraFocus.js.map
