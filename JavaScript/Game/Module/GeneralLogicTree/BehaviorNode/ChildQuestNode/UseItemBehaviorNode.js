"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UseItemBehaviorNode = void 0);
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class UseItemBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.xXt = void 0);
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      e.Condition.Type === IQuest_1.EChildQuest.UseItem &&
      ((this.TrackTextRuleInner = 1), !0)
    );
  }
  OnUpdateProgress(e) {
    return !!e.bVn && ((this.xXt = e.bVn), !0);
  }
  GetProgress() {
    return this.xXt?.m9n?.toString() ?? "0";
  }
}
exports.UseItemBehaviorNode = UseItemBehaviorNode;
//# sourceMappingURL=UseItemBehaviorNode.js.map
