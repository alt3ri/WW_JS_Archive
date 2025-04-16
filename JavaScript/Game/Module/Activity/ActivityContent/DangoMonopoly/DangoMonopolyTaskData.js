"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyTaskData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Macro_1 = require("../../../../../Core/Preprocessor/Macro"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
class DangoMonopolyTaskData {
  constructor(t) {
    (this.Id = 0),
      (this.TaskType = 0),
      (this.TaskDesc = ""),
      (this.RewardItemId = 0),
      (this.RewardItemCount = 0),
      (this.TaskState = Protocol_1.Aki.Protocol.DAc.Proto_NotCompleted),
      (this.EndTime = 0),
      (this.Progress = 0),
      (this.TotalProgress = 0),
      (this.Sort = 0),
      (this.Source = 0),
      (this.Id = t);
  }
  static Create(t) {
    if (this.V4c.length) {
      const o = this.V4c.shift();
      return o.AU(t), o;
    }
    const o = new DangoMonopolyTaskData(t.TaskId);
    return o.AU(t), o;
  }
  Recycle() {
    DangoMonopolyTaskData.V4c.push(this);
  }
  AU(t) {
    (this.Id = t.TaskId),
      (this.TaskType = t.TaskType),
      (this.TaskDesc = t.Desc),
      (this.RewardItemId = t.ItemId),
      (this.RewardItemCount = t.ItemNum),
      (this.Sort = t.Sort),
      (this.Source = t.Source);
  }
  ProtoUpdateData(t) {
    (this.TaskState = t.Y4n),
      (this.Progress = t.nvs),
      (this.TotalProgress = t.j6n);
  }
  GetTaskStateSort() {
    return this.TaskState === Protocol_1.Aki.Protocol.DAc.Proto_Completed
      ? 0
      : this.TaskState === Protocol_1.Aki.Protocol.DAc.Proto_NotCompleted
        ? 1
        : 2;
  }
  GetSortResult(t) {
    return this.TaskState !== t.TaskState
      ? this.GetTaskStateSort() - t.GetTaskStateSort()
      : this.Sort - t.Sort;
  }
  JumpSource() {
    this.Source && SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Source);
  }
  IsCanReceive() {
    return this.TaskState === Protocol_1.Aki.Protocol.DAc.Proto_Completed;
  }
  SetEndTime(t) {
    this.EndTime = t;
  }
}
(exports.DangoMonopolyTaskData = DangoMonopolyTaskData).V4c = [];
//# sourceMappingURL=DangoMonopolyTaskData.js.map
