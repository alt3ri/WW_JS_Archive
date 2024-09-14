"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractBehaviorNode = void 0);
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class InteractBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.fKs = []), (this.xXt = void 0), (this.PXt = []);
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if (e.Type !== IQuest_1.EChildQuest.DoInteract) return !1;
    if (!e.AddOptions) return !1;
    (this.TrackTextRuleInner = 1), (this.PXt = []);
    for (const r of e.AddOptions) {
      this.PXt.push(r.EntityId);
      var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
        r.EntityId,
      );
      t &&
        (t = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "BaseInfoComponent",
        )) &&
        t.Occupation &&
        this.fKs.push(t.Occupation);
    }
    return !0;
  }
  OnStart() {
    for (const e of this.fKs)
      this.Blackboard.AddRefOccupationId(this.NodeId, e);
  }
  OnEnd() {
    for (const e of this.fKs)
      this.Blackboard.RemoveRefOccupationId(this.NodeId, e);
  }
  OnUpdateProgress(e) {
    return (
      !!e.vEs &&
      ((this.xXt = e.vEs.TEs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeEntityInteractFinished,
        this.NodeId,
        this.xXt,
      ),
      !0)
    );
  }
  GetProgress() {
    return this.xXt?.length.toString() ?? "0";
  }
  GetProgressMax() {
    return this.PXt?.length.toString() ?? "0";
  }
}
exports.InteractBehaviorNode = InteractBehaviorNode;
//# sourceMappingURL=InteractBehaviorNode.js.map
