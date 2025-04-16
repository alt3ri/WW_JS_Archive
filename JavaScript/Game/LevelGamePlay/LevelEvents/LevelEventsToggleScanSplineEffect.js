"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventToggleScanSplineEffect = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleScanSplineEffect extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      (6 === o.Type &&
        o.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 31, "该事件仅用于任务行为树内配置"));
      var r = o,
        l = e;
      switch (l.Type) {
        case IAction_1.ETraceSplineOptionType.Open:
          var t = l;
          ControllerHolder_1.ControllerHolder.QuestNewController.AddQuestTraceEffect(
            r.TreeConfigId,
            t.Duration,
            t.SplineEntityId,
          );
          break;
        case IAction_1.ETraceSplineOptionType.Close:
          t = l;
          ControllerHolder_1.ControllerHolder.QuestNewController.RemoveQuestTraceEffect(
            r.TreeConfigId,
            t.SplineEntityId,
          );
      }
    } else
      Log_1.Log.CheckError() && Log_1.Log.Error("Event", 31, "参数配置错误");
  }
}
exports.LevelEventToggleScanSplineEffect = LevelEventToggleScanSplineEffect;
//# sourceMappingURL=LevelEventsToggleScanSplineEffect.js.map
