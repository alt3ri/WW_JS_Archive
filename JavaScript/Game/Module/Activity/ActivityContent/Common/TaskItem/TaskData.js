"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskData = void 0);
class TaskData {
  constructor() {
    (this.TaskId = 0),
      (this.Status = 1),
      (this.IsFinished = !1),
      (this.IsTaken = !1),
      (this.DoingTextId = ""),
      (this.JumpId = 0),
      (this.Current = 0),
      (this.Target = 0),
      (this.TitleTextId = ""),
      (this.RewardList = []),
      (this.ReceiveDelegate = void 0);
  }
  DeepCopy(s) {
    var t = new TaskData();
    return (
      (t.TaskId = s.TaskId),
      (t.Status = s.Status),
      (t.IsFinished = s.IsFinished),
      (t.IsTaken = s.IsTaken),
      (t.DoingTextId = s.DoingTextId),
      (t.JumpId = s.JumpId),
      (t.Current = s.Current),
      (t.Target = s.Target),
      (t.TitleTextId = s.TitleTextId),
      (t.RewardList = s.RewardList),
      (t.ReceiveDelegate = s.ReceiveDelegate),
      t
    );
  }
}
exports.TaskData = TaskData;
//# sourceMappingURL=TaskData.js.map
