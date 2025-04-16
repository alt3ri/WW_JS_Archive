"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsDecoratorQuestStepStateCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.QuestId = 0),
      (this.ChildQuestId = 0),
      (this.CheckType = 0),
      (this.IsInitTsVariables = !1),
      (this.TsQuestId = 0),
      (this.TsChildQuestId = 0),
      (this.TsCheckType = 0);
  }
  Constructor() {
    (this.IsInitTsVariables = !1),
      (this.TsQuestId = 0),
      (this.TsChildQuestId = 0),
      (this.TsCheckType = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsQuestId = this.QuestId),
      (this.TsChildQuestId = this.ChildQuestId),
      (this.TsCheckType = this.CheckType));
  }
  PerformConditionCheckAI(t, e) {
    if (!t.AiController)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    if ((this.InitTsVariables(), !this.TsQuestId || !this.TsChildQuestId))
      return !1;
    let s = !1;
    switch (
      ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.TsQuestId)
    ) {
      case 0:
      case 1:
        s = !1;
        break;
      case 3:
        s = !0;
        break;
      case 2:
        var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          this.TsQuestId,
        )?.GetNode(this.TsChildQuestId);
        s = r?.IsSuccess ?? !1;
    }
    return 0 === this.TsCheckType ? s : !s;
  }
}
exports.default = TsDecoratorQuestStepStateCheck;
//# sourceMappingURL=TsDecoratorQuestStepStateCheck.js.map
