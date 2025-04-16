"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSpawnTraceEffect = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSpawnTraceEffect extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.FRe = 0);
  }
  ExecuteNew(e, o) {
    e
      ? 6 !== o.Type ||
        o.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 18, "该事件仅用于任务行为树内配置")
        : (this.FRe = o.TreeConfigId)
      : Log_1.Log.CheckError() && Log_1.Log.Error("Event", 33, "参数配置错误");
  }
  OnReset() {
    ControllerHolder_1.ControllerHolder.QuestNewController.ClearQuestTraceEffect(
      this.FRe,
    );
  }
}
exports.LevelEventSpawnTraceEffect = LevelEventSpawnTraceEffect;
//# sourceMappingURL=LevelEventSpawnTraceEffect.js.map
