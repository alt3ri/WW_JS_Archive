"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushModel =
    exports.BossRushTeamInfo =
    exports.BossRushBuffInfo =
    exports.BossRushRoleInfo =
      void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class BossRushRoleInfo {
  constructor() {
    (this.RoleId = 0), (this.Slot = 0);
  }
}
exports.BossRushRoleInfo = BossRushRoleInfo;
class BossRushBuffInfo {
  constructor() {
    (this.BuffId = 0),
      (this.Slot = 0),
      (this.ChangeAble = !0),
      (this.State = Protocol_1.Aki.Protocol.fks.Proto_Empty);
  }
}
exports.BossRushBuffInfo = BossRushBuffInfo;
class BossRushTeamInfo {
  constructor() {
    (this.ActivityId = 0),
      (this.uyn = void 0),
      (this.tyn = []),
      (this.cyn = []),
      (this.myn = []),
      (this.dyn = []),
      (this.LevelInfo = void 0);
  }
  GetCurrentSelectLevel() {
    return this.uyn;
  }
  GetCurrentSelectBuff() {
    return this.tyn;
  }
  GetPrepareSelectBuff() {
    return this.myn;
  }
  GetCurrentTeamMembers() {
    return this.dyn;
  }
  SetCurrentSelectLevel(e) {
    this.uyn = e;
  }
  InitLevelBuff(e, t, s) {
    this.tyn = [];
    for (const o of e) {
      const e = new BossRushBuffInfo();
      (e.BuffId = o.BuffId),
        (e.Slot = o.Slot),
        (e.ChangeAble = o.ChangeAble),
        (e.State = o.State),
        this.tyn.push(e);
    }
    for (const r of e) 0 < r.BuffId && this.cyn.push(r);
    for (const i of t) 0 < i.BuffId && this.cyn.push(i);
    for (const n of s) 0 < n.BuffId && this.cyn.push(n);
  }
  GetIndexBuff(e) {
    if (!(e >= this.tyn.length)) return this.tyn[e];
  }
  GetOptionBuff() {
    var e = [];
    for (const t of this.cyn)
      ((0 < t.BuffId && t.State === Protocol_1.Aki.Protocol.fks.cBs) ||
        t.Slot < 0) &&
        -1 === e.findIndex((e) => e.BuffId === t.BuffId) &&
        e.push(t);
    return e;
  }
  InitPrepareSelectBuff() {
    this.myn = [];
    for (const e of this.tyn) this.myn.push(e);
  }
  SetIndexPrepareSelectBuff(e, t) {
    this.myn[e] = t;
  }
  GetIndexPrepareSelectBuff(e) {
    return this.myn[e];
  }
  SetPrepareSelectBuff(e) {
    this.myn = [];
    for (const t of e) this.myn.push(t);
  }
  GetBuffMaxCount() {
    return this.tyn.length;
  }
  SetIndexTeamMembers(e, t) {
    this.dyn.length <= e ? this.dyn.push(t) : (this.dyn[e] = t);
  }
  ReSortTeamMembers() {
    var t = [];
    for (const e of this.dyn) 0 < e && t.push(e);
    for (let e = t.length; e < this.dyn.length; e++) t.push(0);
    this.dyn = t;
  }
  SetCurrentTeamMembers(e) {
    this.dyn = e;
  }
  GetRecommendLevel() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
      this.LevelInfo.GetConfig().InstId,
      ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
    );
  }
  GetIfLevelTooLow() {
    let e = 0,
      t = 0;
    for (const o of this.dyn) {
      var s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o),
        s =
          (s && ((e += s.GetLevelData().GetLevel()), t++),
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o));
      s && ((e += s.GetLevelData().GetLevel()), t++);
    }
    return e / t < this.GetRecommendLevel() || 0 === t;
  }
  Clear() {
    (this.tyn = []), (this.dyn = []);
  }
}
exports.BossRushTeamInfo = BossRushTeamInfo;
class BossRushModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentSelectLevelDetailData = void 0),
      (this.CurrentTeamInfo = void 0),
      (this.CurrentChangeBuffSlot = 0),
      (this.PlayBackAnimation = !1),
      (this.CurrentOpenBossRushActivityIds = []),
      (this.CurrentSelectActivityId = 0),
      (this.gyn = new Map()),
      (this.fyn = new Map());
  }
  GetFullScore(e) {
    let t = 0;
    for (const s of ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      e,
    ).GetBossRushLevelDetailInfo())
      t += s.GetScore();
    return t;
  }
  GetBossRushTeamInfoByActivityId(e) {
    let t = this.gyn.get(e);
    return t || ((t = new BossRushTeamInfo()), this.gyn.set(e, t)), t;
  }
  GetHaveUnTakeRewardIds(e) {
    var t = this.GetFullScore(e),
      s = [];
    for (const r of []) {
      var o;
      0 <= t && (o = this.fyn.get(e)) && !o.includes(r) && s.push(r);
    }
    return s;
  }
  GetLevelSelectRoleIds(e) {
    return e.GetCurrentTeamMembers();
  }
}
exports.BossRushModel = BossRushModel;
//# sourceMappingURL=BossRushModel.js.map
