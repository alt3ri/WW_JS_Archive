"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventToggleScanSplineEffect = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const QuestController_1 = require("../../Module/QuestNew/Controller/QuestController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleScanSplineEffect extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      (o.Type === 6 &&
        o.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 32, "该事件仅用于任务行为树内配置"));
      const r = o;
      const t = e;
      switch (t.Type) {
        case IAction_1.ETraceSplineOptionType.Open:
          var l = t;
          QuestController_1.QuestNewController.AddQuestTraceEffect(
            r.TreeConfigId,
            l.Duration,
            l.SplineEntityId,
          );
          break;
        case IAction_1.ETraceSplineOptionType.Close:
          l = t;
          QuestController_1.QuestNewController.RemoveQuestTraceEffect(
            r.TreeConfigId,
            l.SplineEntityId,
          );
      }
    } else
      Log_1.Log.CheckError() && Log_1.Log.Error("Event", 32, "参数配置错误");
  }
}
exports.LevelEventToggleScanSplineEffect = LevelEventToggleScanSplineEffect;
// # sourceMappingURL=LevelEventsToggleScanSplineEffect.js.map
