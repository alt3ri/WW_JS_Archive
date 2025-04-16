"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSetNowTime extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = ""),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = "");
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKey = this.BlackboardKey));
  }
  ReceiveTickAI(e, s, t) {
    var r,
      o = e.AiController;
    o
      ? (this.InitTsVariables(),
        this.TsBlackboardKey &&
          ((o = o.CharActorComp.Entity.Id),
          (r = Time_1.Time.WorldTime),
          ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(
            o,
            this.TsBlackboardKey,
            r,
          )),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
}
exports.default = TsTaskSetNowTime;
//# sourceMappingURL=TsTaskSetNowTime.js.map
