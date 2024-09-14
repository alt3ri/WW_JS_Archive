"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityConditionGroupData =
    exports.taskStateResolver =
    exports.activityViewStateSequence =
    exports.ACTIVITYFIRSTUNLOCKFLAG =
      void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
(exports.ACTIVITYFIRSTUNLOCKFLAG = -100),
  (exports.activityViewStateSequence = {
    [0]: ["SideIn", "SideOut"],
    1: ["GlobalIn", "GlobalOut"],
  }),
  (exports.taskStateResolver = {
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning]: 1,
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish]: 0,
    [Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken]: 2,
  });
class ActivityConditionGroupData extends UiPopViewData_1.UiPopViewData {
  constructor(o) {
    super(), (this.ActivityId = o);
  }
}
exports.ActivityConditionGroupData = ActivityConditionGroupData;
//# sourceMappingURL=ActivityCommonDefine.js.map
