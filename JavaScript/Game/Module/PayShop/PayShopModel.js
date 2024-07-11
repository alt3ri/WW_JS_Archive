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
      (this.Tjs = (e, t) => {
        var o, r;
        return e.IsSoldOut() !== t.IsSoldOut()
          ? e.IsSoldOut()
            ? 1
            : -1
          : e.IfCanBuy() !== t.IfCanBuy()
            ? e.IfCanBuy()
              ? -1
              : 1
            : ((o = e.GetItemData()),
              (r = t.GetItemData()),
              o.Quality !== r.Quality
                ? r.Quality - o.Quality
                : e.GetGoodsData().GetSortValue() !==
                    t.GetGoodsData().GetSortValue()
                  ? e.GetGoodsData().GetSortValue() -
                    t.GetGoodsData().GetSortValue()
                  : e.GetGoodsId() - t.GetGoodsId());
      }),
      (this.wFi = (e, t) => {
        var o, r;
        return e.IsSoldOut() !== t.IsSoldOut()
          ? e.IsSoldOut()
            ? 1
            : -1
          : e.IsLocked() !== t.IsLocked()
            ? e.IsLocked()
              ? 1
              : -1
            : e.GetGoodsData().GetSortValue() !==
                t.GetGoodsData().GetSortValue()
              ? e.GetGoodsData().GetSortValue() -
                t.GetGoodsData().GetSortValue()
              : ((o = e.GetItemData()),
                (r = t.GetItemData()),
                o.Quality !== r.Quality
                  ? r.Quality - o.Quality
                  : e.GetGoodsId() - t.GetGoodsId());
      });
  }
  set Version(e) {
    this.UFi = e;
  }
  get Version() {
    return this.UFi;
  }
  GetCurrentPayShopId() {
    return this.AFi;
  }
  GetTabInfoByPayShopIdId(e) {
    var t;
    for (const o of this.GetPayShopIdList())
      if (o === e)
        return (
          (t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(o)),
          ConfigManager_1.ConfigManager.DynamicTabConfig.GetTabViewConfById(
            t.DynamicTabId,
          )
        );
  }
  SetPayShopInfoList(e) {
    for (const t of e) this.BFi(t);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshAllPayShop,
      Array.from(this.DFi.keys()),
    );
  }
  SetPayShopInfo(e, t) {
    var o = this.bFi(e);
    this.BFi(e),
      (this.AFi = e.J4n),
      t
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SwitchPayShopView,
            e.J4n,
          )
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshPayShop,
            e.J4n,
            o,
          );
  }
  SetPayShopGoodsList(e) {
    var t,
      o,
      r = new Set();
    for (const a of e) {
      let e = this.uFi.get(a.J4n);
      e
        ? this.RefreshPayShopGoods(a)
        : ((t =
            ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
              a.J4n,
            ).ShopId),
          (o = this.DFi.get(t) ?? new Set()).add(a.J4n),
          this.DFi.set(t, o),
          (e = this.qFi(a, t))),
        r.add(e.GetTabId());
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshGoodsList,
      r,
    );
  }
  BFi(e) {
    var t = e.J4n,
      o = e.RMs,
      r = new Set();
    for (const a of o)
      r.add(a.J4n),
        0 < this.qFi(a, t).GetTabId() &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Pay", 28, "有标签");
    this.DFi.set(t, r),
      this.RFi.set(t, MathUtils_1.MathUtils.LongToBigInt(e.pxs)),
      (this.PFi = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Shop",
          11,
          "PayShop:Root 刷新商城数据",
          ["ShopId", t],
          ["goodsLength", r.size],
        );
  }
  bFi(e) {
    return !0;
  }
  RefreshPayShopGoods(e) {
    var t = new PayShopGoodsData_1.PayShopGoodsData();
    t.Phrase(e), this.uFi.get(e.J4n).SetGoodsData(t);
  }
  qFi(e, t) {
    var o = new PayShopGoodsData_1.PayShopGoodsData(),
      e = (o.Phrase(e), new PayShopGoods_1.PayShopGoods(t));
    return e.SetGoodsData(o), this.uFi.set(o.Id, e), e;
  }
  UnLockPayShopGoods(e) {
    var t = new Map();
    for (const r of e) {
      var o = this.uFi.get(r);
      o.SetUnLock();
      let e = t.get(o.PayShopId);
      (e = e || new Set()).add(o.GetTabId()), t.set(o.PayShopId, e);
    }
    (this.PFi = !0),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnLockGoods, t);
  }
  GetPayShopIdList() {
    return this.PFi
      ? ((this.PFi = !1),
        (this.xFi = []),
        this.DFi.forEach((e, t) => {
          ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t)
            .Enable && this.xFi.push(t);
        }),
        this.xFi.sort((e, t) => {
          var o =
              ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e),
            r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t);
          return o.Sort !== r.Sort ? o.Sort - r.Sort : e - t;
        }))
      : this.xFi;
  }
  GetPayShopTabIdList(a) {
    var e = new Set();
    for (const o of this.DFi.get(a)) {
      var t = this.uFi.get(o);
      e.has(t.GetTabId()) || e.add(t.GetTabId());
    }
    return Array.from(e).sort((e, t) => {
      var o = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
          a,
          e,
        ),
        r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
          a,
          t,
        );
      return o.Sort !== r.Sort ? o.Sort - r.Sort : e - t;
    });
  }
  GFi(e, t = 1) {
    return 3 === e && 1 === t;
  }
  NFi(e, t = 1) {
    var o = [];
    if (this.GFi(e, t))
      for (const a of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList())
        a.GetGetPayGiftData().ShowInShop() && o.push(a);
    t = this.DFi.get(e);
    if (t)
      for (const n of t) {
        var r = this.uFi.get(n);
        o.push(r);
      }
    return o;
  }
  CheckGoodIfShowInTab(e, t) {
    var o = [];
    for (const t of this.DFi.get(e)) {
      var r = this.uFi.get(t);
      o.push(r);
    }
    for (const a of o) if (a.GetGoodsId() === t) if (this.Wta(a)) return !0;
    return !1;
  }
  GetPayShopTabData(e, t = 1) {
    var o = [];
    for (const r of this.NFi(e, t))
      r.GetTabId() === t && this.Wta(r) && o.push(r);
    e = this.Ljs(e);
    return o.sort(e);
  }
  Wta(e) {
    return !(
      !e.IsShowInShop() ||
      !e.InSellTime() ||
      !e.GetGoodsData().Show ||
      (e.GetGoodsData().HasBuyLimit() &&
        0 === e.GetGoodsData().GetRemainingCount() &&
        !e.GetGoodsData().IsWeeklyRefresh() &&
        !e.GetGoodsData().IfShowAfterSoldOut()) ||
      (e.GetGoodsData().HasBuyLimit() &&
        0 === e.GetGoodsData().GetRemainingCount() &&
        e.GetGoodsData().IsWeeklyRefresh() &&
        e.GetGoodsData().UpdateTime >= e.GetGoodsData().EndTime &&
        !e.IsPermanentSell())
    );
  }
  Ljs(e) {
    return 1 !==
      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e).SortRule
      ? this.wFi
      : this.Tjs;
  }
  GetPayShopGoods(e) {
    return this.uFi.get(e);
  }
  GetPayShopCountDownData(e) {
    var t,
      e = this.RFi.get(e);
    if (!(void 0 === e || e <= 0))
      return (
        (e = Number(e)),
        (t = PayShopGoods_1.PayShopGoods.GetTimeTypeData(e)),
        (e = e - Math.ceil(TimeUtil_1.TimeUtil.GetServerTime())),
        0 === t[0]
          ? {
              CountDownText:
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "NotEnoughOneHour",
                ),
              RemainingTime: e,
            }
          : TimeUtil_1.TimeUtil.GetCountDownData(e)
      );
  }
  GetPayShopUpdateTime(e) {
    e = this.RFi.get(e);
    return e ? Number(e) : 0;
  }
  UpdatePayShopGoodsCount(e, t) {
    var o = this.uFi.get(e);
    o.IsLimitGoods() &&
      (o.AddBoughtCount(t), o.IsSoldOut()) &&
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GoodsSoldOut, e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshGoods,
        e,
        o.PayShopId,
        o.GetTabId(),
      );
  }
  GetNeedCheckGoods(e) {
    var t = [];
    for (const o of this.NFi(e))
      o.IsShowInShop() &&
        (o.InUpdateTime() || o.InUnPermanentSellTime()) &&
        t.push(o);
    return t;
  }
  CheckPayShopEntranceHasRedDot() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10010))
      for (const e of this.GetPayShopIdList())
        if (this.CheckPayShopHasRedDot(e)) return !0;
    return !1;
  }
  CheckPayShopHasRedDot(e) {
    if (1 === e)
      return ModelManager_1.ModelManager.MonthCardModel.GetPayButtonRedDotState();
    for (const t of this.GetPayShopTabIdList(e))
      if (this.CheckPayShopTabHasRedDot(e, t)) return !0;
    return !1;
  }
  CheckPayShopTabHasRedDot(e, t = 1) {
    let o = [];
    for (const r of (o = this.GFi(e, t)
      ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()
      : this.GetPayShopTabData(e, t)))
      if (this.OFi(r)) return !0;
    return !1;
  }
  OFi(e) {
    return (
      !(e.IsLocked() || !e.IfCanBuy() || e.IsSoldOut() || e.IsDirect()) &&
      0 === e.GetPriceData().NowPrice
    );
  }
  ClearData() {
    this.DFi.clear(), this.uFi.clear(), this.RFi.clear();
  }
}
exports.PayShopModel = PayShopModel;
//# sourceMappingURL=PayShopModel.js.map
