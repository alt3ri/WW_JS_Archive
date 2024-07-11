"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskWriteEntityId extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.BlackboardKeyTarget = ""),
      (this.BlackboardKeyWriteTo = ""),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyTarget = ""),
      (this.TsBlackboardKeyWriteTo = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKeyTarget = this.BlackboardKeyTarget),
      (this.TsBlackboardKeyWriteTo = this.BlackboardKeyWriteTo));
  }
  ReceiveTickAI(e, r, t) {
    const s = e.AiController;
    if (s)
      if ((this.InitTsVariables(), this.TsBlackboardKeyTarget)) {
        let e = 0;
        if (this.TsBlackboardKeyTarget) {
          if (
            !(e =
              BlackboardController_1.BlackboardController.GetEntityIdByEntity(
                s.CharAiDesignComp.Entity.Id,
                this.TsBlackboardKeyTarget,
              ))
          )
            return void this.FinishExecute(!1);
          if (
            !(
              ModelManager_1.ModelManager.CreatureModel.GetEntityById(
                e,
              )?.Entity?.GetComponent(1)?.Owner instanceof
              TsBaseCharacter_1.default
            )
          )
            return void this.FinishExecute(!1);
        }
        BlackboardController_1.BlackboardController.SetEntityIdByEntity(
          e,
          this.TsBlackboardKeyWriteTo,
          s.CharAiDesignComp.Entity.Id,
        ),
          this.FinishExecute(!0);
      } else this.FinishExecute(!1);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
}
exports.default = TsTaskWriteEntityId;
// # sourceMappingURL=TsTaskWriteEntityId.js.map
