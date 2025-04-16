"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplineMoveTaskBase = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class SplineMoveTaskBase {
  constructor(e) {
    this.EntityHandle = e;
  }
  StartTask() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("LevelEvent", 39, "[SplineMoveTaskBase] StartTask", [
        "EntityId",
        this.EntityHandle.Id,
      ]),
      ControllerHolder_1.ControllerHolder.SplineMoveTaskController.RegisterTask(
        this,
      )
        ? this.OnStartTask()
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            39,
            "[SplineMoveTaskBase] Task注册失败，停止",
            ["EntityId", this.EntityHandle.Id],
          );
  }
  EndTask(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "LevelEvent",
        39,
        "[SplineMoveTaskBase] EndTask",
        ["EntityId", this.EntityHandle.Id],
        ["Success", e],
      ),
      ControllerHolder_1.ControllerHolder.SplineMoveTaskController.UnregisterTask(
        this,
      ),
      this.OnEndTask(e);
  }
  TickTask(e) {
    this.OnTickTask(e);
  }
  OnStartTask() {}
  OnEndTask(e) {}
  OnTickTask(e) {}
}
exports.SplineMoveTaskBase = SplineMoveTaskBase;
//# sourceMappingURL=SplineMoveTaskBase.js.map
