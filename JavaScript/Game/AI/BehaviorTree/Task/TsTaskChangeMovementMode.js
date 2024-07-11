"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeMovementMode extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MovementMode = 0),
      (this.IsInitTsVariables = !1),
      (this.TsMovementMode = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsMovementMode = this.MovementMode));
  }
  ReceiveExecuteAI(e, s) {
    this.InitTsVariables();
    let t = e.AiController;
    t
      ? ((t = t.CharActorComp) &&
          (t = ActorUtils_1.ActorUtils.GetEntityByActor(t.Actor)) &&
          (t = t.Entity.GetComponent(36)) &&
          t.CharacterMovement.SetMovementMode(this.TsMovementMode),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
}
exports.default = TsTaskChangeMovementMode;
// # sourceMappingURL=TsTaskChangeMovementMode.js.map
