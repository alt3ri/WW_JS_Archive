"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const AiTeam_1 = require("../Team/AiTeam");
const ScoreUpdateManager_1 = require("./ScoreUpdateManager");
class AiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ActiveAiTeams = new Map()),
      (this.ActiveAiControllers = new Map()),
      (this.AiScoreManager = new ScoreUpdateManager_1.ScoreUpdateManager()),
      (this.HatredGroups = new Map()),
      (this.Lte = 0);
  }
  AddAiScore(e) {
    this.AiScoreManager.AddScore(e);
  }
  RemoveObject(e) {
    this.AiScoreManager.RemoveObject(e);
  }
  GetAiTeam(e = 1) {
    let t = this.ActiveAiTeams.get(e);
    return (
      t ||
        (((t = new AiTeam_1.AiTeam()).TeamId = ++this.Lte),
        t.Init(e),
        this.ActiveAiTeams.set(e, t)),
      t
    );
  }
  AddActiveAiController(t) {
    const e = t.CharAiDesignComp.Entity.Id;
    if (
      !this.ActiveAiControllers.has(e) &&
      (this.ActiveAiControllers.set(e, t), t.HatredGroupId)
    ) {
      let e = this.HatredGroups.get(t.HatredGroupId);
      e || ((e = new Set()), this.HatredGroups.set(t.HatredGroupId, e)),
        e.add(t);
    }
  }
  RemoveActiveAiController(e) {
    this.ActiveAiControllers.delete(e.CharAiDesignComp.Entity.Id) &&
      e.HatredGroupId &&
      this.HatredGroups.get(e.HatredGroupId)?.delete(e);
  }
}
exports.AiModel = AiModel;
// # sourceMappingURL=AiModel.js.map
