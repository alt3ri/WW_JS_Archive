"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecommendModel =
    exports.VisionSelectRecommendData =
    exports.AttrRecommendInfo =
    exports.VisionAttrRecommendInfo =
    exports.VisionFetterRecommendInfo =
      void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class VisionFetterRecommendInfo {
  constructor() {
    (this.HHa = 0), (this.bo_ = 0);
  }
  GetRecommendFetterGroupId() {
    return this.HHa;
  }
  GetUsage() {
    return this.bo_;
  }
  GetUsageText() {
    var e = (this.bo_ - (this.bo_ % 10)) / 100;
    return 0 === this.bo_ ? "" : e.toFixed(1) + "%";
  }
  Phrase(e) {
    (this.HHa = e.rL_), (this.bo_ = e.PGs);
  }
}
exports.VisionFetterRecommendInfo = VisionFetterRecommendInfo;
class VisionAttrRecommendInfo {
  constructor() {
    (this.Lo_ = new Array()), (this.Ao_ = new Array());
  }
  GetMainAttrRecommendInfo() {
    return this.Lo_;
  }
  GetSubAttrRecommendInfo() {
    return this.Ao_;
  }
}
exports.VisionAttrRecommendInfo = VisionAttrRecommendInfo;
class AttrRecommendInfo {
  constructor() {
    (this.gXo = 0), (this.bo_ = 0), (this.xo_ = 0);
  }
  GetAttrId() {
    return this.gXo;
  }
  GetUsage() {
    return this.bo_;
  }
  GetUsageText() {
    var e = (this.bo_ - (this.bo_ % 10)) / 100;
    return 0 === this.bo_ ? "" : e.toFixed(1) + "%";
  }
  GetAddType() {
    return this.xo_;
  }
  Phrase(e) {
    (this.gXo = e.oL_), (this.bo_ = e.PGs), (this.xo_ = e.nL_);
  }
}
exports.AttrRecommendInfo = AttrRecommendInfo;
class VisionSelectRecommendData {
  constructor() {
    (this.AttrId = 0), (this.AddType = 0);
  }
}
exports.VisionSelectRecommendData = VisionSelectRecommendData;
class VisionRecommendModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Ro_ = new Map()),
      (this.Po_ = new Map()),
      (this.CurrentSelectMainAttrArray = new Array()),
      (this.CurrentSelectSubAttrArray = new Array()),
      (this.Y8_ = 0),
      (this.wo_ = new Array(4, 3, 3, 1, 1)),
      (this.Uo_ = new Array(4, 3, 1, 1, 1)),
      (this.q6i = void 0),
      (this.Do_ = 0),
      (this.SortRecommend = (e, t) => {
        var r = e.GetFetterGroupId() === this.Do_,
          o = t.GetFetterGroupId() === this.Do_;
        return r && !o
          ? -1
          : o && !r
            ? 1
            : e.GetQuality() !== t.GetQuality()
              ? t.GetQuality() - e.GetQuality()
              : ((o = e.GetIfHaveRecommendMainProp(this.Y8_)),
                (r = t.GetIfHaveRecommendMainProp(this.Y8_)),
                o && !r
                  ? -1
                  : r && !o
                    ? 1
                    : ((r = e.GetIfHaveRecommendSubProp(this.Y8_)),
                      (o = t.GetIfHaveRecommendSubProp(this.Y8_)),
                      r && !o
                        ? -1
                        : o && !r
                          ? 1
                          : e.GetPhantomLevel() !== t.GetPhantomLevel()
                            ? t.GetPhantomLevel() - e.GetPhantomLevel()
                            : ((o = this.q6i.includes(e.GetUniqueId())),
                              (r = this.q6i.includes(t.GetUniqueId())),
                              o && !r
                                ? -1
                                : r && !o
                                  ? 1
                                  : t.GetConfigId() - e.GetConfigId())));
      });
  }
  OnRoleRecommendData(e, t) {
    if (t && t.hL_) {
      var r = new Array();
      for (const n of t.hL_) {
        var o = new VisionFetterRecommendInfo();
        o.Phrase(n), r.push(o);
      }
      this.Ro_.set(e, r);
    }
  }
  OnRoleRecommendAttrData(e, t) {
    if (t && t.lL_) {
      if (!this.Po_.get(e)) {
        const s = new Map();
        this.Po_.set(e, s);
      }
      const s = this.Po_.get(e);
      if (s)
        for (const i of t.lL_) {
          var r = new VisionAttrRecommendInfo();
          for (const a of i.sL_) {
            var o = new AttrRecommendInfo();
            o.Phrase(a), r.GetMainAttrRecommendInfo().push(o);
          }
          for (const h of i.aL_) {
            var n = new AttrRecommendInfo();
            n.Phrase(h), r.GetSubAttrRecommendInfo().push(n);
          }
          s.set(i.N2s, r);
        }
    }
  }
  GetRoleFetterRecommendInfo(e) {
    return this.Ro_.get(e);
  }
  GetRoleCostAttrRecommendInfo(e, t) {
    e = this.Po_.get(e);
    if (e) return e.get(t);
  }
  CheckVisionOneKeyEquipRedDot(r) {
    var o,
      n = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
    if (n && !n.IsTrialRole()) {
      let e = !1,
        t = 0;
      for (const i of ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
        r,
      ).GetIncrIdList())
        0 === i
          ? (e = !0)
          : (o =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                i,
              )) && (t += o.GetCost());
      if (e) {
        var s = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost() - t,
          n = this.Bo_(r, !1);
        if (n)
          for (const a of n)
            if (a.GetEquipRoleId() !== r && a.GetCost() <= s) return !0;
      }
    }
    return !1;
  }
  GetRecommendEquipUniqueIdList(e, t = 0) {
    this.Y8_ = e;
    var r = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      o =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionRecommendRuleLevel();
    let n = this.Uo_;
    o <= r && (n = this.wo_);
    var s = [0, 0, 0, 0, 0],
      i =
        ((this.Do_ = 0) < t
          ? (this.Do_ = t)
          : (o = this.GetRoleFetterRecommendInfo(e)) &&
            (this.Do_ = 0 < o.length ? o?.[0].GetRecommendFetterGroupId() : 0),
        (this.q6i =
          ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
            e,
          ).GetIncrIdList()),
        this.Bo_(e));
    if (i) {
      var a = s.length;
      let t = 0;
      var h = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
      for (let e = 0; e < a && !(t >= h); e++) {
        var c = n[e],
          c = this.qo_(s, c, i);
        0 !== c &&
          ((t +=
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              c,
            ).GetCost()),
          (s[e] = c));
      }
    }
    return s;
  }
  qo_(t, r, o) {
    const n = new Array();
    t.forEach((e) => {
      e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
      e && n.push(e.GetMonsterId());
    });
    var s = o.length;
    let i = 0;
    var a = new Array();
    for (let e = 0; e < s; e++) {
      var h = o[e];
      if (h?.GetCost() === r && !t.includes(h?.GetUniqueId())) {
        var c = h.GetMonsterId();
        if (!n.includes(c)) {
          i = h.GetUniqueId();
          break;
        }
        a.push(h.GetUniqueId());
      }
    }
    return (i = 0 === i && 0 < a.length ? a[0] : i);
  }
  Bo_(e, t = !0) {
    var r,
      o = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    if (0 !== o.length) {
      const n = new Array();
      for (const s of o)
        ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(
          s.GetUniqueId(),
        ) ||
          ((r =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              s.GetUniqueId(),
            )),
          n.push(r));
      return (
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e)
          .GetIncrIdList()
          .forEach((e) => {
            e =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                e,
              );
            e && n.push(e);
          }),
        t ? n.sort(this.SortRecommend) : n
      );
    }
  }
}
exports.VisionRecommendModel = VisionRecommendModel;
//# sourceMappingURL=VisionRecommendModel.js.map
