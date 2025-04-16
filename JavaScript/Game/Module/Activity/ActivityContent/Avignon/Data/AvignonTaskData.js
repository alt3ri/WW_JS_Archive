"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AvignonTaskData = void 0);
class AvignonTaskData {
  constructor(s) {
    (this.TaskId = s),
      (this.Status = 1),
      (this.Current = 0),
      (this.Target = 0),
      (this.JumpId = 0),
      (this.TitleTextId = ""),
      (this.RewardList = []),
      (this.ReceiveDelegate = void 0);
  }
  get IsFinished() {
    return 1 !== this.Status;
  }
  get IsTaken() {
    return 2 === this.Status;
  }
}
exports.AvignonTaskData = AvignonTaskData;
//# sourceMappingURL=AvignonTaskData.js.map
