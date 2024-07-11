"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterCreatorBehaviorNode = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class MonsterCreatorBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments),
      (this.YXt = 0),
      (this.JXt = 0),
      (this.PXt = []),
      (this.zXt = !1),
      (this.ZXt = void 0);
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if ("MonsterCreator" !== e.Type || !e.MonsterCreatorEntityIds) return !1;
    (this.TrackTextRuleInner = 1), (this.PXt = []);
    for (const t of e.MonsterCreatorEntityIds) this.PXt.push(t);
    return (
      (this.zXt = e.ShowMonsterMergedHpBar ?? !1),
      (this.ZXt = e.TidMonsterGroupName),
      !(this.YXt = 0)
    );
  }
  OnUpdateProgress(e) {
    if (!e.lEs) return !1;
    (this.YXt = 0), (this.JXt = e.lEs.fEs);
    for (const t of e.lEs.SEs)
      (this.YXt += t.yEs.length),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.GeneralLogicTreeEntityKilled,
          this.NodeId,
          t.yEs,
        );
    return !0;
  }
  GetProgress() {
    return this.YXt.toString();
  }
  GetProgressMax() {
    return this.JXt.toString();
  }
  GetShowMonsterMergedHpBar() {
    return this.zXt;
  }
  GetTidMonsterGroupName() {
    return this.ZXt;
  }
  GetTest() {
    return this.PXt;
  }
}
exports.MonsterCreatorBehaviorNode = MonsterCreatorBehaviorNode;
//# sourceMappingURL=MonsterCreatorBehaviorNode.js.map
