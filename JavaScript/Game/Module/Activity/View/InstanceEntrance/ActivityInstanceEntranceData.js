"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityEntranceMonsterPreviewData =
    exports.ActivityEntranceDropDownContentData =
    exports.ActivityEntranceDropDownData =
    exports.ActivityEntranceSelectItemSubData =
    exports.ActivityEntranceSelectItemBaseData =
    exports.ActivityEntranceItemData =
    exports.ActivityEntranceSelectItemData =
    exports.ActivityEntranceDescInfoData =
    exports.ActivityEntrancePointData =
    exports.ActivityEntranceCaptionItemData =
    exports.ActivityInstanceEntranceData =
      void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager");
class ActivityInstanceEntranceData {
  constructor() {
    (this.Wwl = void 0),
      (this.Qwl = void 0),
      (this.Kwl = void 0),
      (this.$wl = void 0),
      (this.Xwl = void 0),
      (this.rOl = void 0),
      (this.Ywl = void 0);
  }
  GetActivityEntrancePointData() {
    return this.Wwl;
  }
  GetActivityEntranceDescInfoData() {
    return this.Qwl;
  }
  GetActivityEntranceSelectItemData() {
    return this.Kwl;
  }
  GetActivityEntranceCaptionItemData() {
    return this.$wl;
  }
  GetActivityEntranceDropDownData() {
    return this.Xwl;
  }
  GetClickConfirmCallBack() {
    return this.Ywl;
  }
  GetActivityEntranceMonsterPreviewData() {
    return this.rOl;
  }
  static Create(t, e, i, r, n, s, a) {
    var h = new ActivityInstanceEntranceData();
    return (
      (h.Wwl = t),
      (h.Qwl = e),
      (h.Kwl = i),
      (h.$wl = r),
      (h.rOl = s),
      (h.Xwl = n),
      (h.Ywl = a),
      h
    );
  }
}
exports.ActivityInstanceEntranceData = ActivityInstanceEntranceData;
class ActivityEntranceCaptionItemData {
  constructor() {
    (this.he = ""), (this.zwl = ""), (this.t5e = 0);
  }
  GetName() {
    return this.he;
  }
  GetTitleSpritePath() {
    return this.zwl;
  }
  GetHelpId() {
    return this.t5e;
  }
  static Create(t, e, i) {
    var r = new ActivityEntranceCaptionItemData();
    return (r.he = t), (r.zwl = e), (r.t5e = i), r;
  }
}
exports.ActivityEntranceCaptionItemData = ActivityEntranceCaptionItemData;
class ActivityEntrancePointData {
  constructor() {
    (this.Jwl = 0),
      (this.Zwl = 0),
      (this.l4e = void 0),
      (this.eBl = 0),
      (this.$Tt = void 0),
      (this.tBl = void 0),
      (this.oOl = void 0);
  }
  GetCurrentPoint() {
    return this.Jwl;
  }
  GetRedDotName() {
    return this.l4e;
  }
  GetRedDotId() {
    return this.eBl;
  }
  GetPointRewardBtnClickCallBack() {
    return this.tBl;
  }
  GetLimitPoint() {
    return this.Zwl;
  }
  GetRewardData() {
    return this.$Tt;
  }
  GetScoreDesc() {
    return this.oOl ? this.oOl() : "";
  }
  static Create(t, e, i, r, n, s, a) {
    var h = new ActivityEntrancePointData();
    return (
      (h.Jwl = t),
      (h.l4e = i),
      (h.eBl = r),
      (h.Zwl = e),
      (h.$Tt = n),
      (h.oOl = s),
      (h.tBl = a),
      h
    );
  }
}
exports.ActivityEntrancePointData = ActivityEntrancePointData;
class ActivityEntranceDescInfoData {
  constructor() {
    (this.iBl = void 0), (this.rBl = void 0), (this.oBl = void 0);
  }
  GetName(t) {
    return this.iBl ? this.iBl(t) : "";
  }
  GetDesc(t) {
    return this.rBl ? this.rBl(t) : "";
  }
  GetRecommendElement(t) {
    return this.oBl ? this.oBl(t) : [];
  }
  static Create(t, e, i) {
    var r = new ActivityEntranceDescInfoData();
    return (r.iBl = t), (r.rBl = e), (r.oBl = i), r;
  }
}
exports.ActivityEntranceDescInfoData = ActivityEntranceDescInfoData;
class ActivityEntranceSelectItemData {
  constructor() {
    (this.nBl = []), (this.sBl = []);
  }
  static Create(t) {
    var e = new ActivityEntranceSelectItemData();
    return (e.nBl = t), e.aBl(), e;
  }
  GetCurrentSelectData() {
    let t = void 0;
    for (const e of this.sBl)
      e.MainData
        ? e.MainData.GetSelectState() && (t = e)
        : e.SubData && e.SubData.GetSelectState() && (t = e);
    return (t = t || this.sBl[0]);
  }
  aBl() {
    this.sBl = [];
    for (let t = 0; t < this.nBl.length; t++) {
      var e = new ActivityEntranceItemData(),
        i =
          ((e.MainData = this.nBl[t]),
          this.sBl.push(e),
          this.nBl[t].GetSubDataList());
      if (i)
        for (let t = 0; t < i.length; t++) {
          var r = new ActivityEntranceItemData();
          (r.SubData = i[t]), this.sBl.push(r);
        }
    }
  }
  GetShowDataBySelectElement(e, i) {
    this.sBl = [];
    for (let t = 0; t < this.nBl.length; t++) {
      var r = this.nBl[t].GetUiLogicIndex() === e,
        n = (this.nBl[t].SetSelectState(r), new ActivityEntranceItemData());
      if (((n.MainData = this.nBl[t]), this.sBl.push(n), r)) {
        var s = this.nBl[t].GetSubDataList();
        if (s)
          for (let t = 0; t < s.length; t++) {
            var a = s[t].GetUiLogicIndex() === i,
              a = (s[t].SetSelectState(a), new ActivityEntranceItemData());
            (a.SubData = s[t]), this.sBl.push(a);
          }
      }
    }
    return this.sBl;
  }
}
exports.ActivityEntranceSelectItemData = ActivityEntranceSelectItemData;
class ActivityEntranceItemData {
  constructor() {
    (this.MainData = void 0), (this.SubData = void 0);
  }
  GetSelectDataIndex() {
    var t = this.MainData || this.SubData;
    return t ? t.GetDataIndex() : 0;
  }
  GetSelectUiLogicIndex() {
    var t = this.MainData || this.SubData;
    return t ? t.GetUiLogicIndex() : 0;
  }
  GetLockState() {
    var t = this.MainData || this.SubData;
    return !!t && t.GetLockState();
  }
  GetUnLockDesc() {
    var t = this.MainData || this.SubData;
    return t ? t.GetUnlockDesc() : "";
  }
  GetStyle() {
    return this.MainData ? 0 : 1;
  }
  GetSelectState() {
    var t = this.MainData || this.SubData;
    return !!t && t.GetSelectState();
  }
  GetFinishState() {
    var t = this.MainData || this.SubData;
    return !!t && t.GetFinishState();
  }
  GetInstanceDungeonId() {
    var t = this.MainData || this.SubData;
    return t ? t.GetInstanceDungeonId() : 0;
  }
  GetDesc() {
    var t = this.MainData || this.SubData;
    return t ? t.GetDesc() : "";
  }
  HaveChildData() {
    var t;
    return (
      !!this.MainData && !!(t = this.MainData.GetSubDataList()) && 0 < t.length
    );
  }
  GetInstanceConfig() {
    var t = this.GetInstanceDungeonId();
    if (0 !== t)
      return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
  }
  GetInstanceDifficultIconPath() {
    return this.GetInstanceConfig()?.DifficultyIcon ?? "";
  }
  GetInstanceName() {
    var t = this.GetInstanceConfig()?.MapName;
    return t && "" !== t
      ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)
      : "";
  }
  GetSelectCallBack() {
    var t = this.MainData || this.SubData;
    if (t) return t.GetClickCallBack();
  }
  GetRedDotState() {
    var t = this.MainData || this.SubData;
    return !!t && t.GetRedDotState();
  }
  GetRecommendLevel() {
    var t = this.MainData || this.SubData;
    return t ? t.GetRecommendLevel() : 0;
  }
  GetSubTitle() {
    var t = this.MainData || this.SubData;
    return t ? t.GetSubTitle() : "";
  }
  GetDefaultDifficultIndex() {
    var t = this.MainData || this.SubData;
    return t ? t.GetDefaultDifficultIndex() : 0;
  }
  GetBgPath() {
    var t = this.MainData || this.SubData;
    return t ? t.GetBgPath() : "";
  }
}
exports.ActivityEntranceItemData = ActivityEntranceItemData;
class ActivityEntranceSelectItemBaseData {
  constructor() {
    (this.lkn = !1),
      (this.lBl = 0),
      (this.hBl = 0),
      (this.iBl = void 0),
      (this.rBl = void 0),
      (this._Bl = void 0),
      (this.uBl = void 0),
      (this.cBl = void 0),
      (this.mBl = void 0),
      (this.dBl = void 0),
      (this.CBl = void 0),
      (this.gBl = void 0),
      (this.pBl = void 0),
      (this.U3l = void 0),
      (this.rMt = void 0),
      (this.fBl = []);
  }
  GetSelectState() {
    return this.lkn;
  }
  SetSelectState(t) {
    this.lkn = t;
  }
  GetUiLogicIndex() {
    return this.hBl;
  }
  GetSubDataList() {
    return this.fBl;
  }
  GetDataIndex() {
    return this.lBl;
  }
  GetName() {
    return this.iBl ? this.iBl(this.lBl) : "";
  }
  GetDesc() {
    return this.rBl ? this.rBl(this.lBl) : "";
  }
  GetLockState() {
    return !!this.uBl && this.uBl(this.lBl);
  }
  GetInstanceDungeonId() {
    return this.mBl ? this.mBl(this.lBl) : 0;
  }
  GetUnlockDesc() {
    return this.cBl ? this.cBl(this.lBl) : "";
  }
  GetRecommendLevel() {
    return this.CBl ? this.CBl(this.lBl) : 0;
  }
  GetFinishState() {
    return !!this.dBl && this.dBl(this.lBl);
  }
  GetRedDotState() {
    return !!this.gBl && this.gBl(this.lBl);
  }
  GetClickCallBack() {
    return this.rMt;
  }
  GetSubTitle() {
    return this._Bl ? this._Bl(this.lBl) : "";
  }
  GetDefaultDifficultIndex() {
    return this.pBl ? this.pBl(this.lBl) : 0;
  }
  GetBgPath() {
    return this.U3l ? this.U3l(this.lBl) : "";
  }
  static Create(t, e, i, r, n, s, a, h, c, o, v, u, D, l, G) {
    var d = new ActivityEntranceSelectItemBaseData();
    return (
      (d.lkn = !1),
      (d.lBl = t),
      (d.hBl = e),
      (d.iBl = r),
      (d.rBl = n),
      (d._Bl = s),
      (d.uBl = a),
      (d.mBl = h),
      (d.cBl = c),
      (d.dBl = o),
      (d.gBl = G),
      (d.pBl = u),
      (d.CBl = v),
      (d.U3l = D),
      (d.rMt = l),
      (d.fBl = i),
      d
    );
  }
}
class ActivityEntranceSelectItemSubData extends (exports.ActivityEntranceSelectItemBaseData =
  ActivityEntranceSelectItemBaseData) {}
exports.ActivityEntranceSelectItemSubData = ActivityEntranceSelectItemSubData;
class ActivityEntranceDropDownData {
  constructor() {
    (this.vBl = 0), (this.SBl = []);
  }
  GetDropDownContentDataList() {
    return this.SBl;
  }
  GetDefaultIndex() {
    return this.vBl;
  }
  SetDefaultIndex(t) {
    this.vBl = t;
  }
  static Create(t, e) {
    var i = new ActivityEntranceDropDownData();
    return (i.SBl = t), (i.vBl = e), i;
  }
}
exports.ActivityEntranceDropDownData = ActivityEntranceDropDownData;
class ActivityEntranceDropDownContentData {
  constructor() {
    (this.lBl = 0),
      (this.MBl = void 0),
      (this.yBl = void 0),
      (this.CBl = void 0),
      (this.EBl = void 0);
  }
  GetDataIndex() {
    return this.lBl;
  }
  GetTogOptionText() {
    return this.MBl ? this.MBl(this.lBl) : "";
  }
  GetDropDownText() {
    return this.yBl ? this.yBl(this.lBl) : "";
  }
  GetRecommendLevel() {
    return this.CBl ? this.CBl(this.lBl) : 0;
  }
  GetOnSelectCallBack() {
    return this.EBl;
  }
  static Create(t, e, i, r, n) {
    var s = new ActivityEntranceDropDownContentData();
    return (s.lBl = t), (s.MBl = e), (s.yBl = i), (s.CBl = r), (s.EBl = n), s;
  }
}
exports.ActivityEntranceDropDownContentData =
  ActivityEntranceDropDownContentData;
class ActivityEntranceMonsterPreviewData {
  constructor() {
    (this.nOl = void 0),
      (this.sOl = void 0),
      (this.mBl = void 0),
      (this.aOl = void 0);
  }
  GetMonsterTips(t) {
    return this.nOl ? this.nOl(t) : "";
  }
  GetMonsterPreviewState(t) {
    return !!this.sOl && this.sOl(t);
  }
  GetInstanceDungeonId(t) {
    return this.mBl ? this.mBl(t) : 0;
  }
  GetPreviewCallBack() {
    return this.aOl;
  }
  static Create(t, e, i, r) {
    var n = new ActivityEntranceMonsterPreviewData();
    return (n.nOl = t), (n.sOl = e), (n.mBl = i), (n.aOl = r), n;
  }
}
exports.ActivityEntranceMonsterPreviewData = ActivityEntranceMonsterPreviewData;
//# sourceMappingURL=ActivityInstanceEntranceData.js.map
