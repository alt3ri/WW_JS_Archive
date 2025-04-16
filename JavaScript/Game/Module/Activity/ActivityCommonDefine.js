"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityConditionGroupData =
    exports.ActivityTaskData =
    exports.taskStateToRewardStateResolver =
    exports.taskStateResolver =
    exports.activityViewStateSequence =
    exports.timeTypeStateResolver =
    exports.REDDOT_TOLERANCE =
    exports.ACTIVITYFIRSTUNLOCKFLAG =
      void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
(exports.ACTIVITYFIRSTUNLOCKFLAG = -100),
  (exports.REDDOT_TOLERANCE = 0.1),
  (exports.timeTypeStateResolver = {
    [Protocol_1.Aki.Protocol.OS_.Proto_TimeLimited]: 0,
    [Protocol_1.Aki.Protocol.OS_.Proto_Permanent]: 1,
  }),
  (exports.activityViewStateSequence = {
    [0]: ["SideIn", "SideOut"],
    1: ["GlobalIn", "GlobalOut"],
  }),
  (exports.taskStateResolver = {
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning]: 1,
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish]: 0,
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken]: 2,
  }),
  (exports.taskStateToRewardStateResolver = { [1]: 0, 0: 1, 2: 2 });
class ActivityTaskData {
  constructor() {
    (this.Id = 0), (this.Current = 0), (this.Target = 1), (this.Status = 1);
  }
  Refresh(t, o) {
    (this.Id = t.s5n), (this.Current = t.lMs), (this.Target = t.j6n);
    var s = this.Status;
    (this.Status = exports.taskStateResolver[t.H6n]),
      o?.(s !== this.Status, s, this.Status);
  }
}
exports.ActivityTaskData = ActivityTaskData;
class ActivityConditionGroupData extends UiPopViewData_1.UiPopViewData {
  constructor(t) {
    super(), (this.ActivityId = t);
  }
}
exports.ActivityConditionGroupData = ActivityConditionGroupData;
//# sourceMappingURL=ActivityCommonDefine.js.map
