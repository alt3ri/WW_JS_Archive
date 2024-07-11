"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiDecoratorQuestStepState = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorQuestStepState extends LevelAiDecorator_1.LevelAiDecorator {
  constructor() {
    super(...arguments),
      (this.fIe = (e) => {
        let t = this.Params;
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
    let t;
    const r = this.Params;
    return (
      !!r &&
      (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r.QuestId) ===
        3 ||
        (!!(t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          r.QuestId,
        )) &&
          (t.GetNode(r.ChildQuestId)?.IsSuccess ?? !1)))
    );
  }
}
exports.LevelAiDecoratorQuestStepState = LevelAiDecoratorQuestStepState;
// # sourceMappingURL=LevelAiDecoratorQuestStepState.js.map
