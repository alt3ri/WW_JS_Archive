"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingTowerModel =
    exports.MowingTowerTeamInfo =
    exports.MowingTowerBuffInfo =
    exports.MowingTowerRoleInfo =
      void 0);
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class MowingTowerRoleInfo {
  constructor() {
    (this.RoleId = 0), (this.Slot = 0);
  }
}
exports.MowingTowerRoleInfo = MowingTowerRoleInfo;
class MowingTowerBuffInfo {
  constructor() {
    (this.BuffId = 0), (this.Slot = 0), (this.ChangeAble = !0);
  }
}
exports.MowingTowerBuffInfo = MowingTowerBuffInfo;
class MowingTowerTeamInfo {
  constructor() {
    (this.ActivityId = 0),
      (this.uyn = void 0),
      (this.tyn = []),
      (this.cyn = []),
      (this.myn = []),
      (this.YLl = []),
      (this.zLl = []),
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
    return [this.YLl, this.zLl];
  }
  SetCurrentSelectLevel(e) {
    this.uyn = e;
  }
  InitLevelBuff(e, t) {
    this.tyn = [];
    for (const r of e) {
      const e = new MowingTowerBuffInfo();
      (e.BuffId = r.BuffId),
        (e.Slot = r.Slot),
        (e.ChangeAble = r.ChangeAble),
        this.tyn.push(e);
    }
    for (const s of e) 0 < s.BuffId && this.cyn.push(s);
    for (const o of t) 0 < o.BuffId && this.cyn.push(o);
  }
  GetIndexBuff(e) {
    if (!(e >= this.tyn.length)) return this.tyn[e];
  }
  GetOptionBuff() {
    var e = [];
    for (const t of this.cyn)
      (0 < t.BuffId || t.Slot < 0) &&
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
  SetIndexTeamMembers(e, t, r) {
    0 === e
      ? this.SetIndexFirstTeamMembers(t, r)
      : 1 === e && this.SetIndexLowTeamMembers(t, r);
  }
  SetIndexFirstTeamMembers(e, t) {
    this.YLl.length <= e ? this.YLl.push(t) : (this.YLl[e] = t);
  }
  SetIndexLowTeamMembers(e, t) {
    this.zLl.length <= e ? this.zLl.push(t) : (this.zLl[e] = t);
  }
  ReSortTeamMembers(e) {
    0 === e
      ? this.ReSortFirstTeamMembers()
      : 1 === e && this.ReSortLowTeamMembers();
  }
  ReSortFirstTeamMembers() {
    var t = [];
    for (const e of this.YLl) 0 < e && t.push(e);
    for (let e = t.length; e < this.YLl.length; e++) t.push(0);
    this.YLl = t;
  }
  ReSortLowTeamMembers() {
    var t = [];
    for (const e of this.zLl) 0 < e && t.push(e);
    for (let e = t.length; e < this.zLl.length; e++) t.push(0);
    this.zLl = t;
  }
  SetCurrentTeamMembers(e, t) {
    (this.YLl = e), (this.zLl = t);
  }
  GetRecommendLevel() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
      this.LevelInfo.GetConfig().InstIds[0],
      ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
    );
  }
  GetIfLevelTooLow() {
    let e = 0,
      t = 0;
    for (const i of this.YLl) {
      var r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i),
        r =
          (r && ((e += r.GetLevelData().GetLevel()), t++),
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i));
      r && ((e += r.GetLevelData().GetLevel()), t++);
    }
    var s = e / t;
    if (s < this.GetRecommendLevel() && 0 != s) return !0;
    for (const n of this.zLl) {
      var o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(n),
        o =
          (o && ((e += o.GetLevelData().GetLevel()), t++),
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n));
      o && ((e += o.GetLevelData().GetLevel()), t++);
    }
    s = e / t;
    return s < this.GetRecommendLevel() && 0 != s;
  }
  Clear() {
    (this.tyn = []), (this.YLl = []), (this.zLl = []);
  }
}
exports.MowingTowerTeamInfo = MowingTowerTeamInfo;
class MowingTowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentSelectLevelDetailData = void 0),
      (this.CurrentTeamInfo = void 0),
      (this.PlayBackAnimation = !1),
      (this.CurrentSelectActivityId = 0),
      (this.CurrentOptionArea = -1),
      (this.OtherHalfAreaRoleList = []),
      (this.AddLevel = [-1, -1]);
  }
  IsOpenMowingTowerFormation() {
    return -1 !== this.CurrentOptionArea;
  }
}
exports.MowingTowerModel = MowingTowerModel;
//# sourceMappingURL=MowingTowerModel.js.map
