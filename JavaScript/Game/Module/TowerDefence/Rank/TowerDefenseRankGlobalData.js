"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseRankGlobalData = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  TowerDefenceDefine_1 = require("../TowerDefenceDefine"),
  TowerDefenseRankItemData_1 = require("./TowerDefenseRankItemData");
class TowerDefenseRankGlobalData {
  constructor() {
    (this.lyc = !1),
      (this._yc = new Map()),
      (this.cyc = []),
      (this.uyc = new Map()),
      (this.dyc = []),
      (this.myc = new Map()),
      (this.fyc = new Map()),
      (this.gyc = void 0),
      (this.Cyc = void 0),
      (this.pyc = (e, t) => t.PassScore - e.PassScore),
      (this.vyc = (e, t) => e.PassScore - t.PassScore);
  }
  get IsOpenAnonymousName() {
    return this.lyc;
  }
  SetIsOpenAnonymousName(e) {
    this.lyc = e;
  }
  yyc(e, t, i) {
    var s =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(
          e,
        ),
      e = s.IsDifficult ? this.vyc : this.pyc,
      a =
        ((i.length = 0),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseRankListSize());
    t.sort(e);
    let r = 0,
      n = 0;
    for (let e = 0; e < t.length && !(e >= a); e++) {
      var h = t[e];
      h.IsEmpty ||
        ((0 !== e && !(s.IsDifficult ? h.PassScore > n : h.PassScore < n)) ||
          (r++, (n = h.PassScore)),
        (h.Rank = r),
        i.push(h));
    }
  }
  Syc(e) {
    var t =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(
          e,
        ),
      t = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(
        !1,
        t.IsDifficult,
        Protocol_1.Aki.Protocol.uhc.create(),
      );
    return this.Myc(t, e), t;
  }
  Eyc(e) {
    var t =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(
          e,
        ),
      t = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(
        !0,
        t.IsDifficult,
        Protocol_1.Aki.Protocol.uhc.create(),
      );
    return this.Iyc(t, e), t;
  }
  Tyc(e) {
    let t = this.myc.get(e),
      i =
        ((t = t || this.Syc(e)),
        (this.gyc = t),
        (this.gyc.IsInRank = this.cyc.includes(t)),
        this.fyc.get(e));
    (i = i || this.Eyc(e)),
      (this.Cyc = i),
      (this.Cyc.IsInRank = this.dyc.includes(i));
  }
  byc(e) {
    let t = this._yc.get(e);
    return t || ((t = []), this._yc.set(e, t)), t;
  }
  Lyc(e) {
    let t = this.uyc.get(e);
    return t || ((t = []), this.uyc.set(e, t)), t;
  }
  RefreshAllPassDataRank(e) {
    this.yyc(e, this.byc(e), this.cyc),
      this.yyc(e, this.Lyc(e), this.dyc),
      this.Tyc(e),
      this.RefreshSelfRankItemDataName(e);
  }
  SetFriendServerData(e) {
    if ((this._yc.clear(), this.uyc.clear(), 0 < e.length))
      for (const s of e) {
        var t =
            ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigById(
              s.e8n,
            ),
          i = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(
            !s.usc,
            t.IsDifficult,
            s.qsc,
          );
        i.IsSelfInData ||
          (i.IsOnline ? this.Lyc(t.InstanceId) : this.byc(t.InstanceId)).push(
            i,
          );
      }
  }
  wyc(e) {
    for (const i of e.values())
      for (const s of i)
        if (s.IsSelfInData) {
          var t = i.indexOf(s);
          if (0 <= t) {
            i.splice(t, 1);
            break;
          }
        }
  }
  Myc(e, t) {
    (e.IsSelf = !0), this.myc.set(t, e);
  }
  Iyc(e, t) {
    (e.IsSelf = !0), this.fyc.set(t, e);
  }
  SetSelfServerData(e) {
    if ((this.wyc(this._yc), this.wyc(this.uyc), 0 < e.length))
      for (const s of e) {
        var t =
            ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseConfigById(
              s.e8n,
            ),
          i = new TowerDefenseRankItemData_1.TowerDefenseRankItemData(
            !s.usc,
            t.IsDifficult,
            s.qsc,
          );
        (i.IsOnline
          ? (this.Iyc(i, t.InstanceId), this.Lyc(t.InstanceId))
          : (this.Myc(i, t.InstanceId), this.byc(t.InstanceId))
        )?.push(i);
      }
  }
  RefreshSelfRankItemDataName(e) {
    var t = this._yc.get(e);
    if (t)
      for (const i of t)
        i.IsSelfInData && i.RefreshPlayerName(this.IsOpenAnonymousName);
    t = this.uyc.get(e);
    if (t)
      for (const s of t)
        s.IsSelfInData && s.RefreshPlayerName(this.IsOpenAnonymousName);
  }
  GetRankDataListByTabType(e) {
    return e === TowerDefenceDefine_1.ETabType.Single ? this.cyc : this.dyc;
  }
  GetSelfRankDataByTabType(e) {
    return e === TowerDefenceDefine_1.ETabType.Single ? this.gyc : this.Cyc;
  }
  GetBestScoreText(e) {
    this.Tyc(e);
    var t,
      i,
      e =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(
          e,
        );
    return this.gyc.IsEmpty !== this.Cyc.IsEmpty
      ? ((t = (this.Cyc.IsEmpty ? this.gyc : this.Cyc).PassScore),
        e.IsDifficult ? TimeUtil_1.TimeUtil.GetTimeDataFormat(t) : t.toString())
      : ((t = this.gyc.PassScore),
        (i = this.Cyc.PassScore),
        e.IsDifficult
          ? TimeUtil_1.TimeUtil.GetTimeDataFormat(Math.min(t, i))
          : Math.max(t, i).toString());
  }
  IsOwnSingleBestScore(e) {
    var t = this.gyc.IsEmpty,
      i = this.Cyc.IsEmpty;
    return (
      !(t !== i || !t) ||
      (t !== i
        ? i
        : ((t = this.gyc.PassScore),
          (i = this.Cyc.PassScore),
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTowerDefenseInstanceByInstance(
            e,
          ).IsDifficult
            ? t <= i
            : i <= t))
    );
  }
}
exports.TowerDefenseRankGlobalData = TowerDefenseRankGlobalData;
//# sourceMappingURL=TowerDefenseRankGlobalData.js.map
