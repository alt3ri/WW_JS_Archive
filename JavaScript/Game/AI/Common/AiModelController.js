"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiModelController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class AiModelController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.AiModel;
  }
  static AddAiToTeam(e, o) {
    (e.AiTeam = this.Model.GetAiTeam(o)), e.AiTeam.AddMember(e);
  }
  static RemoveAiFromTeam(e) {
    const o = e.AiTeam;
    o && (o.RemoveMember(e), (e.AiTeam = void 0));
  }
  static OnTick(e) {
    this.Model.AiScoreManager.Update();
    for (const [, o] of this.Model.ActiveAiTeams)
      o.TeamMemberToGroup.size > 0 && o.Tick();
    this.Dte();
  }
  static Dte() {
    for (const [, e] of this.Model.HatredGroups)
      for (const t of e)
        (t.CharAiDesignComp?.Valid && t.CharAiDesignComp.Entity.Valid) ||
          e.delete(t);
    for (const [, o] of this.Model.HatredGroups)
      for (const a of o)
        if (a.AiHateList.IsCurrentTargetInMaxArea) {
          const r = a.AiHateList.GetCurrentTarget().Id;
          for (const s of o) a !== s && s.AiHateList.SharedHatredTarget(r);
        }
  }
}
exports.AiModelController = AiModelController;
// # sourceMappingURL=AiModelController.js.map
