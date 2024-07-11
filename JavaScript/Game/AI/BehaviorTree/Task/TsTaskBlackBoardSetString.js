"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskBlackBoardSetString extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.StringName = ""),
      (this.StringValue = ""),
      (this.IsInitTsVariables = !1),
      (this.TsStringName = ""),
      (this.TsStringValue = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsStringName = this.StringName),
      (this.TsStringValue = this.StringValue));
  }
  ReceiveExecuteAI(e, t) {
    var s = e.AiController;
    s
      ? (this.InitTsVariables(),
        (s = s.CharActorComp.Entity.Id),
        BlackboardController_1.BlackboardController.SetStringValueByEntity(
          s,
          this.TsStringName,
          this.TsStringValue,
        ),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
}
exports.default = TsTaskBlackBoardSetString;
//# sourceMappingURL=TsTaskBlackBoardSetString.js.map
