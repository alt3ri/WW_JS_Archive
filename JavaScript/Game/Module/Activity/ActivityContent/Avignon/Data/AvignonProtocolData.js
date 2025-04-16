"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AvignonProtocolData = void 0);
const ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../../ActivityData"),
  AvignonStageInfo_1 = require("./AvignonStageInfo");
class AvignonProtocolData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.ROe = new Map());
  }
  OnInit(t) {
    this.Gja();
  }
  Gja() {
    this.ROe.clear();
    var e = ConfigManager_1.ConfigManager.AvignonConfig.GetStageConfigAll();
    for (let t = 0; t < e.length; t++) {
      var r = e[t],
        a = new AvignonStageInfo_1.AvignonStageInfo(r.Id, t);
      this.ROe.set(r.Id, a);
    }
  }
  PhraseEx(t) {
    t = t.ysc;
    if (t) {
      for (const e of t.n3_.E$s) this.UpdateTask(e);
      for (const r of t.Gsc) this.UnlockStage(r);
    }
  }
  UpdateTask(t) {
    var e;
    t && 0 !== t.s5n && ((e = this.Ccc(t.s5n)), this.ROe.get(e)?.UpdateTask(t));
  }
  UnlockStage(t) {
    t = this.ROe.get(t);
    t && t.UnlockStage();
  }
  IsAllStagesUnlock() {
    for (var [, t] of this.ROe) if (!t.IsUnlock) return !1;
    return !0;
  }
  HasStageRewardRedDot() {
    for (const t of this.ROe.values()) if (t.GetRewardState()) return !0;
    return !1;
  }
  GetExDataRedPointShowState() {
    var t = ModelManager_1.ModelManager.AvignonModel.CheckRedDot();
    return this.HasStageRewardRedDot() || t;
  }
  GetStageInfo(t) {
    return this.ROe.get(t);
  }
  GetAllStagesId() {
    return Array.from(this.ROe.keys()).sort((t, e) => t - e);
  }
  GetCurrentLockQuestId() {
    for (var [, t] of this.ROe)
      if (!t.IsUnlock)
        return ConfigManager_1.ConfigManager.AvignonConfig.GetStageConfigById(
          t.StageId,
        ).QuestionId;
  }
  Ccc(t) {
    return ConfigManager_1.ConfigManager.AvignonConfig.GetAvignonTaskConfigByTaskId(
      t,
    ).Step;
  }
  TaskRewardGot(t) {
    var e = this.Ccc(t);
    this.ROe.get(e).SetTaskRewardGot(t);
  }
}
exports.AvignonProtocolData = AvignonProtocolData;
//# sourceMappingURL=AvignonProtocolData.js.map
