"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssRankRoleData =
    exports.AbyssDangoOwnerData =
    exports.AbyssChallengePassRoleInfo =
    exports.AbyssChallengePassPlayerInfo =
    exports.AbyssChallengeInfo =
    exports.AbyssRankChallengeInfo =
    exports.AbyssFormationRoleSelectDetailInfo =
    exports.AbyssFormationRoleSelectInfo =
    exports.AbyssFormationInfo =
    exports.AbyssChallengeRoleHonor =
    exports.AbyssChallengeResultRoleInfo =
    exports.AbyssChallengeResultPlayerInfo =
    exports.AbyssChallengeResultData =
    exports.DangoAbyssInsSelectViewData =
      void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  DangoAbyssDefine_1 = require("./DangoAbyssDefine"),
  FIRST_RANKBG = "T_AnniversaryCelebrationRankBg_1",
  SECOND_RANKBG = "T_AnniversaryCelebrationRankBg_2",
  THIRD_RANKBG = "T_AnniversaryCelebrationRankBg_3",
  OTHER_RANKBG = "T_AnniversaryCelebrationRankBgOther",
  MAX_COUNT = 3;
class DangoAbyssInsSelectViewData {
  constructor() {
    (this.AbyssDataList = []),
      (this.ActivityData = void 0),
      (this.FromSettlement = !1);
  }
}
exports.DangoAbyssInsSelectViewData = DangoAbyssInsSelectViewData;
class AbyssChallengeResultData {
  constructor() {
    (this.f$a = 0), (this._fc = 0), (this.cfc = !1), (this.ufc = []);
  }
  GetPassTime() {
    return this.f$a;
  }
  GetMinPassTime() {
    return this._fc;
  }
  GetIfSuccess() {
    return this.cfc;
  }
  GetPlayerInfoList() {
    return this.ufc;
  }
  GetPlayerInfoByPlayerId(s) {
    return this.ufc.find((t) => t.GetPlayerId() === s);
  }
  Phrase(s) {
    if (s) {
      (this.f$a = s.Qxs),
        (this._fc = s.JM_),
        (this.cfc = s.KRs),
        (this.ufc = []);
      var e = s.TRs.length;
      for (let t = 0; t < e; t++) {
        var i = new AbyssChallengeResultPlayerInfo();
        i.Phrase(s.TRs[t]), this.ufc.push(i);
      }
    }
  }
}
exports.AbyssChallengeResultData = AbyssChallengeResultData;
class AbyssChallengeResultPlayerInfo {
  constructor() {
    (this.j8 = 0), (this.dfc = 0), (this.TSn = []);
  }
  GetPlayerId() {
    return this.j8;
  }
  GetLikeCount() {
    return this.dfc;
  }
  GetRoleInfo() {
    return this.TSn;
  }
  SetLikeCount(t) {
    this.dfc = t;
  }
  Phrase(s) {
    (this.j8 = s.W5n), (this.dfc = s.Knc), (this.TSn = []);
    var e = s.dUs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengeResultRoleInfo();
      i.Phrase(s.dUs[t]), this.TSn.push(i);
    }
  }
}
exports.AbyssChallengeResultPlayerInfo = AbyssChallengeResultPlayerInfo;
class AbyssChallengeResultRoleInfo {
  constructor() {
    (this.mfc = 0),
      (this.ffc = 0),
      (this.gfc = 0),
      (this.Cfc = void 0),
      (this.pfc = []);
  }
  GetRoleSkinId() {
    return this.mfc;
  }
  GetRoleLevel() {
    return this.ffc;
  }
  GetDangoId() {
    return this.gfc;
  }
  GetMainHonor() {
    return this.Cfc;
  }
  GetSubHonor() {
    return this.pfc;
  }
  Phrase(s) {
    (this.mfc = s.eI_),
      (this.ffc = s.Ebs),
      (this.gfc = s.Znc),
      (this.Cfc = new AbyssChallengeRoleHonor()),
      this.Cfc.Phrase(s.esc),
      (this.pfc = []);
    var e = s.tsc.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengeRoleHonor();
      i.Phrase(s.tsc[t]), this.pfc.push(i);
    }
  }
}
exports.AbyssChallengeResultRoleInfo = AbyssChallengeResultRoleInfo;
class AbyssChallengeRoleHonor {
  constructor() {
    (this.E9 = 0), (this.Xe = 0);
  }
  GetType() {
    return this.E9;
  }
  GetValue() {
    return this.Xe;
  }
  Phrase(t) {
    t && ((this.E9 = t.h5n), (this.Xe = t.e5n));
  }
}
exports.AbyssChallengeRoleHonor = AbyssChallengeRoleHonor;
class AbyssFormationInfo {
  constructor() {
    this.vfc = [];
  }
  Phrase(s) {
    this.vfc = [];
    var e = s.TRs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssFormationRoleSelectInfo();
      i.Phrase(s.TRs[t]), this.vfc.push(i);
    }
  }
}
exports.AbyssFormationInfo = AbyssFormationInfo;
class AbyssFormationRoleSelectInfo {
  constructor() {
    (this.j8 = 0), (this.yfc = []);
  }
  GetPlayerId() {
    return this.j8;
  }
  GetRoleSelectDetailInfoList() {
    return this.yfc;
  }
  Phrase(s) {
    (this.j8 = s.W5n), (this.yfc = []);
    var e = s.dUs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssFormationRoleSelectDetailInfo();
      i.Phrase(s.dUs[t]), this.yfc.push(i);
    }
  }
}
exports.AbyssFormationRoleSelectInfo = AbyssFormationRoleSelectInfo;
class AbyssFormationRoleSelectDetailInfo {
  constructor() {
    (this.dFe = 0), (this.gfc = 0), (this.Sfc = []);
  }
  GetRoleId() {
    return this.dFe;
  }
  GetDangoId() {
    return this.gfc;
  }
  GetPluginItemList() {
    return this.Sfc;
  }
  Phrase(t) {
    (this.dFe = t.Q6n), (this.gfc = t.Znc), (this.Sfc = t.msc);
  }
}
exports.AbyssFormationRoleSelectDetailInfo = AbyssFormationRoleSelectDetailInfo;
class AbyssRankChallengeInfo {
  constructor() {
    (this.tt1 = new Map()),
      (this.uyc = new Map()),
      (this.myc = new Map()),
      (this._yc = new Map()),
      (this.fyc = new Map()),
      (this.cyc = []),
      (this.dyc = []),
      (this.Mfc = []),
      (this.Efc = []),
      (this.gyc = void 0),
      (this.Cyc = void 0),
      (this.pyc = (t, s) =>
        t.GetProgress() === s.GetProgress()
          ? s.GetPassTime() - t.GetPassTime()
          : s.GetProgress() - t.GetProgress());
  }
  SetIsOpenAnonymousName(t, s) {
    this.tt1.set(t, s);
    var e = this.uyc.get(t);
    if (e) for (const i of e) i.SetNameMode(s);
    e = this._yc.get(t);
    if (e) for (const r of e) r.SetNameMode(s);
  }
  OnSelfRankInfoUpdate(s) {
    if ((this.wyc(this._yc), this.wyc(this.uyc), 0 !== s._sc.length)) {
      this.uyc.clear(), (this.Efc = []);
      var e = s._sc.length;
      for (let t = 0; t < e; t++) {
        var i = new AbyssChallengeInfo();
        i.Phrase(s._sc[t]),
          this.Efc.push(i),
          i.GetIsSingle()
            ? (this.byc(i.GetChallengeId()).push(i),
              this.Myc(i, i.GetChallengeId()))
            : (this.Lyc(i.GetChallengeId()).push(i),
              this.Iyc(i, i.GetChallengeId()));
      }
      this.Efc.forEach((t) => {
        var s = t.GetChallengeId(),
          t = t.GetShowName();
        this.tt1.set(s, t);
      });
    }
  }
  GetAnonymousNameMode(t) {
    return this.tt1.get(t) ?? !0;
  }
  wyc(t) {
    for (const e of t.values())
      for (const i of e)
        if (i.IsSelfInData) {
          var s = e.indexOf(i);
          if (0 <= s) {
            e.splice(s, 1);
            break;
          }
        }
  }
  OnChallengeRankInfoUpdate(s) {
    this._yc.clear(), this.uyc.clear(), (this.Mfc = []);
    var e = s.lsc.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengeInfo();
      i.Phrase(s.lsc[t]),
        this.Mfc.push(i),
        (i.GetIsSingle()
          ? this.byc(i.GetChallengeId())
          : this.Lyc(i.GetChallengeId())
        ).push(i);
    }
    this.Efc = [];
    var r = s._sc.length;
    for (let t = 0; t < r; t++) {
      var h = new AbyssChallengeInfo();
      h.Phrase(s._sc[t]),
        this.Efc.push(h),
        h.GetIsSingle()
          ? (this.byc(h.GetChallengeId()).push(h),
            this.Myc(h, h.GetChallengeId()))
          : (this.Lyc(h.GetChallengeId()).push(h),
            this.Iyc(h, h.GetChallengeId()));
    }
  }
  RefreshAllPassDataRank(t) {
    this.yyc(t, this.byc(t), this.cyc),
      this.yyc(t, this.Lyc(t), this.dyc),
      this.Tyc(t),
      this.RefreshSelfRankItemDataName(t);
  }
  Tyc(t) {
    let s = this.myc.get(t),
      e =
        ((s = s || this.Syc(t)),
        (this.gyc = s),
        (this.gyc.IsInRank = this.cyc.includes(s)),
        this.fyc.get(t));
    (e = e || this.Eyc(t)),
      (this.Cyc = e),
      (this.Cyc.IsInRank = this.dyc.includes(e));
  }
  Syc(t) {
    var s = new AbyssChallengeInfo();
    return this.Myc(s, t), s;
  }
  Eyc(t) {
    var s = new AbyssChallengeInfo();
    return this.Iyc(s, t), s;
  }
  yyc(t, s, e) {
    var i = this.pyc;
    (e.length = 0), s.sort(i);
    let r = 0,
      h = 0;
    for (let t = 0; t < s.length; t++) {
      var a = s[t];
      (0 === t || a.GetPassTime() < h) && (r++, (h = a.GetPassTime())),
        (a.Rank = r),
        e.push(a);
    }
  }
  RefreshSelfRankItemDataName(t) {
    var s,
      e = this._yc.get(t);
    if (e)
      for (const r of e)
        r.IsSelfInData && ((s = this.tt1.get(t) ?? !0), r.RefreshPlayerName(s));
    var i,
      e = this.uyc.get(t);
    if (e)
      for (const h of e)
        h.IsSelfInData && ((i = this.tt1.get(t) ?? !0), h.RefreshPlayerName(i));
  }
  GetRankDataListByOnlineType(t) {
    return t ? this.dyc : this.cyc;
  }
  GetSelfRankDataByTabType(t) {
    return t ? this.Cyc : this.gyc;
  }
  byc(t) {
    let s = this._yc.get(t);
    return s || ((s = []), this._yc.set(t, s)), s;
  }
  Myc(t, s) {
    (t.IsSelf = !0), this.myc.set(s, t);
  }
  Lyc(t) {
    let s = this.uyc.get(t);
    return s || ((s = []), this.uyc.set(t, s)), s;
  }
  Iyc(t, s) {
    (t.IsSelf = !0), this.fyc.set(s, t);
  }
  IsOwnSingleBestScore(t) {
    var s = this.gyc.IsEmpty,
      e = this.Cyc.IsEmpty;
    return (
      !(s !== e || !s) ||
      (s !== e ? e : this.gyc.GetPassTime() <= this.Cyc.GetPassTime())
    );
  }
}
exports.AbyssRankChallengeInfo = AbyssRankChallengeInfo;
class AbyssChallengeInfo {
  constructor() {
    (this.IsSelf = !1),
      (this.IsSelfInData = !1),
      (this.IsInRank = !0),
      (this.$yc = new Map()),
      (this.ufc = []),
      (this.f$a = 0),
      (this.Ifc = 0),
      (this.Tfc = !1),
      (this.bfc = !1),
      (this.fye = 0),
      (this.zb1 = 0),
      (this.Rank = 0),
      (this.aDc = []);
  }
  RefreshPlayerName(t) {
    var s = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    this.$yc.has(s) &&
      ((t = t
        ? ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName()
        : ""),
      this.$yc.set(s, t));
  }
  GetDangoAbyssRankRoleData() {
    if (0 === this.aDc.length)
      if (this.GetIsSingle()) {
        if (0 < this.ufc.length) {
          for (const r of this.ufc[0].GetPassRoleInfoList()) {
            var t = new DangoAbyssRankRoleData();
            (t.RoleSkinId = r.GetRoleSkinId()),
              (t.RoleLevel = r.GetRoleLevel()),
              (t.DangoId = r.GetDangoId()),
              (t.DangoEquipIds = r.GetEquipmentList()),
              (t.IsOnline = !1),
              (t.IsEmpty = !1),
              this.aDc.push(t);
          }
          for (let t = this.aDc.length; t < MAX_COUNT; t++) {
            var s = new DangoAbyssRankRoleData();
            this.aDc.push(s);
          }
        }
      } else {
        for (let t = 0, s = this.ufc.length; t < s; t++)
          for (const h of this.ufc[t].GetPassRoleInfoList()) {
            var e = new DangoAbyssRankRoleData();
            (e.RoleSkinId = h.GetRoleSkinId()),
              (e.RoleLevel = h.GetRoleLevel()),
              (e.DangoId = h.GetDangoId()),
              (e.DangoEquipIds = h.GetEquipmentList()),
              (e.IsOnline = !0),
              (e.IsEmpty = !1),
              (e.Pos = t),
              this.aDc.push(e);
          }
        for (let t = this.aDc.length; t < MAX_COUNT; t++) {
          var i = new DangoAbyssRankRoleData();
          this.aDc.push(i);
        }
      }
    return this.aDc;
  }
  get IsEmpty() {
    return 0 === this.ufc.length;
  }
  GetPlayerInfoList() {
    return this.ufc;
  }
  GetPassTime() {
    return this.f$a;
  }
  GetProgress() {
    return this.zb1;
  }
  GetChallengeId() {
    return this.Ifc;
  }
  GetIsSingle() {
    return this.Tfc;
  }
  GetShowName() {
    return this.bfc;
  }
  GetOwnerId() {
    return this.fye;
  }
  SetNameMode(t) {
    this.bfc = t;
  }
  Phrase(s) {
    (this.ufc = []), (this.aDc = []);
    var e = s.TRs.length,
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    this.$yc.clear();
    for (let t = 0; t < e; t++) {
      var r = new AbyssChallengePassPlayerInfo();
      r.Phrase(s.TRs[t]),
        this.ufc.push(r),
        this.$yc.set(r.GetPlayerId(), r.GetName()),
        i === r.GetPlayerId() && (this.IsSelfInData = !0);
    }
    (this.f$a = s.Qxs),
      (this.Ifc = s.e8n),
      (this.Tfc = s.usc),
      (this.bfc = s.csc),
      (this.fye = s.nIs),
      (this.zb1 = s._Ac);
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
  GetPlayerNameMap() {
    return this.$yc;
  }
}
exports.AbyssChallengeInfo = AbyssChallengeInfo;
class AbyssChallengePassPlayerInfo {
  constructor() {
    (this.he = ""), (this.j8 = 0), (this.Lfc = []);
  }
  GetName() {
    return this.he;
  }
  GetPlayerId() {
    return this.j8;
  }
  GetPassRoleInfoList() {
    return this.Lfc;
  }
  Phrase(s) {
    (this.he = s.H8n), (this.j8 = s.W5n), (this.Lfc = []);
    var e = s.dUs.length;
    for (let t = 0; t < e; t++) {
      var i = new AbyssChallengePassRoleInfo();
      i.Phrase(s.dUs[t]), this.Lfc.push(i);
    }
  }
}
exports.AbyssChallengePassPlayerInfo = AbyssChallengePassPlayerInfo;
class AbyssChallengePassRoleInfo {
  constructor() {
    (this.mfc = 0), (this.ffc = 0), (this.gfc = 0), (this.Qy1 = []);
  }
  GetRoleSkinId() {
    return this.mfc;
  }
  GetRoleLevel() {
    return this.ffc;
  }
  GetDangoId() {
    return this.gfc;
  }
  GetEquipmentList() {
    return this.Qy1;
  }
  Phrase(t) {
    (this.mfc = t.eI_),
      (this.ffc = t.Ebs),
      (this.gfc = t.Znc),
      (this.Qy1 = t.Uy1);
  }
}
exports.AbyssChallengePassRoleInfo = AbyssChallengePassRoleInfo;
class AbyssDangoOwnerData {
  constructor() {
    (this.PlayerId = 0),
      (this.RoleCfgId = 0),
      (this.DangoId = 0),
      (this.DangoLevel = 0),
      (this.DangoEquipIds = []);
  }
}
exports.AbyssDangoOwnerData = AbyssDangoOwnerData;
class DangoAbyssRankRoleData {
  constructor() {
    (this.IsEmpty = !0),
      (this.RoleSkinId = 0),
      (this.RoleLevel = 0),
      (this.DangoId = 0),
      (this.IsOnline = !1),
      (this.Pos = 0),
      (this.DangoEquipIds = []);
  }
  GetEquipPluginMap() {
    var s = new Map();
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) s.set(t, 0);
    for (let t = 0; t < this.DangoEquipIds.length; t++)
      s.set(t, this.DangoEquipIds[t]);
    return s;
  }
}
exports.DangoAbyssRankRoleData = DangoAbyssRankRoleData;
//# sourceMappingURL=DangoAbyssData.js.map
