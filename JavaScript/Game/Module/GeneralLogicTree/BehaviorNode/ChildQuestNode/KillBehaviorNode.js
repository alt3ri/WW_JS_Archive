"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KillBehaviorNode = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class KillBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.xXt = void 0), (this.PXt = []), (this.$Xt = 0);
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if ("Kill" !== e.Type) return !1;
    (this.TrackTextRuleInner = 1), (this.PXt = []);
    for (const t of e.ExistTargets) this.PXt.push(t);
    for (const s of e.TargetsToAwake) this.PXt.push(s);
    return (this.$Xt = e.ExistTargets.length + e.TargetsToAwake.length), !0;
  }
  OnUpdateProgress(e) {
    return (
      !!e.aEs &&
      ((this.xXt = e.aEs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeEntityKilled,
        this.NodeId,
        this.xXt.mEs,
      ),
      !0)
    );
  }
  GetProgress() {
    return this.IsSuccess
      ? this.GetProgressMax()
      : this.xXt?.mEs?.length.toString() ?? "0";
  }
  GetProgressMax() {
    return this.xXt ? this.xXt?.fEs?.toString() ?? "0" : this.$Xt.toString();
  }
}
exports.KillBehaviorNode = KillBehaviorNode;
//# sourceMappingURL=KillBehaviorNode.js.map
