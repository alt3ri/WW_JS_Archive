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
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
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
      (this.State = Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty);
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
      (this._ll = []),
      (this.ull = []),
      (this.cll = []),
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
  GetCurrentSelectScoreBuff() {
    return this._ll;
  }
  GetCurrentOptionScoreBuff() {
    return this.ull;
  }
  GetPrepareSelectScoreBuff() {
    return this.cll;
  }
  GetCurrentTeamMembers() {
    return this.dyn;
  }
  SetCurrentSelectLevel(e) {
    this.uyn = e;
  }
  InitLevelBuff(e, t, s, r, o) {
    this.tyn = [];
    for (const n of e) {
      const e = new BossRushBuffInfo();
      (e.BuffId = n.BuffId),
        (e.Slot = n.Slot),
        (e.ChangeAble = n.ChangeAble),
        (e.State = n.State),
        this.tyn.push(e);
    }
    for (const i of e) 0 < i.BuffId && this.cyn.push(i);
    for (const f of t) 0 < f.BuffId && this.cyn.push(f);
    for (const h of s) 0 < h.BuffId && this.cyn.push(h);
    for (const u of r) {
      const e = new BossRushBuffInfo();
      (e.BuffId = u.BuffId),
        (e.Slot = u.Slot),
        (e.ChangeAble = u.ChangeAble),
        (e.State = u.State),
        this._ll.push(e);
    }
    for (const a of o) 0 < a.BuffId && this.ull.push(a);
  }
  GetIndexBuff(e) {
    if (!(e >= this.tyn.length)) return this.tyn[e];
  }
  GetOptionBuff() {
    var e = [];
    if (
      0 === ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName
    )
      for (const t of this.cyn)
        ((0 < t.BuffId &&
          t.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked) ||
          t.Slot < 0) &&
          -1 === e.findIndex((e) => e.BuffId === t.BuffId) &&
          e.push(t);
    else
      for (const s of this.ull)
        -1 === e.findIndex((e) => e.BuffId === s.BuffId) && e.push(s);
    return e;
  }
  InitPrepareSelectBuff() {
    this.myn = [];
    for (const e of this.tyn) this.myn.push(e);
  }
  InitPrepareSelectScoreBuff() {
    this.cll = [];
    for (const e of this._ll) this.cll.push(e);
  }
  SetIndexPrepareSelectBuff(e, t) {
    this.myn[e] = t;
  }
  GetIndexPrepareSelectBuff(e) {
    return this.myn[e];
  }
  GetIndexPrepareSelectScoreBuff(e) {
    return this.cll[e];
  }
  SetPrepareSelectBuff(e) {
    this.myn = [];
    for (const t of e) this.myn.push(t);
  }
  SetPrepareSelectScoreBuff(e) {
    this.cll = [];
    for (const t of e) this.cll.push(t);
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
    for (const r of this.dyn) {
      var s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(r),
        s =
          (s && ((e += s.GetLevelData().GetLevel()), t++),
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r));
      s && ((e += s.GetLevelData().GetLevel()), t++);
    }
    return e / t < this.GetRecommendLevel() || 0 === t;
  }
  Clear() {
    (this.tyn = []), (this.dyn = []);
  }
  ClearTeamInfo() {
    this.dyn = [];
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
      (this.fyn = new Map()),
      (this.CurrentSelectBuffTabName = 0),
      (this.OnlyOpenRewardView = !1),
      (this.ChoseBuffInGameHandleList = []);
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
    for (const o of []) {
      var r;
      0 <= t && (r = this.fyn.get(e)) && !r.includes(o) && s.push(o);
    }
    return s;
  }
  GetLevelSelectRoleIds(e) {
    return e.GetCurrentTeamMembers();
  }
  CheckInBossRush() {
    return (
      20 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        )?.InstSubType &&
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
    );
  }
}
exports.BossRushModel = BossRushModel;
//# sourceMappingURL=BossRushModel.js.map
