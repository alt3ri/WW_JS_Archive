"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractBehaviorNode = void 0);
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class InteractBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  constructor() {
    super(...arguments), (this.P5s = []), (this.xQt = void 0), (this.PQt = []);
  }
  get CorrelativeEntities() {
    return this.PQt;
  }
  OnCreate(e) {
    if (!super.OnCreate(e)) return !1;
    e = e.Condition;
    if (e.Type !== "DoInteract") return !1;
    if (!e.AddOptions) return !1;
    (this.TrackTextRuleInner = 1), (this.PQt = []);
    for (const r of e.AddOptions) {
      this.PQt.push(r.EntityId);
      let t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
        r.EntityId,
      );
      t &&
        (t = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "BaseInfoComponent",
        )) &&
        t.Occupation &&
        this.P5s.push(t.Occupation);
    }
    return !0;
  }
  OnStart() {
    for (const e of this.P5s)
      this.Blackboard.AddRefOccupationId(this.NodeId, e);
  }
  OnEnd() {
    for (const e of this.P5s)
      this.Blackboard.RemoveRefOccupationId(this.NodeId, e);
  }
  OnUpdateProgress(e) {
    return (
      !!e.Qfs &&
      ((this.xQt = e.Qfs.tvs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeEntityInteractFinished,
        this.NodeId,
        this.xQt,
      ),
      !0)
    );
  }
  GetProgress() {
    return this.xQt?.length.toString() ?? "0";
  }
  GetProgressMax() {
    return this.PQt?.length.toString() ?? "0";
  }
}
exports.InteractBehaviorNode = InteractBehaviorNode;
// # sourceMappingURL=InteractBehaviorNode.js.map
