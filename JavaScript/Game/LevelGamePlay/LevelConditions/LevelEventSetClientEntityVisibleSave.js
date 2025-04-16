"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetClientEntityVisibleSave = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetClientEntityVisibleSave extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    var t = e;
    if (t)
      if (1 === l.Type && l.ClientExecuteActions)
        if (t.EntityIds && 0 !== t.EntityIds.length)
          for (const r of t.EntityIds) {
            var o =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                r,
              )?.Entity;
            o?.Valid
              ? ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                  o,
                  t.Visible,
                  "LevelEventSetClientEntityVisible",
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("LevelEvent", 31, "目标Entity不存在", [
                  "PbDataId",
                  r,
                ]);
          }
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelEvent", 31, "目标Entity未配置");
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 26, "不是场景引用的帧事件");
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 31, "参数类型错误");
  }
}
exports.LevelEventSetClientEntityVisibleSave =
  LevelEventSetClientEntityVisibleSave;
//# sourceMappingURL=LevelEventSetClientEntityVisibleSave.js.map
