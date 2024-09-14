"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventEnableSplineMoveModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine"),
  CHECK_BASE_CHARACTER_INTERVAL = 500;
class LevelEventEnableSplineMoveModel extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.dea = void 0),
      (this.Cea = new Array()),
      (this.gea = () => {
        if (Global_1.Global.BaseCharacter?.IsValid()) {
          TimerSystem_1.TimerSystem.Remove(this.dea), (this.dea = void 0);
          for (var [e, t] of this.Cea) this.ExecuteNew(e, t);
          this.Cea.length = 0;
        }
      });
  }
  ExecuteNew(t, i) {
    if (t) {
      var r,
        n = t.Config;
      i instanceof LevelGeneralContextDefine_1.TriggerContext &&
        ((o = i.TriggerEntityId
          ? EntitySystem_1.EntitySystem.Get(i.TriggerEntityId)
          : void 0),
        (r = i.OtherEntityId
          ? EntitySystem_1.EntitySystem.Get(i.OtherEntityId)
          : void 0),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "LevelEvent",
          40,
          "EnableSplineMoveModel: Trigger触发",
          ["TargetType", n.Target.Type],
          ["SplineMoveType", n.Type],
          ["SplineEntityId", n.SplineEntityId],
          ["TriggerEntity", o?.GetComponent(0)?.GetPbDataId()],
          ["OtherEntity", r?.GetComponent(0)?.GetPbDataId()],
        );
      let e = void 0;
      switch (n.Target.Type) {
        case "Triggered":
          if (i instanceof LevelGeneralContextDefine_1.TriggerContext) {
            if ((e = EntitySystem_1.EntitySystem.Get(i.OtherEntityId))?.Valid)
              break;
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                6,
                "EnableSplineMoveModel: 未找到合法的触发者实体",
                ["Type", n.Target.Type],
                ["ContextType", i.Type],
              );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                6,
                "EnableSplineMoveModel: Triggered类型必须对应TriggerContext",
                ["Type", n.Target.Type],
                ["ContextType", i.Type],
              );
          return void this.FinishExecute(!1);
        case "Player":
          if (!Global_1.Global.BaseCharacter?.IsValid())
            return (
              this.Cea.push([t, i]),
              void (
                this.dea ||
                (this.dea = TimerSystem_1.TimerSystem.Forever(
                  this.gea,
                  CHECK_BASE_CHARACTER_INTERVAL,
                ))
              )
            );
          e = Global_1.Global.BaseCharacter.GetEntityNoBlueprint();
          break;
        default:
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                6,
                "EnableSplineMoveModel不接受此对象类型",
                ["Type", n.Target.Type],
              ),
            void this.FinishExecute(!1)
          );
      }
      var o = e?.GetComponent(98);
      o?.Valid
        ? ("Open" === n.Type
            ? o.StartSplineMove(n.SplineEntityId, n)
            : o.EndSplineMove(n.SplineEntityId),
          this.FinishExecute(!0))
        : this.FinishExecute(!1);
    } else this.FinishExecute(!1);
  }
}
exports.LevelEventEnableSplineMoveModel = LevelEventEnableSplineMoveModel;
//# sourceMappingURL=LevelEventEnableSplineMoveModel.js.map
