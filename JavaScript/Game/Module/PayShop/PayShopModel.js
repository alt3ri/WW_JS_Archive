"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PayShopGoods_1 = require("./PayShopData/PayShopGoods"),
  PayShopGoodsData_1 = require("./PayShopData/PayShopGoodsData"),
  PayShopDefine_1 = require("./PayShopDefine"),
  DEFAULTTAB = 1;
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
      (this.L4a = (e, t) =>
        e.GetGoodsData().GetSortValue() !== t.GetGoodsData().GetSortValue()
          ? e.GetGoodsData().GetSortValue() - t.GetGoodsData().GetSortValue()
          : e.GetGoodsId() - t.GetGoodsId()),
      (this.A4a = (e, t) =>
        e.GetItemData().Quality !== t.GetItemData().Quality
          ? t.GetItemData().Quality - e.GetItemData().Quality
          : e.GetGoodsData().GetSortValue() !== t.GetGoodsData().GetSortValue()
            ? e.GetGoodsData().GetSortValue() - t.GetGoodsData().GetSortValue()
            : e.GetGoodsId() - t.GetGoodsId()),
      (this.Qjs = (e, t) => {
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
  SetPayShopInfo(e) {
    this.BFi(e), (this.AFi = e.s5n);
  }
  SetPayShopGoodsList(e) {
    var t,
      o,
      r = new Set();
    for (const a of e) {
      let e = this.uFi.get(a.s5n);
      e
        ? this.RefreshPayShopGoods(a)
        : ((t =
            ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
              a.s5n,
            ).ShopId),
          (o = this.DFi.get(t) ?? new Set()).add(a.s5n),
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
    var t = e.s5n,
      o = e.bMs,
      r = new Set();
    for (const a of o) r.add(a.s5n), this.qFi(a, t);
    this.DFi.set(t, r),
      this.RFi.set(t, MathUtils_1.MathUtils.LongToBigInt(e.Lxs)),
      (this.PFi = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Shop",
          10,
          "PayShop:Root 刷新商城数据",
          ["ShopId", t],
          ["goodsLength", r.size],
        );
  }
  RefreshPayShopGoods(e) {
    var t = new PayShopGoodsData_1.PayShopGoodsData();
    t.Phrase(e), this.uFi.get(e.s5n).SetGoodsData(t);
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
  GetPayShopTabIdList(a, e = !0) {
    var t = new Set();
    if (1 === a)
      for (const n of ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendData())
        t.has(n.Id) || t.add(n.Id);
    else
      for (const i of this.DFi.get(a)) {
        var o = this.uFi.get(i);
        t.has(o.GetTabId()) || t.add(o.GetTabId());
      }
    var r = Array.from(t);
    return (
      e &&
        r.sort((e, t) => {
          var o =
              ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
                a,
                e,
              ),
            r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
              a,
              t,
            );
          return o.Sort !== r.Sort ? o.Sort - r.Sort : e - t;
        }),
      r
    );
  }
  GetPayShopFirstTabId(e) {
    var t = this.DFi.get(e);
    if (!t) return 0;
    let o = 0,
      r = 0;
    for (const i of t) {
      var a,
        n = this.uFi.get(i).GetTabId();
      0 === o && 0 === r
        ? ((o = n),
          (r = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
            e,
            o,
          ).Sort))
        : ((a = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
            e,
            n,
          ).Sort),
          (r > a || (r === a && o > n)) && ((o = n), (r = a)));
    }
    return o;
  }
  GFi(e, t = 1) {
    return 3 === e && t === DEFAULTTAB;
  }
  aUl(e, t = 1) {
    return 6 === e && t === DEFAULTTAB;
  }
  NFi(e, t = 1) {
    var o = [];
    if (this.GFi(e, t))
      for (const a of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList())
        a.GetGetPayGiftData().ShowInShop() &&
          a.GetGetPayGiftData().CanShowInShopTab() &&
          o.push(a);
    else if (this.aUl(e, t))
      for (const n of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList())
        n.GetGetPayGiftData().ShowInSkinShop() &&
          n.GetGetPayGiftData().CanShowInShopTab() &&
          o.push(n);
    t = this.DFi.get(e);
    if (t)
      for (const i of t) {
        var r = this.uFi.get(i);
        o.push(r);
      }
    return o;
  }
  GetGoodsInTab(e, t) {
    var o = [];
    for (const a of this.DFi.get(e)) {
      var r = this.uFi.get(a);
      o.push(r);
    }
    for (const n of o)
      if (n.GetItemData().ItemId === t) if (n.CheckGoodIfShow()) return n;
  }
  GetPayShopTabData(e, t = 1, o = !0) {
    if (-1 === e || 0 === e) return [];
    var r = [];
    for (const a of this.NFi(e, t))
      a.GetTabId() === t && a.CheckGoodIfShow() && r.push(a);
    return o ? this.R4a(e, r) : r;
  }
  R4a(e, t) {
    if (
      1 ===
      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e).SortRule
    ) {
      var o = [],
        r = [],
        a = [];
      for (const n of t) (n.IsSoldOut() ? a : n.IfCanBuy() ? o : r).push(n);
      return (
        o.sort(this.A4a),
        r.sort(this.L4a),
        a.sort(this.A4a),
        o.concat(r).concat(a)
      );
    }
    e = this.$js(e);
    return t.sort(e);
  }
  $js(e) {
    return 1 !==
      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e).SortRule
      ? this.wFi
      : this.Qjs;
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
        (o.InUpdateTime() || o.InUnPermanentSellTime() || o.WillSell()) &&
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
    for (const t of this.GetPayShopTabIdList(e, !1))
      if (
        this.CheckPayShopTabHasRedDot(e, t) &&
        PayShopDefine_1.payShopViewTabType.includes(e)
      )
        return !0;
    return !1;
  }
  CheckPayShopTabHasRedDot(e, t = 1) {
    if (1 === e) return this.Hzl(e, t);
    let o = [];
    for (const r of (o = this.GFi(e, t)
      ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()
      : this.GetPayShopTabData(e, t, !1)))
      if (r.GetIfNeedRemind()) return !0;
    return !1;
  }
  Hzl(e, t = 1) {
    return (
      !!this.GetPayShopTabIdList(e, !1).includes(t) &&
      1 ===
        ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendDataById(t)
          .RecommendType &&
      ModelManager_1.ModelManager.MonthCardModel.GetPayButtonRedDotState()
    );
  }
  ReadShopItemCheckFlag(e, t = 1) {
    let o = [],
      r = !1;
    for (const a of (o = this.GFi(e, t)
      ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()
      : this.GetPayShopTabData(e, t, !1)))
      a.IsSoldOut() ||
        a.IsLocked() ||
        !a.IfCanBuy() ||
        ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked,
          a.GetGoodsId(),
        ) ||
        (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked,
          a.GetGoodsId(),
        ),
        (r = !0));
    return (
      r &&
        ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
          LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked,
        ),
      r
    );
  }
  CheckShopItemCheckFlag(e, t = 1) {
    let o = [];
    for (const r of (o = this.GFi(e, t)
      ? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()
      : this.GetPayShopTabData(e, t, !1)))
      if (!r.IsSoldOut() && !r.IsLocked() && r.IfCanBuy())
        if (
          !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.PayShopTabItemChecked,
            r.GetGoodsId(),
          )
        )
          return !0;
    return !1;
  }
  GetPayShopItemQualitySpriteByItemIdAndQuality(e, t) {
    return (
      13 ===
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)
        ? ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(t)
        : ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t)
    ).PayShopQualitySprite;
  }
  ClearData() {
    this.DFi.clear(), this.uFi.clear(), this.RFi.clear();
  }
}
exports.PayShopModel = PayShopModel;
//# sourceMappingURL=PayShopModel.js.map
