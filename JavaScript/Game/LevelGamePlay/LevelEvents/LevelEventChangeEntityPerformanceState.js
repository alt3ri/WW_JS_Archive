"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventChangeEntityPerformanceState = void 0);
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventChangeEntityPerformanceState extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, a) {
    const r = e;
    if (r) {
      let a = void 0;
      let n = void 0;
      switch (r.Type) {
        case IAction_1.EChangeEntityPrefabPerformanceType.Target:
          (a = r.EntityId),
            (n =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a));
          break;
        case IAction_1.EChangeEntityPrefabPerformanceType.Self:
          if (!t) return;
          (a = t.EntityId),
            (n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(a));
      }
      a &&
        WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(a, (e) => {
          let t;
          e
            ? (e = n?.Entity?.GetComponent(117))
              ? (t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
                  r.PerformanceTag,
                ))
                ? e.ChangePerformanceState(t)
                : Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "LevelEvent",
                    37,
                    "[LevelEventChangeEntityPerformanceState] 找不到对应的StateTag",
                    ["pbDataId", a],
                    ["Type", r.Type],
                  )
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "LevelEvent",
                  37,
                  "[LevelEventChangeEntityPerformanceState] 找不到对应的SceneItemStateComponent",
                  ["pbDataId", a],
                )
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "LevelEvent",
                37,
                "[ LevelEventChangeEntityPerformanceState] 找不到对应的Entity",
                ["pbDataId", a],
                ["Type", r.Type],
              );
        });
    }
  }
}
exports.LevelEventChangeEntityPerformanceState =
  LevelEventChangeEntityPerformanceState;
// # sourceMappingURL=LevelEventChangeEntityPerformanceState.js.map
