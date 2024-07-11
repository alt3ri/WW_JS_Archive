"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckEntityStateNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class CheckEntityStateNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.xQt = void 0), (this.PQt = []);
  }
  get CorrelativeEntities() {
    return this.PQt;
  }
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if (e.Type !== "CheckEntityState") return !1;
    if (e.Conditions) {
      this.PQt = [];
      for (const t of e.Conditions) this.PQt.push(t.EntityId);
    }
    return (this.TrackTextRuleInner = 1), !0;
  }
  OnUpdateProgress(e) {
    return !!e.Yfs && ((this.xQt = e.Yfs), !0);
  }
  GetProgress() {
    return this.xQt?.rkn?.length.toString() ?? "0";
  }
  GetProgressMax() {
    return this.PQt?.length.toString() ?? "0";
  }
}
exports.CheckEntityStateNode = CheckEntityStateNode;
// # sourceMappingURL=CheckEntityStateNode.js.map
