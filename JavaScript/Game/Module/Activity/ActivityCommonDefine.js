"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.taskStateResolver =
    exports.activityViewStateSequence =
    exports.ACTIVITYFIRSTUNLOCKFLAG =
      void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
(exports.ACTIVITYFIRSTUNLOCKFLAG = -100),
  (exports.activityViewStateSequence = {
    [0]: ["SideIn", "SideOut"],
    1: ["GlobalIn", "GlobalOut"],
  }),
  (exports.taskStateResolver = {
    [Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskRunning]: 1,
    [Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskFinish]: 0,
    [Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskTaken]: 2,
  });
//# sourceMappingURL=ActivityCommonDefine.js.map
