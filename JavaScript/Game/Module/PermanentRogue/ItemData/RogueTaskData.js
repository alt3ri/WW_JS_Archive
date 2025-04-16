"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueEndingTaskData = exports.RogueTaskData = void 0);
const RogueResTaskById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTaskById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class RogueTaskData {
  constructor(e) {
    (this.Id = e),
      (this.Status = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning),
      (this.Current = 0),
      (this.Target = 1);
  }
  IsFinished() {
    return this.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish;
  }
  IsTaken() {
    return this.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
  }
  GetRewardList() {
    var e,
      o,
      t = RogueResTaskById_1.configRogueResTaskById.GetConfig(this.Id),
      r = [];
    for ([e, o] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
      t.Award,
    ).DropPreview)
      r.push([{ ItemId: e, IncId: 0 }, o]);
    return r;
  }
}
exports.RogueTaskData = RogueTaskData;
class RogueEndingTaskData {
  constructor(e) {
    (this.Id = e),
      (this.Status = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning),
      (this.Current = 0),
      (this.Target = 1);
  }
  IsFinished() {
    return this.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish;
  }
  IsTaken() {
    return this.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken;
  }
  GetRewardList() {
    var e,
      o,
      t = RogueResTaskById_1.configRogueResTaskById.GetConfig(this.Id),
      r = [];
    for ([e, o] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
      t.Award,
    ).DropPreview)
      r.push([{ ItemId: e, IncId: 0 }, o]);
    return r;
  }
}
exports.RogueEndingTaskData = RogueEndingTaskData;
//# sourceMappingURL=RogueTaskData.js.map
