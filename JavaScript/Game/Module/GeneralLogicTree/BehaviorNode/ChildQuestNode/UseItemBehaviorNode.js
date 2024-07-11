"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UseItemBehaviorNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class UseItemBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.xXt = void 0);
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      "UseItem" === e.Condition.Type &&
      ((this.TrackTextRuleInner = 1), !0)
    );
  }
  OnUpdateProgress(e) {
    return !!e.LVn && ((this.xXt = e.LVn), !0);
  }
  GetProgress() {
    return this.xXt?.o9n?.toString() ?? "0";
  }
}
exports.UseItemBehaviorNode = UseItemBehaviorNode;
//# sourceMappingURL=UseItemBehaviorNode.js.map
