"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetClientEntityVisible = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetClientEntityVisible extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var l = e;
    if (l)
      if (l.EntityIds && 0 !== l.EntityIds.length)
        for (const o of l.EntityIds) {
          var r =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
              o,
            )?.Entity;
          r?.Valid
            ? ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                r,
                l.Visible,
                "LevelEventSetClientEntityVisible",
                !0,
              )
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("LevelEvent", 31, "目标Entity不存在", [
                "PbDataId",
                o,
              ]);
        }
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 31, "目标Entity未配置");
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 31, "参数类型错误");
  }
}
exports.LevelEventSetClientEntityVisible = LevelEventSetClientEntityVisible;
//# sourceMappingURL=LevelEventSetClientEntityVisible.js.map
