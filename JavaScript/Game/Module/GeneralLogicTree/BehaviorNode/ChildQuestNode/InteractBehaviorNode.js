"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractBehaviorNode = void 0);
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeConfigUtil_1 = require("../../GeneralLogicTreeConfigUtil"),
  ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class InteractBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments),
      (this.fKs = []),
      (this.xXt = void 0),
      (this.PXt = []),
      (this.VA_ = !1);
  }
  get AlwaysFalseChildNode() {
    return this.VA_;
  }
  get OccupationInfo() {
    if (this.VA_ && this.fKs.length)
      return this.Blackboard?.GetSpecRefOccupiedEntityText(this.fKs);
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    var t = e,
      t =
        ((this.VA_ =
          GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.IsAlwaysFalseChildNode(
            this.TreeIncId,
            t.ParentNodeId,
          )),
        e.Condition);
    if (t.Type !== IQuest_1.EChildQuest.DoInteract) return !1;
    if (!t.AddOptions) return !1;
    (this.TrackTextRuleInner = 1), (this.PXt = []);
    for (const i of t.AddOptions) {
      this.PXt.push(i.EntityId);
      var r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
        i.EntityId,
      );
      r &&
        (r = (0, IComponent_1.getComponent)(
          r.ComponentsData,
          "BaseInfoComponent",
        )) &&
        r.Occupation &&
        this.fKs.push(r.Occupation);
    }
    return !0;
  }
  OnStart() {
    if (!this.VA_ || !this.fKs.length)
      for (const e of this.fKs)
        this.Blackboard.AddRefOccupationId(this.NodeId, e);
  }
  OnEnd() {
    if (!this.VA_)
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
