"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPatrolPerformanceQuery extends TsTaskAbortImmediatelyBase_1.default {
  ReceiveExecuteAI(e, r) {
    var o, s, t;
    e instanceof TsAiController_1.default
      ? (s = e.AiController?.AiPatrol) &&
        ((t = (o = e.AiController.CharActorComp.Entity).GetComponent(17)),
        (o = o.GetComponent(185)),
        t) &&
        o
        ? (t.ClearLastPerformanceTag(),
          (s = s.GetNextPerformanceTag())
            ? t.AddPerformanceTag(s)
            : o.HasTag((t = -1645015979)) && o.RemoveTag(t),
          this.Finish(!0))
        : this.Finish(!1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        this.Finish(!1));
  }
}
exports.default = TsTaskPatrolPerformanceQuery;
//# sourceMappingURL=TsTaskPatrolPerformanceQuery.js.map
