"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimerNode = void 0);
const IQuest_1 = require("../../UniverseEditor/Interface/IQuest"),
  ChildQuestNodeBase_1 = require("./GeneralLogicTree/BehaviorNode/ChildQuestNode/ChildQuestNodeBase");
class TimerNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.TimerUiConfig = void 0);
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      (e = e.Condition).Type === IQuest_1.EChildQuest.Timer &&
      ((this.TimerUiConfig = e.UiConfig), !0)
    );
  }
}
exports.TimerNode = TimerNode;
//# sourceMappingURL=TimerNode.js.map
