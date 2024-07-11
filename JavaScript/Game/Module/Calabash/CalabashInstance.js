"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashInstance = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
class CalabashInstance {
  constructor() {
    (this.Wft = 0),
      (this.UQ = 10),
      (this.Kft = 0),
      (this.Qft = 0),
      (this.Xft = new Map()),
      (this.$ft = new Map()),
      (this.Yft = new Set());
  }
  SetBaseInfo(e) {
    (this.CalabashCurrentLevel = e.P6n),
      (this.CalabashCurrentExp = e.M8n),
      (this.CalabashMaxLevel =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashMaxLevel()),
      (this.IdentifyGuaranteeCount = e.uLs),
      this.SetUnlockCalabashDevelopRewards(e._Ls);
  }
  SetConfigInfo(e) {
    for (const s of Object.keys(e.mLs)) {
      var t = Number.parseInt(s);
      this.Xft.set(t, e.mLs[s]);
    }
  }
  set CalabashCurrentLevel(e) {
    this.Wft = e;
  }
  get CalabashCurrentLevel() {
    return this.Wft;
  }
  set CalabashMaxLevel(e) {
    this.UQ = e;
  }
  get CalabashMaxLevel() {
    return this.UQ;
  }
  set CalabashCurrentExp(e) {
    this.Kft = e;
  }
  get CalabashCurrentExp() {
    return this.Kft;
  }
  set IdentifyGuaranteeCount(e) {
    this.Qft = e;
  }
  get IdentifyGuaranteeCount() {
    return this.Qft;
  }
  SetUnlockCalabashDevelopRewards(e) {
    this.$ft.clear();
    for (const t of e.values()) this.$ft.set(t.vIs, t.hLs);
  }
  SetUnlockCalabashDevelopReward(e) {
    this.$ft.set(e.vIs, e.hLs);
  }
  GetUnlockCalabashDevelopRewards() {
    return this.$ft;
  }
  SetRewardedLevelsSet(e) {
    this.Yft.clear();
    for (const t of e) this.Yft.add(t);
  }
  IsRewardedByLevel(e) {
    return this.Yft.has(e);
  }
  GetCatchGainByLevel(e) {
    return this.Xft.get(e);
  }
}
exports.CalabashInstance = CalabashInstance;
//# sourceMappingURL=CalabashInstance.js.map
