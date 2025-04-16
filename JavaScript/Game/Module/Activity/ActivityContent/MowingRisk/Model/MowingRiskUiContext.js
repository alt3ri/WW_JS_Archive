"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskUiContext = void 0);
class MowingRiskUiContext {
  constructor(t) {
    (this.AttachedModel = void 0),
      (this.CurrentBuffViewUsage = 0),
      (this.CurrentBuffViewType = 0),
      (this.CurrentChosenOverviewBuffId = void 0),
      (this.CurrentChosenProgressIndex = void 0),
      (this.CurrentBasicBuffConfigs = []),
      (this.CurrentSuperBuffConfigs = []),
      (this.NewBuffToShowCache = []),
      (this.oth = (t, s) =>
        t.BuffType === s.BuffType ? t.Id - s.Id : s.BuffType - t.BuffType),
      (this.AttachedModel = t);
  }
  Dispose() {}
  SyncCurrentShowingBuffConfigs() {
    1 === this.CurrentBuffViewUsage
      ? ((this.CurrentBasicBuffConfigs =
          this.AttachedModel.GetBasicBuffConfigListInBattle()),
        this.CurrentBasicBuffConfigs.sort(this.oth),
        (this.CurrentSuperBuffConfigs =
          this.AttachedModel.GetSuperBuffConfigListInBattle()))
      : ((this.CurrentBasicBuffConfigs =
          this.AttachedModel.GetBasicBuffConfigListBeforeBattle()),
        this.CurrentBasicBuffConfigs.sort(this.oth),
        (this.CurrentSuperBuffConfigs =
          this.AttachedModel.GetSuperBuffConfigListBeforeBattle()));
  }
  SyncNewBuff(t) {
    for (const s of t)
      this.NewBuffToShowCache.includes(s) || this.NewBuffToShowCache.push(s);
  }
  ResetCacheInBattle() {
    this.NewBuffToShowCache.length = 0;
  }
}
exports.MowingRiskUiContext = MowingRiskUiContext;
//# sourceMappingURL=MowingRiskUiContext.js.map
