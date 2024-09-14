"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskExecuteEvent extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments), (this.EventGroupId = 0), (this.IsInitTsVariables = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      (this.IsInitTsVariables = !0);
  }
  ReceiveExecuteAI(e, s) {
    this.InitTsVariables(),
      e.AiController
        ? this.FinishExecute(!0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
              "Type",
              e.GetClass().GetName(),
            ]),
          this.FinishExecute(!1));
  }
}
exports.default = TsTaskExecuteEvent;
//# sourceMappingURL=TsTaskExecuteEvent.js.map
