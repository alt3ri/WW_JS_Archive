"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventEnableSplineMoveModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const CHECK_BASE_CHARACTER_INTERVAL = 500;
class LevelEventEnableSplineMoveModel extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.lVs = void 0),
      (this._Vs = new Array()),
      (this.uVs = () => {
        if (Global_1.Global.BaseCharacter?.IsValid()) {
          TimerSystem_1.TimerSystem.Remove(this.lVs), (this.lVs = void 0);
          for (const [e, t] of this._Vs) this.ExecuteNew(e, t);
          this._Vs.length = 0;
        }
      });
  }
  ExecuteNew(t, i) {
    if (t) {
      let r;
      const n = t.Config;
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
              this._Vs.push([t, i]),
              void (
                this.lVs ||
                (this.lVs = TimerSystem_1.TimerSystem.Forever(
                  this.uVs,
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
      var o = e?.GetComponent(95);
      o?.Valid
        ? (n.Type === "Open"
            ? o.StartSplineMove(n.SplineEntityId, n)
            : o.EndSplineMove(n.SplineEntityId),
          this.FinishExecute(!0))
        : this.FinishExecute(!1);
    } else this.FinishExecute(!1);
  }
}
exports.LevelEventEnableSplineMoveModel = LevelEventEnableSplineMoveModel;
// # sourceMappingURL=LevelEventEnableSplineMoveModel.js.map
