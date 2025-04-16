"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAddBuffClientPrePerformance = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActiveBuffConfigs_1 = require("../../NewWorld/Character/Common/Component/Abilities/Buff/ActiveBuffConfigs"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddBuffClientPrePerformance extends LevelGeneralBase_1.LevelEventBase {
  GetTriggerEntity(e) {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityById(
      e.TriggerEntityId,
    );
  }
  GetOtherEntity(e) {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityById(
      e.OtherEntityId,
    );
  }
  GetDebugName() {
    return this.constructor.name;
  }
  GetPreMessageId(e) {
    var t = e.Entity.GetComponent(246);
    return t?.Valid
      ? t.ClientPrePerformancePreMessageId
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            72,
            `[${this.GetDebugName()}] 触发器所属实体获取ClientTriggerComponent失败`,
            ["entityHandle", e],
            ["clientTriggerComponent", t],
          ),
        BigInt(0));
  }
  ExecuteNew(e, t) {
    if (5 === t.Type) {
      var r = this.GetTargetEntity(t);
      if (r?.Valid) {
        var n = this.GetTriggerEntity(t);
        if (n?.Valid) {
          var o = this.GetPreMessageId(n);
          if (o) {
            var i = r.Entity.GetComponent(207);
            if (i?.Valid)
              for (const s of this.GetBuffIds(e))
                i.AddBuff(s, {
                  InstigatorId: n.CreatureDataId,
                  Level: ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL,
                  PreMessageId: o,
                  Reason: `[${this.GetDebugName()}] ExecuteNew`,
                });
            else
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "LevelEvent",
                  72,
                  `[${this.GetDebugName()}] 获取 BuffComponent失败`,
                  ["buffComponent", i],
                  ["targetEntityHandle", r],
                );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                72,
                `[${this.GetDebugName()}] 获取PreMessageId失败`,
                ["preMessageId", o],
              );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              72,
              `[${this.GetDebugName()}] 触发器组件所属实体不存在或者无效`,
              ["triggerEntityHandle", n],
            );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            72,
            `[${this.GetDebugName()}] 加Buff的目标实体不存在或者无效`,
            ["targetEntityHandle", r],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          72,
          `[${this.GetDebugName()}] 未支持的context.Type`,
          ["context", t],
        );
  }
}
exports.LevelEventAddBuffClientPrePerformance =
  LevelEventAddBuffClientPrePerformance;
//# sourceMappingURL=LevelEventAddBuffClientPrePerformance.js.map
