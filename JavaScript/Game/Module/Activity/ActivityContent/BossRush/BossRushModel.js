"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushModel =
    exports.BossRushTeamInfo =
    exports.BossRushBuffInfo =
    exports.BossRushRoleInfo =
      void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
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
      (this.State = Protocol_1.Aki.Protocol.ABs.Proto_Empty);
  }
}
exports.BossRushBuffInfo = BossRushBuffInfo;
class BossRushTeamInfo {
  constructor() {
    (this.ActivityId = 0),
      (this.hPr = void 0),
      (this.zAr = []),
      (this.lPr = []),
      (this._Pr = []),
      (this.uPr = []),
      (this.LevelInfo = void 0);
  }
  GetCurrentSelectLevel() {
    return this.hPr;
  }
  GetCurrentSelectBuff() {
    return this.zAr;
  }
  GetPrepareSelectBuff() {
    return this._Pr;
  }
  GetCurrentTeamMembers() {
    return this.uPr;
  }
  SetCurrentSelectLevel(e) {
    this.hPr = e;
  }
  InitLevelBuff(e, t, s) {
    this.zAr = [];
    for (const o of e) {
      const e = new BossRushBuffInfo();
      (e.BuffId = o.BuffId),
        (e.Slot = o.Slot),
        (e.ChangeAble = o.ChangeAble),
        (e.State = o.State),
        this.zAr.push(e);
    }
    for (const r of e) r.BuffId > 0 && this.lPr.push(r);
    for (const i of t) i.BuffId > 0 && this.lPr.push(i);
    for (const n of s) n.BuffId > 0 && this.lPr.push(n);
  }
  GetIndexBuff(e) {
    if (!(e >= this.zAr.length)) return this.zAr[e];
  }
  GetOptionBuff() {
    const e = [];
    for (const t of this.lPr)
      ((t.BuffId > 0 && t.State === Protocol_1.Aki.Protocol.ABs.KPs) ||
        t.Slot < 0) &&
        e.findIndex((e) => e.BuffId === t.BuffId) === -1 &&
        e.push(t);
    return e;
  }
  InitPrepareSelectBuff() {
    this._Pr = [];
    for (const e of this.zAr) this._Pr.push(e);
  }
  SetIndexPrepareSelectBuff(e, t) {
    this._Pr[e] = t;
  }
  GetIndexPrepareSelectBuff(e) {
    return this._Pr[e];
  }
  SetPrepareSelectBuff(e) {
    this._Pr = [];
    for (const t of e) this._Pr.push(t);
  }
  GetBuffMaxCount() {
    return this.zAr.length;
  }
  SetIndexTeamMembers(e, t) {
    this.uPr.length <= e ? this.uPr.push(t) : (this.uPr[e] = t);
  }
  ReSortTeamMembers() {
    const t = [];
    for (const e of this.uPr) e > 0 && t.push(e);
    for (let e = t.length; e < this.uPr.length; e++) t.push(0);
    this.uPr = t;
  }
  SetCurrentTeamMembers(e) {
    this.uPr = e;
  }
  GetRecommendLevel() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
      this.LevelInfo.GetConfig().InstId,
      ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
    );
  }
  GetIfLevelTooLow() {
    let e = 0;
    let t = 0;
    for (const o of this.uPr) {
      var s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o);
      var s =
        (s && ((e += s.GetLevelData().GetLevel()), t++),
        ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o));
      s && ((e += s.GetLevelData().GetLevel()), t++);
    }
    return e / t < this.GetRecommendLevel() || t === 0;
  }
  Clear() {
    (this.zAr = []), (this.uPr = []);
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
      (this.mPr = new Map()),
      (this.dPr = new Map());
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
    let t = this.mPr.get(e);
    return t || ((t = new BossRushTeamInfo()), this.mPr.set(e, t)), t;
  }
  GetHaveUnTakeRewardIds(e) {
    const t = this.GetFullScore(e);
    const s = [];
    for (const r of []) {
      var o;
      t >= 0 && (o = this.dPr.get(e)) && !o.includes(r) && s.push(r);
    }
    return s;
  }
  GetLevelSelectRoleIds(e) {
    return e.GetCurrentTeamMembers();
  }
}
exports.BossRushModel = BossRushModel;
// # sourceMappingURL=BossRushModel.js.map
