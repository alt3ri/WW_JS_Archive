"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventRestorePlayerCameraAdjustment = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ConfigCurveUtils_1 = require("../../Utils/ConfigCurveUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRestorePlayerCameraAdjustment extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    e || this.FinishExecute(!1);
    let t;
    let a;
    const n = Global_1.Global.BaseCharacter;
    n &&
      e?.ResetFocus &&
      ((t = e.ResetFocus.FadeInTime),
      (a = ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(
        e.ResetFocus.FadeInCurve,
      )),
      n.GetEntityNoBlueprint().GetComponent(29).ResetPitch(t, a)),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 39, "离开相机调整"),
      CameraController_1.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust(
        e?.ResetFocus?.FadeInTime,
      );
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RemGuaranteeAction,
      this.Type,
      this.BaseContext,
      { Name: "RestorePlayerCameraAdjustment" },
    );
  }
}
exports.LevelEventRestorePlayerCameraAdjustment =
  LevelEventRestorePlayerCameraAdjustment;
// # sourceMappingURL=LevelEventRestorePlayerCameraAdjustment.js.map
