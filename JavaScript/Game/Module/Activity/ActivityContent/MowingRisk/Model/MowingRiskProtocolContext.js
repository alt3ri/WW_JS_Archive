"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskProtocolContext = void 0);
const ActivityData_1 = require("../../../ActivityData"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  MowingRiskInBattleRecordData_1 = require("./MowingRiskInBattleRecordData");
class MowingRiskProtocolContext extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.QVa = new Map()),
      (this.KVa = void 0),
      (this.$Va = new Map()),
      (this.I6_ =
        new MowingRiskInBattleRecordData_1.MowingRiskInBattleRecordData()),
      (this.XVa = new Set()),
      (this.zVa = new Set()),
      (this.JVa = 0);
  }
  Dispose() {}
  PhraseEx(t) {
    t = t.NS_;
    t && this.ZVa(t);
  }
  GetExDataRedPointShowState() {
    var t = ModelManager_1.ModelManager.MowingRiskModel;
    return t.HasAnyReward || t.IsNewInstanceOpen;
  }
  ParseRiskHarvestEndNotify(t) {}
  ParseRiskHarvestInstUpdateNotify(t) {
    this.L1h(t.iE_);
  }
  ParseRiskHarvestArtifactNotify(t) {
    this.t9a(t.hE_);
  }
  ParseRiskHarvestBuffUpdateNotify(t) {
    this.t9a(t.hE_);
  }
  ParseRiskHarvestBuffUnlockNotify(t) {
    this.i9a(t.cE_);
  }
  ParseRiskHarvestActivityUpdateNotify(t) {
    t = t.Izs;
    void 0 !== t && this.ZVa(t);
  }
  L1h(t) {
    for (const e of t)
      (this.JVa -= this.QVa.get(e.s5n)?.SMs ?? 0),
        this.QVa.set(e.s5n, e),
        (this.JVa += e.SMs);
  }
  D1h(t) {
    this.JVa = 0;
    for (const e of t) this.QVa.set(e.s5n, e), (this.JVa += e.SMs);
  }
  o9a(t) {
    this.XVa.clear();
    for (const e of t) this.XVa.add(e);
  }
  i9a(t) {
    for (const e of t) this.zVa.add(e);
  }
  t9a(t) {
    if (void 0 !== t) {
      (this.KVa = t), this.$Va.clear();
      for (const e of t.tE_) this.$Va.set(e.s5n, e.m9n);
    }
  }
  ZVa(t) {
    this.D1h(t.iE_), this.o9a(t.rE_), this.i9a(t.nE_);
  }
  get InstanceInfo() {
    return this.QVa;
  }
  get ArtifactInfo() {
    return (
      void 0 === this.KVa &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("MowingRisk", 64, "尚未获得割草局内buff数据"),
      this.KVa
    );
  }
  get ArtifactId() {
    return this.KVa?.s5n ?? 0;
  }
  get ArtifactBasicBuffTotalCount() {
    return this.KVa?.nvs ?? 0;
  }
  get BasicBuffInfoInBattle() {
    return this.$Va;
  }
  get TotalScore() {
    return this.JVa;
  }
  get UnlockBuffTotalCount() {
    return this.zVa.size;
  }
  get UnlockBuff() {
    return this.zVa;
  }
  IsBuffUnlocked(t) {
    return this.zVa.has(t);
  }
  GetBuffCountInBattleById(t) {
    return this.BasicBuffInfoInBattle.get(t);
  }
  GetScoreById(t) {
    return this.QVa.get(t)?.SMs ?? 0;
  }
  IsInstanceUnlockedById(t) {
    return this.QVa.get(t)?.K6n ?? !1;
  }
  IsInstancePlayedById(t) {
    return this.QVa.get(t)?.eE_ ?? !1;
  }
  GetInstanceUnlockTimestampById(t) {
    t = this.QVa.get(t)?.yzs;
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MowingRisk", 64, "ResetCacheInBattle"),
      (this.KVa = void 0),
      this.$Va.clear(),
      this.I6_.Clear();
  }
  HasScoreRewarded(t) {
    return this.XVa.has(t);
  }
  RecordBuffId(t) {
    this.I6_.BasicBuffRecord.add(t);
  }
  GetRecordBuffIdSet() {
    return this.I6_.BasicBuffRecord;
  }
  RecordProgressPanelBasicBuffCount(t) {
    this.I6_.ProgressPanelBasicBuffCountRecord = t;
  }
  GetProgressPanelBasicBuffCountRecord() {
    return this.I6_.ProgressPanelBasicBuffCountRecord;
  }
}
exports.MowingRiskProtocolContext = MowingRiskProtocolContext;
//# sourceMappingURL=MowingRiskProtocolContext.js.map
