"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckLevelPlayBehaviorNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CheckLevelPlayBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.xXt = -0);
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      "CheckLevelPlay" === e.Condition.Type &&
      ((this.xXt = 0), (this.TrackTextRuleInner = 1), !0)
    );
  }
  OnUpdateProgress(e) {
    return (this.xXt = e._Es ?? 0), !0;
  }
  GetProgress() {
    return this.xXt.toString();
  }
}
exports.CheckLevelPlayBehaviorNode = CheckLevelPlayBehaviorNode;
//# sourceMappingURL=CheckLevelPlayBehaviorNode.js.map
