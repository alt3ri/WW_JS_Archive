"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskProtocolContext = void 0);
const ActivityData_1 = require("../../../ActivityData"),
  Log_1 = require("../../../../../../Core/Common/Log");
class MowingRiskProtocolContext extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.l6a = new Map()),
      (this.h6a = void 0),
      (this._6a = new Map()),
      (this.u6a = new Set()),
      (this.m6a = new Set()),
      (this.d6a = 0);
  }
  Dispose() {}
  PhraseEx(t) {
    t = t.mih;
    t && this.C6a(t);
  }
  ParseRiskHarvestEndNotify(t) {}
  ParseRiskHarvestInstUpdateNotify(t) {
    this.g6a(t.Lih);
  }
  ParseRiskHarvestArtifactNotify(t) {
    this.f6a(t.xih);
  }
  ParseRiskHarvestBuffUpdateNotify(t) {
    this.f6a(t.xih);
  }
  ParseRiskHarvestBuffUnlockNotify(t) {
    this.p6a(t.qih);
  }
  ParseRiskHarvestActivityUpdateNotify(t) {
    t = t.Izs;
    void 0 !== t && this.C6a(t);
  }
  g6a(t) {
    this.d6a = 0;
    for (const s of t) this.l6a.set(s.s5n, s), (this.d6a += s.SMs);
  }
  M6a(t) {
    this.u6a.clear();
    for (const s of t) this.u6a.add(s);
  }
  p6a(t) {
    for (const s of t) this.m6a.add(s);
  }
  f6a(t) {
    if (void 0 !== t) {
      (this.h6a = t), this._6a.clear();
      for (const s of t.Tih) this._6a.set(s.s5n, s.m9n);
    }
  }
  C6a(t) {
    this.g6a(t.Lih), this.M6a(t.Rih), this.p6a(t.Dih);
  }
  get InstanceInfo() {
    return this.l6a;
  }
  get ArtifactInfo() {
    return (
      void 0 === this.h6a &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("MowingRisk", 65, "尚未获得割草局内buff数据"),
      this.h6a
    );
  }
  get ArtifactId() {
    return this.h6a?.s5n ?? 0;
  }
  get ArtifactBasicBuffTotalCount() {
    return this.h6a?.nvs ?? 0;
  }
  get BasicBuffInfoInBattle() {
    return this._6a;
  }
  get TotalScore() {
    return this.d6a;
  }
  get UnlockBuffTotalCount() {
    return this.m6a.size;
  }
  get UnlockBuff() {
    return this.m6a;
  }
  IsBuffUnlocked(t) {
    return this.m6a.has(t);
  }
  GetBuffCountInBattleById(t) {
    return this.BasicBuffInfoInBattle.get(t);
  }
  GetScoreById(t) {
    return this.l6a.get(t)?.SMs ?? 0;
  }
  ResetCacheInBattle() {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("MowingRisk", 65, "ResetCacheInBattle"),
      (this.h6a = void 0),
      this._6a.clear();
  }
  HasScoreRewarded(t) {
    return this.u6a.has(t);
  }
}
exports.MowingRiskProtocolContext = MowingRiskProtocolContext;
//# sourceMappingURL=MowingRiskProtocolContext.js.map
