"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardTargetData = void 0);
const Protocol_1 = require("../../../../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder"),
  TaskData_1 = require("../../../../Common/TaskItem/TaskData"),
  taskStateResolver = {
    [Protocol_1.Aki.Protocol.G8s.Proto_TrackMoonTargetRunning]: 1,
    [Protocol_1.Aki.Protocol.G8s.Proto_TrackMoonTargetFinish]: 0,
    [Protocol_1.Aki.Protocol.G8s.Proto_TrackMoonTargetTaken]: 2,
  };
class RewardTargetData {
  constructor(t) {
    (this.Id = t),
      (this.Status = Protocol_1.Aki.Protocol.G8s.Proto_TrackMoonTargetRunning),
      (this.JGn = new TaskData_1.TaskData()),
      (this.Current = 0),
      (this.Target = 1);
  }
  IsFinished() {
    return (
      this.Status === Protocol_1.Aki.Protocol.G8s.Proto_TrackMoonTargetFinish
    );
  }
  IsTaken() {
    return (
      this.Status === Protocol_1.Aki.Protocol.G8s.Proto_TrackMoonTargetTaken
    );
  }
  GetRewardList() {
    var t,
      r,
      e =
        ConfigManager_1.ConfigManager.MoonChasingRewardConfig.GetRewardTargetById(
          this.Id,
        ),
      o = [];
    for ([t, r] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
      e.TargetReward,
    ).DropPreview)
      o.push([{ ItemId: t, IncId: 0 }, r]);
    return o;
  }
  ConvertToTaskData() {
    var t =
      ConfigManager_1.ConfigManager.MoonChasingRewardConfig.GetRewardTargetById(
        this.Id,
      );
    return (
      (this.JGn.TaskId = this.Id),
      (this.JGn.IsFinished = this.IsFinished()),
      (this.JGn.IsTaken = this.IsTaken()),
      (this.JGn.Status = taskStateResolver[this.Status]),
      (this.JGn.RewardList = this.GetRewardList()),
      (this.JGn.Current = this.Current),
      (this.JGn.Target = this.Target),
      (this.JGn.JumpId = t.TargetFunc),
      (this.JGn.TitleTextId = t.TargetName),
      (this.JGn.ReceiveDelegate =
        ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonTargetRewardRequest),
      this.JGn
    );
  }
}
exports.RewardTargetData = RewardTargetData;
//# sourceMappingURL=RewardTargetData.js.map
