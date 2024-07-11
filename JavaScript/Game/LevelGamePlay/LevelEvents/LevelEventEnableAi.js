"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventEnableAi = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnableAi extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    const n = e;
    if (n)
      if (n.EntityIds)
        for (const a of n.EntityIds) {
          let o =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
          o
            ? (o = o.Entity.GetComponent(36)) && o.Valid
              ? o.StopMove(!n.IsEnable)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "LevelEvent",
                  19,
                  "LevelEventEnableAi行为执行时,实体不存在CharacterMoveComponent",
                  ["实体Id", a],
                )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                19,
                "LevelEventEnableAi行为执行时找不到实体",
                ["实体Id", a],
              );
        }
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            19,
            "LevelEventEnableAi行为执行失败：配置的实体Id列表为空",
          ),
          this.FinishExecute(!1);
    else this.FinishExecute(!1);
  }
}
exports.LevelEventEnableAi = LevelEventEnableAi;
// # sourceMappingURL=LevelEventEnableAi.js.map
