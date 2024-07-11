"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiDecoratorQuestState = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorQuestState extends LevelAiDecorator_1.LevelAiDecorator {
  constructor() {
    super(...arguments),
      (this.DEe = (e) => {
        var t = this.Params;
        t &&
          t.QuestId === e &&
          ((t = this.CheckCondition(1)), this.NotifyEventBasedCondition(t));
      });
  }
  OnExecutionStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DEe,
    );
  }
  OnExecutionFinish() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnQuestStateChange,
      this.DEe,
    );
  }
  CheckCondition(e) {
    var t = this.Params;
    if (!t) return !1;
    var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t.QuestId);
    let s = !1;
    switch (t.Compare) {
      case "Eq":
        s = r === t.State;
        break;
      case "Ne":
        s = r !== t.State;
        break;
      case "Ge":
        s = r >= t.State;
        break;
      case "Gt":
        s = r > t.State;
        break;
      case "Le":
        s = r <= t.State;
        break;
      case "Lt":
        s = r < t.State;
    }
    return s;
  }
}
exports.LevelAiDecoratorQuestState = LevelAiDecoratorQuestState;
//# sourceMappingURL=LevelAiDecoratorQuestState.js.map
