"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  AiTeam_1 = require("../Team/AiTeam"),
  ScoreUpdateManager_1 = require("./ScoreUpdateManager");
class AiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ActiveAiTeams = new Map()),
      (this.ActiveAiControllers = new Map()),
      (this.AiScoreManager = new ScoreUpdateManager_1.ScoreUpdateManager()),
      (this.HatredGroups = new Map()),
      (this.a6_ = new Map()),
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
  AddActiveAiController(i) {
    var s = i.CharAiDesignComp.Entity.Id;
    if (
      !this.ActiveAiControllers.has(s) &&
      (this.ActiveAiControllers.set(s, i), i.HatredGroupId)
    ) {
      s = i.CharActorComp.Actor.Camp;
      this.a6_.set(i, s);
      let e = this.HatredGroups.get(s),
        t =
          (e || ((e = new Map()), this.HatredGroups.set(s, e)),
          e.get(i.HatredGroupId));
      t || ((t = new Set()), e.set(i.HatredGroupId, t)), t.add(i);
    }
  }
  RemoveActiveAiController(e) {
    var t;
    this.ActiveAiControllers.delete(e.CharAiDesignComp.Entity.Id) &&
      e.HatredGroupId &&
      (t = this.a6_.get(e)) &&
      (this.HatredGroups.get(t)?.get(e.HatredGroupId)?.delete(e),
      this.a6_.delete(e));
  }
}
exports.AiModel = AiModel;
//# sourceMappingURL=AiModel.js.map
