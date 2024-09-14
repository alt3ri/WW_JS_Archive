"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskProtocolContext = void 0);
const ActivityData_1 = require("../../../ActivityData"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
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
    t = t.Tih;
    t && this.C6a(t);
  }
  GetExDataRedPointShowState() {
    var t = ModelManager_1.ModelManager.MowingRiskModel;
    return t.HasAnyReward || t.IsNewInstanceOpen;
  }
  ParseRiskHarvestEndNotify(t) {}
  ParseRiskHarvestInstUpdateNotify(t) {
    this.ieh(t.kih);
  }
  ParseRiskHarvestArtifactNotify(t) {
    this.f6a(t.$ih);
  }
  ParseRiskHarvestBuffUpdateNotify(t) {
    this.f6a(t.$ih);
  }
  ParseRiskHarvestBuffUnlockNotify(t) {
    this.p6a(t.Qih);
  }
  ParseRiskHarvestActivityUpdateNotify(t) {
    t = t.Izs;
    void 0 !== t && this.C6a(t);
  }
  ieh(t) {
    for (const e of t)
      (this.d6a -= this.l6a.get(e.s5n)?.SMs ?? 0),
        this.l6a.set(e.s5n, e),
        (this.d6a += e.SMs);
  }
  reh(t) {
    this.d6a = 0;
    for (const e of t) this.l6a.set(e.s5n, e), (this.d6a += e.SMs);
  }
  M6a(t) {
    this.u6a.clear();
    for (const e of t) this.u6a.add(e);
  }
  p6a(t) {
    for (const e of t) this.m6a.add(e);
  }
  f6a(t) {
    if (void 0 !== t) {
      (this.h6a = t), this._6a.clear();
      for (const e of t.qih) this._6a.set(e.s5n, e.m9n);
    }
  }
  C6a(t) {
    this.reh(t.kih), this.M6a(t.Oih), this.p6a(t.Nih);
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
  IsInstanceUnlockedById(t) {
    return this.l6a.get(t)?.K6n ?? !1;
  }
  IsInstancePlayedById(t) {
    return this.l6a.get(t)?.Bih ?? !1;
  }
  GetInstanceUnlockTimestampById(t) {
    t = this.l6a.get(t)?.yzs;
    return void 0 === t
      ? Number.MAX_VALUE
      : MathUtils_1.MathUtils.LongToNumber(t);
  }
  IsInstancePassUnlockTimeById(t) {
    return (
      TimeUtil_1.TimeUtil.GetServerTimeStamp() >=
      this.GetInstanceUnlockTimestampById(t)
    );
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
