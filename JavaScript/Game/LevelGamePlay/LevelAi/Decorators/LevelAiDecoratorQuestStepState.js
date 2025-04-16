"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiDecoratorQuestStepState = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorQuestStepState extends LevelAiDecorator_1.LevelAiDecorator {
  constructor() {
    super(...arguments),
      (this.fIe = (e) => {
        var t = this.Params;
        t &&
          e &&
          t.QuestId === e.TreeConfigId &&
          t.ChildQuestId === e.NodeId &&
          ((t = this.CheckCondition(1)), this.NotifyEventBasedCondition(t));
      });
  }
  OnExecutionStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
      this.fIe,
    );
  }
  OnExecutionFinish() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
      this.fIe,
    );
  }
  CheckCondition(e) {
    var t = this.Params;
    if (!t) return !1;
    let r = !1;
    switch (
      ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t.QuestId)
    ) {
      case 0:
      case 1:
        r = !1;
        break;
      case 3:
        r = !0;
        break;
      case 2:
        var n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          t.QuestId,
        )?.GetNode(t.ChildQuestId);
        r = n?.IsSuccess ?? !1;
    }
    return "Eq" === (t.Compare ?? "Eq") ? r : !r;
  }
}
exports.LevelAiDecoratorQuestStepState = LevelAiDecoratorQuestStepState;
//# sourceMappingURL=LevelAiDecoratorQuestStepState.js.map
