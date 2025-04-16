"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventRestorePlayerCameraAdjustment = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ConfigCurveUtils_1 = require("../../Utils/ConfigCurveUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRestorePlayerCameraAdjustment extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    e || this.FinishExecute(!1);
    var t,
      o,
      n = Global_1.Global.BaseCharacter;
    n &&
      e?.ResetFocus &&
      ((t = e.ResetFocus.FadeInTime),
      (o = ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(
        e.ResetFocus.FadeInCurve,
      )),
      n.GetEntityNoBlueprint().GetComponent(32).ResetPitch(t, o)),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 38, "离开相机调整"),
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust(
        e?.ResetFocus?.FadeInTime,
      );
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RemGuaranteeAction,
      this.Type,
      this.BaseContext,
      { Name: "RestorePlayerCameraAdjustment" },
      !0,
    );
  }
}
exports.LevelEventRestorePlayerCameraAdjustment =
  LevelEventRestorePlayerCameraAdjustment;
//# sourceMappingURL=LevelEventRestorePlayerCameraAdjustment.js.map
