"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventEnterSequenceCamera = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnterSequenceCamera extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    e &&
      (e.ShouldEnter
        ? (ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(3),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("LevelEvent", 27, "通过事件进入剧情相机"))
        : (ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("LevelEvent", 27, "通过事件退出剧情相机")));
  }
}
exports.LevelEventEnterSequenceCamera = LevelEventEnterSequenceCamera;
// # sourceMappingURL=LevelEventEnterSequenceCamera.js.map
