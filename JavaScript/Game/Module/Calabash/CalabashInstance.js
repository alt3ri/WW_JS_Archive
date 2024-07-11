"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashInstance = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager");
class CalabashInstance {
  constructor() {
    (this.w0t = 0),
      (this.UQ = 10),
      (this.B0t = 0),
      (this.b0t = 0),
      (this.q0t = new Map()),
      (this.G0t = new Map()),
      (this.N0t = new Set());
  }
  SetBaseInfo(e) {
    (this.CalabashCurrentLevel = e.r3n),
      (this.CalabashCurrentExp = e.k3n),
      (this.CalabashMaxLevel =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashMaxLevel()),
      (this.IdentifyGuaranteeCount = e.WSs),
      this.SetUnlockCalabashDevelopRewards(e.jSs);
  }
  SetConfigInfo(e) {
    for (const s of Object.keys(e.XSs)) {
      const t = Number.parseInt(s);
      this.q0t.set(t, e.XSs[s]);
    }
  }
  set CalabashCurrentLevel(e) {
    this.w0t = e;
  }
  get CalabashCurrentLevel() {
    return this.w0t;
  }
  set CalabashMaxLevel(e) {
    this.UQ = e;
  }
  get CalabashMaxLevel() {
    return this.UQ;
  }
  set CalabashCurrentExp(e) {
    this.B0t = e;
  }
  get CalabashCurrentExp() {
    return this.B0t;
  }
  set IdentifyGuaranteeCount(e) {
    this.b0t = e;
  }
  get IdentifyGuaranteeCount() {
    return this.b0t;
  }
  SetUnlockCalabashDevelopRewards(e) {
    this.G0t.clear();
    for (const t of e.values()) this.G0t.set(t.iMs, t.$Ss);
  }
  SetUnlockCalabashDevelopReward(e) {
    this.G0t.set(e.iMs, e.$Ss);
  }
  GetUnlockCalabashDevelopRewards() {
    return this.G0t;
  }
  SetRewardedLevelsSet(e) {
    this.N0t.clear();
    for (const t of e) this.N0t.add(t);
  }
  IsRewardedByLevel(e) {
    return this.N0t.has(e);
  }
  GetCatchGainByLevel(e) {
    return this.q0t.get(e);
  }
}
exports.CalabashInstance = CalabashInstance;
// # sourceMappingURL=CalabashInstance.js.map
