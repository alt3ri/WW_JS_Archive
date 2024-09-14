"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckEntityStateNode = void 0);
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CheckEntityStateNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.xXt = void 0), (this.PXt = []);
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.CheckEntityState) return !1;
    if (e.Conditions) {
      this.PXt = [];
      for (const t of e.Conditions) this.PXt.push(t.EntityId);
    }
    return (this.TrackTextRuleInner = 1), !0;
  }
  OnUpdateProgress(e) {
    return !!e.MEs && ((this.xXt = e.MEs), !0);
  }
  GetProgress() {
    return this.xXt?.F4n?.length.toString() ?? "0";
  }
  GetProgressMax() {
    return this.PXt?.length.toString() ?? "0";
  }
}
exports.CheckEntityStateNode = CheckEntityStateNode;
//# sourceMappingURL=CheckEntityStateNode.js.map
