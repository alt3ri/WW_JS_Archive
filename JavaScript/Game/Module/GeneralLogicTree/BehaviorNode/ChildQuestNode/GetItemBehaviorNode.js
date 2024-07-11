"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GetItemBehaviorNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class GetItemBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.xXt = void 0), (this.KXt = 0);
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      "GetItem" === e.Condition.Type &&
      ((this.KXt = e.Condition.Items.length), (this.TrackTextRuleInner = 1), !0)
    );
  }
  OnUpdateProgress(e) {
    return (this.xXt = e.hEs), !0;
  }
  GetProgress() {
    return this.KXt.toString();
  }
  GetProgressMax() {
    return this.xXt?.FVn?.length.toString() ?? "0";
  }
}
exports.GetItemBehaviorNode = GetItemBehaviorNode;
//# sourceMappingURL=GetItemBehaviorNode.js.map
