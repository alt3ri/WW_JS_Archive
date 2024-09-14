"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionChangeEntityPerformanceState = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeEntityPerformanceState extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var a,
      o,
      i = this.ActionInfo.Params;
    if (i) {
      let e = void 0,
        t = void 0;
      switch (i.Type) {
        case IAction_1.EChangeEntityPrefabPerformanceType.Target:
          (e = i.EntityId),
            (t =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e));
          break;
        case IAction_1.EChangeEntityPrefabPerformanceType.Self:
          (e = this.K$i()),
            (t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e));
      }
      t?.IsInit
        ? (a = t?.Entity?.GetComponent(120))
          ? (o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
              i.PerformanceTag,
            ))
            ? a.ChangePerformanceState(o)
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                7,
                "[FlowActionChangeEntityPerformanceState] 找不到对应的StateTag",
                ["pbDataId", e],
                ["Type", i.Type],
              )
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              7,
              "[FlowActionChangeEntityPerformanceState] 找不到对应的SceneItemStateComponent",
              ["pbDataId", e],
            )
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Plot",
            7,
            "[ FlowActionChangeEntityPerformanceState] 找不到对应的Entity",
            ["pbDataId", e],
            ["Type", i.Type],
          );
    }
  }
  K$i() {
    let e = void 0;
    switch (this.Context.Context.Type) {
      case 1:
        var t = this.Context.Context;
        e = t.EntityId;
        break;
      case 5:
        t = this.Context.Context;
        e = t.TriggerEntityId;
    }
    return e;
  }
}
exports.FlowActionChangeEntityPerformanceState =
  FlowActionChangeEntityPerformanceState;
//# sourceMappingURL=FlowActionChangeEntityPerformanceState.js.map
