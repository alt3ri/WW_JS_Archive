"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetClientEntityVisible = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CreatureController_1 = require("../../World/Controller/CreatureController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetClientEntityVisible extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var r = e;
    if (r) {
      e = t;
      if (e)
        if (EntitySystem_1.EntitySystem.Get(e.TriggerEntityId)?.Valid)
          if (r.EntityIds && 0 !== r.EntityIds.length)
            for (const n of r.EntityIds) {
              var l =
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  n,
                )?.Entity;
              l?.Valid
                ? CreatureController_1.CreatureController.SetEntityEnable(
                    l,
                    r.Visible,
                    "LevelEventSetClientEntityVisible",
                    !0,
                  )
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error("LevelEvent", 32, "目标Entity不存在", [
                    "PbDataId",
                    n,
                  ]);
            }
          else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("LevelEvent", 32, "目标Entity未配置");
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelEvent", 32, "Trigger Entity不存在");
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 32, "此LevelEvent只能配置在Trigger中");
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 32, "参数类型错误");
  }
}
exports.LevelEventSetClientEntityVisible = LevelEventSetClientEntityVisible;
//# sourceMappingURL=LevelEventSetClientEntityVisible.js.map
