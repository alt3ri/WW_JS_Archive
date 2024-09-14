"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PayShopGoods_1 = require("./PayShopData/PayShopGoods"),
  PayShopGoodsData_1 = require("./PayShopData/PayShopGoodsData");
class PayShopModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.DFi = new Map()),
      (this.RFi = new Map()),
      (this.uFi = new Map()),
      (this.UFi = ""),
      (this.AFi = 0),
      (this.PFi = !1),
      (this.xFi = new Array()),
      (this._Fa = (t, e) =>
        t.GetGoodsData().GetSortValue() !== e.GetGoodsData().GetSortValue()
          ? t.GetGoodsData().GetSortValue() - e.GetGoodsData().GetSortValue()
          : t.GetGoodsId() - e.GetGoodsId()),
      (this.uFa = (t, e) =>
        t.GetItemData().Quality !== e.GetItemData().Quality
          ? e.GetItemData().Quality - t.GetItemData().Quality
          : t.GetGoodsData().GetSortValue() !== e.GetGoodsData().GetSortValue()
            ? t.GetGoodsData().GetSortValue() - e.GetGoodsData().GetSortValue()
            : t.GetGoodsId() - e.GetGoodsId()),
      (this.Qjs = (t, e) => {
        var o, r;
        return t.IsSoldOut() !== e.IsSoldOut()
          ? t.IsSoldOut()
            ? 1
            : -1
          : t.IfCanBuy() !== e.IfCanBuy()
            ? t.IfCanBuy()
              ? -1
              : 1
            : ((o = t.GetItemData()),
              (r = e.GetItemData()),
              o.Quality !== r.Quality
                ? r.Quality - o.Quality
                : t.GetGoodsData().GetSortValue() !==
                    e.GetGoodsData().GetSortValue()
                  ? t.GetGoodsData().GetSortValue() -
                    e.GetGoodsData().GetSortValue()
                  : t.GetGoodsId() - e.GetGoodsId());
      }),
      (this.wFi = (t, e) => {
        var o, r;
        return t.IsSoldOut() !== e.IsSoldOut()
          ? t.IsSoldOut()
            ? 1
            : -1
          : t.IsLocked() !== e.IsLocked()
            ? t.IsLocked()
              ? 1
              : -1
            : t.GetGoodsData().GetSortValue() !==
                e.GetGoodsData().GetSortValue()
              ? t.GetGoodsData().GetSortValue() -
                e.GetGoodsData().GetSortValue()
              : ((o = t.GetItemData()),
                (r = e.GetItemData()),
                o.Quality !== r.Quality
                  ? r.Quality - o.Quality
                  : t.GetGoodsId() - e.GetGoodsId());
      });
  }
  set Version(t) {
    this.UFi = t;
  }
  get Version() {
    return this.UFi;
  }
  GetCurrentPayShopId() {
    return this.AFi;
  }
  GetTabInfoByPayShopIdId(t) {
    var e;
    for (const o of this.GetPayShopIdList())
      if (o === t)
        return (
          (e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(o)),
          ConfigManager_1.ConfigManager.DynamicTabConfig.GetTabViewConfById(
            e.DynamicTabId,
          )
        );
  }
  SetPayShopInfoList(t) {
    for (const e of t) this.BFi(e);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshAllPayShop,
      Array.from(this.DFi.keys()),
    );
  }
  SetPayShopInfo(t) {
    this.BFi(t), (this.AFi = t.s5n);
  }
  SetPayShopGoodsList(t) {
    var e,
      o,
      r = new Set();
    for (const a of t) {
      let t = this.uFi.get(a.s5n);
      t
        ? this.RefreshPayShopGoods(a)
        : ((e =
            ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
              a.s5n,
            ).ShopId),
          (o = this.DFi.get(e) ?? new Set()).add(a.s5n),
          this.DFi.set(e, o),
          (t = this.qFi(a, e))),
        r.add(t.GetTabId());
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshGoodsList,
      r,
    );
  }
  BFi(t) {
    var e = t.s5n,
      o = t.bMs,
      r = new Set();
    for (const a of o) r.add(a.s5n), this.qFi(a, e);
    this.DFi.set(e, r),
      this.RFi.set(e, MathUtils_1.MathUtils.LongToBigInt(t.Lxs)),
      (this.PFi = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Shop",
          11,
          "PayShop:Root 刷新商城数据",
          ["ShopId", e],
          ["goodsLength", r.size],
        );
  }
  RefreshPayShopGoods(t) {
    var e = new PayShopGoodsData_1.PayShopGoodsData();
    e.Phrase(t), this.uFi.get(t.s5n).SetGoodsData(e);
  }
  qFi(t, e) {
    var o = new PayShopGoodsData_1.PayShopGoodsData(),
      t = (o.Phrase(t), new PayShopGoods_1.PayShopGoods(e));
    return t.SetGoodsData(o), this.uFi.set(o.Id, t), t;
  }
  UnLockPayShopGoods(t) {
    var e = new Map();
    for (const r of t) {
      var o = this.uFi.get(r);
      o.SetUnLock();
      let t = e.get(o.PayShopId);
      (t = t || new Set()).add(o.GetTabId()), e.set(o.PayShopId, t);
    }
    (this.PFi = !0),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnLockGoods, e);
  }
  GetPayShopIdList() {
    return this.PFi
      ? ((this.PFi = !1),
        (this.xFi = []),
        this.DFi.forEach((t, e) => {
          ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e)
            .Enable && this.xFi.push(e);
        }),
        this.xFi.sort((t, e) => {
          var o =
              ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t),
            r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e);
          return o.Sort !== r.Sort ? o.Sort - r.Sort : t - e;
        }))
      : this.xFi;
  }
  GetPayShopTabIdList(a) {
    var t = new Set();
    for (const o of this.DFi.get(a)) {
      var e = this.uFi.get(o);
      t.has(e.GetTabId()) || t.add(e.GetTabId());
    }
    return Array.from(t).sort((t, e) => {
      var o = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
          a,
          t,
        ),
        r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
          a,
          e,
        );
      return o.Sort !== r.Sort ? o.Sort - r.Sort : t - e;
    });
  }
  GFi(t, e = 1) {
    return 3 === t && 1 === e;
  }
  NFi(t, e = 1) {
    var o = [];
    if (this.GFi(t, e))
      for (const a of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList())
        a.GetGetPayGiftData().ShowInShop() &&
          a.GetGetPayGiftData().CanShowInShopTab() &&
          o.push(a);
    e = this.DFi.get(t);
    if (e)
      for (const n of e) {
        var r = this.uFi.get(n);
        o.push(r);
      }
    return o;
  }
  GetGoodsInTab(t, e) {
    var o = [];
    for (const a of this.DFi.get(t)) {
      var r = this.uFi.get(a);
      o.push(r);
    }
    for (const n of o)
      if (n.GetItemData().ItemId === e) if (n.CheckGoodIfShow()) return n;
  }
  GetPayShopTabData(t, e = 1) {
    var o = [];
    for (const r of this.NFi(t, e))
      r.GetTabId() === e && r.CheckGoodIfShow() && o.push(r);
    return this.cFa(t, o);
  }
  cFa(t, e) {
    if (
      1 ===
      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t).SortRule
    ) {
      var o = [],
        r = [],
        a = [];
      for (const n of e) (n.IsSoldOut() ? a : n.IfCanBuy() ? o : r).push(n);
      return (
        o.sort(this.uFa),
        r.sort(this._Fa),
        a.sort(this.uFa),
        o.concat(r).concat(a)
      );
    }
    t = this.$js(t);
    return e.sort(t);
  }
  $js(t) {
    return 1 !==
      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t).SortRule
      ? this.wFi
      : this.Qjs;
  }
  GetPayShopGoods(t) {
    return this.uFi.get(t);
  }
  GetPayShopCountDownData(t) {
    var e,
      t = this.RFi.get(t);
    if (!(void 0 === t || t <= 0))
      return (
        (t = Number(t)),
        (e = PayShopGoods_1.PayShopGoods.GetTimeTypeData(t)),
        (t = t - Math.ceil(TimeUtil_1.TimeUtil.GetServerTime())),
        0 === e[0]
          ? {
              CountDownText:
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "NotEnoughOneHour",
                ),
              RemainingTime: t,
            }
          : TimeUtil_1.TimeUtil.GetCountDownData(t)
      );
  }
  GetPayShopUpdateTime(t) {
    t = this.RFi.get(t);
    return t ? Number(t) : 0;
  }
  UpdatePayShopGoodsCount(t, e) {
    var o = this.uFi.get(t);
    o.IsLimitGoods() &&
      (o.AddBoughtCount(e), o.IsSoldOut()) &&
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GoodsSoldOut, t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshGoods,
        t,
        o.PayShopId,
        o.GetTabId(),
      );
  }
  GetNeedCheckGoods(t) {
    var e = [];
    for (const o of this.NFi(t))
      o.IsShowInShop() &&
        (o.InUpdateTime() || o.InUnPermanentSellTime()) &&
        e.push(o);
    return e;
  }
  CheckPayShopEntranceHasRedDot() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10010))
      for (const t of this.GetPayShopIdList())
        if (this.CheckPayShopHasRedDot(t)) return !0;
    return !1;
  }
  CheckPayShopHasRedDot(t) {
    if (1 === t)
      return ModelManager_1.ModelManager.MonthCardModel.GetPayButtonRedDotState();
    for (const e of this.GetPayShopTabIdList(t))
      if (this.CheckPayShopTabHasRedDot(t, e)) return !0;
    return !1;
  }
  CheckPayShopTabHasRedDot(t, e = 1) {
    let o = [];
    for (const r of (o = this.GFi(t, e)
      ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()
      : this.GetPayShopTabData(t, e)))
      if (r.GetIfNeedRemind()) return !0;
    return !1;
  }
  ClearData() {
    this.DFi.clear(), this.uFi.clear(), this.RFi.clear();
  }
}
exports.PayShopModel = PayShopModel;
//# sourceMappingURL=PayShopModel.js.map
