"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GetItemBehaviorNode = void 0);
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class GetItemBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.xXt = void 0), (this.KXt = 0);
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      e.Condition.Type === IQuest_1.EChildQuest.GetItem &&
      ((this.KXt = e.Condition.Items.length), (this.TrackTextRuleInner = 1), !0)
    );
  }
  OnUpdateProgress(e) {
    return (this.xXt = e.CEs), !0;
  }
  GetProgress() {
    return this.KXt.toString();
  }
  GetProgressMax() {
    return this.xXt?.YVn?.length.toString() ?? "0";
  }
}
exports.GetItemBehaviorNode = GetItemBehaviorNode;
//# sourceMappingURL=GetItemBehaviorNode.js.map
