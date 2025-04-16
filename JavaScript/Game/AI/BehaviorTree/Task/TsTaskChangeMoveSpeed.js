"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeMoveSpeed extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MoveSpeed = 0),
      (this.ResetDefault = !1),
      (this.IsInitTsVariables = !1),
      (this.TsMoveSpeed = 0),
      (this.TsResetDefault = !1);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsMoveSpeed = 0),
      (this.TsResetDefault = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsMoveSpeed = this.MoveSpeed),
      (this.TsResetDefault = this.ResetDefault));
  }
  ReceiveExecuteAI(s, t) {
    this.InitTsVariables();
    var e,
      i = s.AiController;
    i
      ? ((i = i.CharActorComp) &&
          (i = ActorUtils_1.ActorUtils.GetEntityByActor(i.Actor)) &&
          (e = i.Entity.GetComponent(44)) &&
          (this.TsResetDefault
            ? ((i = i.Entity.GetComponent(173).MoveState), e.ResetMaxSpeed(i))
            : (e.SetMaxSpeed(this.TsMoveSpeed), e.SetSpeedLock())),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            s.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
}
exports.default = TsTaskChangeMoveSpeed;
//# sourceMappingURL=TsTaskChangeMoveSpeed.js.map
