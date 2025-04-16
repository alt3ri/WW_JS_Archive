"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseRankItemData = exports.TowerDefenseRankRoleData =
    void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  FIRSTPLAYER_COLOR = "CB9C38FF",
  SECONDPLAYER_COLOR = "6A7E9DFF",
  THIRDPLAYER_COLOR = "997E76FF",
  FIRST_RANKBG = "T_TipItemBgGold",
  SECOND_RANKBG = "T_TipItemBgSilver",
  THIRD_RANKBG = "T_TipItemBgCopper",
  OTHER_RANKBG = "T_TipItemBgMask",
  MAX_COUNT = 3;
class TowerDefenseRankRoleData {
  constructor() {
    (this.IsEmpty = !0),
      (this.RoleSkinId = 0),
      (this.RoleLevel = 0),
      (this.PhantomId = 0),
      (this.IsOnline = !1),
      (this.Pos = 0);
  }
}
exports.TowerDefenseRankRoleData = TowerDefenseRankRoleData;
class TowerDefenseRankItemData {
  constructor(t, e, s) {
    (this.IsSelfInData = !1),
      (this.ServerData = void 0),
      (this.IsOnline = !1),
      (this.IsDifficult = !1),
      (this.IsInRank = !0),
      (this.IsSelf = !1),
      (this.Rank = 0),
      (this.RoleDataList = []),
      (this.$yc = new Map()),
      (this.IsOnline = t),
      (this.IsDifficult = e),
      (this.ServerData = s),
      this.Wyc(),
      this.Qyc(),
      (this.IsSelfInData = this.Kyc());
  }
  get IsEmpty() {
    return 0 === this.ServerData.Osc.length;
  }
  get PassScore() {
    return this.IsDifficult ? this.ServerData.Qxs : this.ServerData.SMs;
  }
  Wyc() {
    if (this.IsOnline) {
      for (let t = 0, e = this.ServerData.Osc.length; t < e; t++)
        for (const r of this.ServerData.Osc[t].Y7n) {
          var s = new TowerDefenseRankRoleData();
          (s.RoleSkinId = r.eI_),
            (s.RoleLevel = r.Ebs),
            (s.PhantomId = r.oxs),
            (s.IsOnline = !0),
            (s.IsEmpty = !1),
            (s.Pos = t),
            this.RoleDataList.push(s);
        }
      for (let t = this.RoleDataList.length; t < MAX_COUNT; t++) {
        var e = new TowerDefenseRankRoleData();
        this.RoleDataList.push(e);
      }
    } else if (0 < this.ServerData.Osc.length) {
      for (const a of this.ServerData.Osc[0].Y7n) {
        var t = new TowerDefenseRankRoleData();
        (t.RoleSkinId = a.eI_),
          (t.RoleLevel = a.Ebs),
          (t.PhantomId = a.oxs),
          (t.IsOnline = !1),
          (t.IsEmpty = !1),
          this.RoleDataList.push(t);
      }
      for (let t = this.RoleDataList.length; t < MAX_COUNT; t++) {
        var i = new TowerDefenseRankRoleData();
        this.RoleDataList.push(i);
      }
    }
  }
  Qyc() {
    for (const t of this.ServerData.Osc) this.$yc.set(t.W5n, t.H8n);
  }
  Kyc() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (const e of this.ServerData.Osc) if (e.W5n === t) return !0;
    return !1;
  }
  GetPlayerNameList() {
    var t = [];
    for (const s of this.ServerData.Osc) {
      var e = this.$yc.get(s.W5n);
      t.push({ PlayerId: s.W5n, PlayerName: e });
    }
    return t;
  }
  RefreshPlayerName(t) {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    this.$yc.has(e) &&
      ((t = t
        ? ""
        : ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName()),
      this.$yc.set(e, t));
  }
  get TopThreeNumColor() {
    return this.IsFirst
      ? FIRSTPLAYER_COLOR
      : this.IsSecond
        ? SECONDPLAYER_COLOR
        : this.IsThird
          ? THIRDPLAYER_COLOR
          : "FFFFFFFF";
  }
  get RankBg() {
    return this.IsFirst
      ? FIRST_RANKBG
      : this.IsSecond
        ? SECOND_RANKBG
        : this.IsThird
          ? THIRD_RANKBG
          : OTHER_RANKBG;
  }
  get IsFirst() {
    return 1 === this.Rank && this.IsInRank;
  }
  get IsSecond() {
    return 2 === this.Rank && this.IsInRank;
  }
  get IsThird() {
    return 3 === this.Rank && this.IsInRank;
  }
  get IsTopThree() {
    return this.IsFirst || this.IsSecond || this.IsThird;
  }
}
exports.TowerDefenseRankItemData = TowerDefenseRankItemData;
//# sourceMappingURL=TowerDefenseRankItemData.js.map
