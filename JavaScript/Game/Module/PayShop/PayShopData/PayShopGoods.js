"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopGoods = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  PayShopItemBase_1 = require("../PayShopTab/TabItem/PayShopItemBase");
class PayShopGoods {
  constructor(t) {
    (this.Pe = void 0),
      (this.S2i = !1),
      (this.PayShopId = 1),
      (this.XNi = void 0),
      (this.E2i = 0),
      (this.PayShopId = t);
  }
  SetGoodsData(t) {
    (this.Pe = t),
      (this.S2i = this.InSellTime()),
      (this.XNi = new PayShopItemBase_1.PayShopItemBaseSt()),
      this.XNi.PhraseFromPayItemData(this);
  }
  SetPayGiftId(t) {
    this.E2i = t;
  }
  GetGetPayGiftData() {
    return ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(
      this.E2i,
    );
  }
  GetGoodsData() {
    return this.Pe;
  }
  IsLocked() {
    return this.Pe.Locked;
  }
  GetConditionTextId() {
    var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
      this.Pe.Id,
    ).BuyConditionId;
    return 0 !== t
      ? LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
          t,
        ) ?? ""
      : "";
  }
  GetDiscountLabel() {
    return this.Pe.LabelId;
  }
  GetItemData() {
    var t = ConfigManager_1.ConfigManager.InventoryConfig,
      e = this.Pe.ItemId,
      t = t.GetItemConfigData(e);
    return { Quality: t.QualityId, ItemId: e, Name: t.Name };
  }
  IfPayGift() {
    return this.Pe.IfPayGift();
  }
  GetPriceData() {
    var t = this.Pe.GetNowPrice(),
      e = this.Pe.GetOriginalPrice();
    const i = this.Pe.Price.Id;
    var r =
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i);
    return {
      OwnNumber: () =>
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i),
      NowPrice: t,
      OriginalPrice: e,
      CurrencyId: i,
      Enough: 0 <= r - t,
      InDiscountTime: this.Pe.HasDiscount(),
    };
  }
  GetDirectPriceText() {
    var t = ModelManager_1.ModelManager.KuroSdkModel?.GetQueryProductShowPrice(
      this.Pe.Price.Id.toString(),
    );
    return (
      t ||
      ((t = this.Pe.Price.Id),
      ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(t))
    );
  }
  GetRemainingData() {
    var t;
    if (this.Pe.HasBuyLimit())
      return (
        (t = this.Pe.GetRemainingCount()),
        { TextId: this.Pe.GetRemainingTextId(), Count: t }
      );
  }
  SetUnLock() {
    this.Pe.SetUnLock();
  }
  GetDiscount() {
    return this.Pe.GetDiscount();
  }
  HasDiscount() {
    return this.Pe.HasDiscount();
  }
  IsPermanentDiscount() {
    return (
      (0 === this.Pe.EndPromotionTime && 0 === this.Pe.BeginPromotionTime) ||
      (0 === this.Pe.EndPromotionTime &&
        TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime))
    );
  }
  IsPermanentSell() {
    return (
      (0 === this.Pe.BeginTime && 0 === this.Pe.EndTime) ||
      (TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime) &&
        0 === this.Pe.EndTime)
    );
  }
  InSellTime() {
    return (
      !!this.IsPermanentSell() ||
      (Number(this.Pe.EndTime) > TimeUtil_1.TimeUtil.GetServerTime() &&
        TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime))
    );
  }
  InLabelShowTime() {
    return this.Pe.InLabelShowTime();
  }
  InUnPermanentSellTime() {
    return (
      !this.IsPermanentSell() &&
      Number(this.Pe.EndTime) > TimeUtil_1.TimeUtil.GetServerTime() &&
      TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime)
    );
  }
  GetDiscountTimeData() {
    var t,
      e = this.Pe.GetPromotionText();
    return StringUtils_1.StringUtils.IsEmpty(e)
      ? ((t = Number(this.Pe.EndPromotionTime)),
        PayShopGoods.GetEndTimeShowText(t))
      : e;
  }
  GetDiscountRemainTime() {
    var t =
      Number(this.Pe.EndPromotionTime) - TimeUtil_1.TimeUtil.GetServerTime();
    let e = TimeUtil_1.TimeUtil.CalculateRemainingTime(t);
    return (e = e || {
      TimeValue: 0,
      RemainingTime: 0 + TimeUtil_1.TimeUtil.TimeDeviation,
      TextId: CommonDefine_1.remainTimeTextId[1],
    });
  }
  GetDiscountCountDown() {
    var t =
      Number(this.Pe.EndPromotionTime) - TimeUtil_1.TimeUtil.GetServerTime();
    return TimeUtil_1.TimeUtil.GetCountDownData(t);
  }
  GetUpdateTimeRemainData() {
    var t = Number(this.Pe.UpdateTime);
    return PayShopGoods.GetEndTimeShowText(t);
  }
  GetUpdateRemainTime() {
    return (
      Number(this.Pe.UpdateTime) -
      TimeUtil_1.TimeUtil.GetServerTime() +
      TimeUtil_1.TimeUtil.TimeDeviation
    );
  }
  InUpdateTime() {
    return (
      !!this.Pe.HasBuyLimit() &&
      0 !== this.Pe.UpdateTime &&
      Number(this.Pe.UpdateTime) > TimeUtil_1.TimeUtil.GetServerTime()
    );
  }
  NeedUpdate() {
    return this.InSellTime() && !this.S2i
      ? (this.S2i = !0)
      : !!this.Pe.HasBuyLimit() &&
          0 !== this.Pe.UpdateTime &&
          Number(this.Pe.UpdateTime) <= TimeUtil_1.TimeUtil.GetServerTime() &&
          this.InSellTime();
  }
  static GetEndTimeShowText(t) {
    var e = TimeUtil_1.TimeUtil.GetServerTime(),
      t = Math.max(t - e, 0),
      e = PayShopGoods.GetTimeTypeData(t);
    return 0 === e[0]
      ? ConfigManager_1.ConfigManager.TextConfig.GetTextById("NotEnoughOneHour")
      : TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e[0], e[1])
          .CountDownText;
  }
  static GetTimeTypeData(t) {
    return t > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : t > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 2]
        : [0, 0];
  }
  GetTimeRemainData(t) {
    t -= TimeUtil_1.TimeUtil.GetServerTime();
    let e = TimeUtil_1.TimeUtil.CalculateRemainingTime(t);
    return (e = e || {
      TimeValue: 0,
      RemainingTime: 0,
      TextId: CommonDefine_1.remainTimeTextId[1],
    });
  }
  GetEndTimeRemainData() {
    var t,
      e = this.Pe.GetSellTimeText();
    return StringUtils_1.StringUtils.IsEmpty(e)
      ? ((t = Number(this.Pe.EndTime)), PayShopGoods.GetEndTimeShowText(t))
      : e;
  }
  GetDownTipsText() {
    if (this.CheckIfMonthCardItem())
      return ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "MonthlyCardMax",
      );
    if (this.IsLimitGoods() && this.IsSoldOut())
      return ConfigManager_1.ConfigManager.TextConfig.GetTextById("SoldOut");
    if (!this.IfCanBuy()) {
      if (this.GetGoodsData().GetItemConfig().ShowTypes.includes(30))
        return ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "Text_Shop_Role_Text",
        );
      var t = this.GetConditionTextId();
      if (!StringUtils_1.StringUtils.IsEmpty(t))
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    }
    return "";
  }
  GetConditionLimitText() {
    return this.Pe.GetIfCanBuy() ? "" : this.Pe.GetUnFinishConditionText();
  }
  GetExtraLimitText() {
    var t;
    return this.CheckIfMonthCardItem()
      ? "Text_MonthlyCardMax_Text"
      : this.IfCanBuy()
        ? void 0
        : this.GetGoodsData().GetItemConfig().ShowTypes.includes(30)
          ? ((t = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
              this.GetGoodsData().ItemId,
            )[0]),
            void 0 ===
            ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t)
              ? "DontHaveRole"
              : "RoleBrenchItemMax")
          : this.GetConditionTextId();
  }
  GetIfNeedExtraLimitText() {
    return this.CheckIfMonthCardItem()
      ? !ModelManager_1.ModelManager.MonthCardModel.IsRemainDayInMaxLimit()
      : !this.IfCanBuy();
  }
  GetIfNeedShowDownTipsText() {
    if (this.CheckIfMonthCardItem()) {
      var t = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
      if (
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MonthCardMaxDays",
        ) < t
      )
        return !0;
    }
    return !(!this.IsLimitGoods() || !this.IsSoldOut()) || !this.IfCanBuy();
  }
  GetSpriteTextBgColor() {
    if (this.CheckIfMonthCardItem()) {
      var t = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
      if (
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MonthCardMaxDays",
        ) < t
      )
        return "3E3E3BFF";
    }
    return this.IsLimitGoods() && this.IsSoldOut() ? "6C6C6CFF" : "F9F9F9FF";
  }
  GetTextTipsColor() {
    if (this.CheckIfMonthCardItem()) {
      var t = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
      if (
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MonthCardMaxDays",
        ) < t
      )
        return "F9F9F9FF";
    }
    return this.IsLimitGoods() && this.IsSoldOut() ? "F9F9F9FF" : "181818FF";
  }
  GetCountDownData() {
    let t = void 0,
      e = 0,
      i = 0;
    return (
      t ||
        (this.IsLimitGoods() &&
          this.GetGoodsData().IsWeeklyRefresh() &&
          0 === this.GetRemainingData().Count &&
          this.GetGoodsData().IfMayReSell() &&
          ((t = this.GetUpdateTimeRemainData()),
          (e = 2),
          (i = this.GetTimeRemainData(this.Pe.UpdateTime)?.RemainingTime))),
      t ||
        (this.HasDiscount() &&
          !this.IsPermanentDiscount() &&
          ((t = this.GetDiscountTimeData()),
          (e = 1),
          (i = this.GetTimeRemainData(this.Pe.EndPromotionTime).RemainingTime)),
        t) ||
        ((t = this.GetEndTimeRemainData()),
        (e = 3),
        (i = this.GetTimeRemainData(this.Pe.EndTime)?.RemainingTime)),
      [e, t, i]
    );
  }
  GetResellText() {
    let t = "";
    return (
      this.IsLimitGoods() &&
        this.GetGoodsData().IsWeeklyRefresh() &&
        (0 !== this.GetRemainingData().Count ||
        this.GetGoodsData().IfMayReSell()
          ? 0 === this.GetRemainingData().Count &&
            this.GetGoodsData().IfMayReSell() &&
            (t = "ReSell")
          : (t = "DistanceToDown")),
      t
    );
  }
  GetExchangePopViewResellText() {
    let t = "";
    return (t =
      this.IsLimitGoods() &&
      this.GetGoodsData().IsWeeklyRefresh() &&
      0 === this.GetRemainingData().Count &&
      this.GetGoodsData().IfMayReSell()
        ? "SoldOut"
        : t);
  }
  GetBuyLimitText() {
    if (this.IsLimitGoods()) {
      let t = "";
      var e;
      return "LimitBuy" ===
        (t =
          0 === this.Pe.UpdateType
            ? "LimitBuy"
            : 1 === this.Pe.UpdateType
              ? "DailyLeftTime"
              : 2 === this.Pe.UpdateType
                ? "WeekLeftTime"
                : 3 === this.Pe.UpdateType
                  ? "MonthLeftTime"
                  : "LimitBuy")
        ? ((e = this.Pe.BuyLimit - this.Pe.BoughtCount),
          StringUtils_1.StringUtils.Format(
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(t),
            e.toString(),
            this.Pe.BuyLimit.toString(),
          ))
        : StringUtils_1.StringUtils.Format(
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(t),
            (this.Pe.BuyLimit - this.Pe.BoughtCount).toString(),
          );
    }
    return "";
  }
  GetExchangeViewShopTipsText() {
    if (this.CheckIfMonthCardItem())
      return ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText();
    if (this.IsLimitGoods()) {
      let t = "",
        e =
          ((t =
            0 === this.Pe.UpdateType
              ? "LimitBuy_B"
              : 1 === this.Pe.UpdateType
                ? "DayLimitBuy_B"
                : 2 === this.Pe.UpdateType
                  ? "WeekLimitBuy_B"
                  : 3 === this.Pe.UpdateType
                    ? "MonthLimitBuy_B"
                    : "LimitBuy_B"),
          "");
      var i = this.Pe.BuyLimit - this.Pe.BoughtCount;
      return (
        (e =
          0 < this.GetGoodsData().GetRemainingCount()
            ? StringUtils_1.StringUtils.Format(
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "BuyTextEnough",
                ),
                i.toString(),
                this.Pe.BuyLimit.toString(),
              )
            : StringUtils_1.StringUtils.Format(
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "BuyTextNotEnough",
                ),
                i.toString(),
                this.Pe.BuyLimit.toString(),
              )),
        StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(t),
          e,
        )
      );
    }
    return "";
  }
  GetShopTipsText() {
    if (this.CheckIfMonthCardItem())
      return ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText();
    if (this.IsLimitGoods()) {
      let t = "";
      t =
        0 === this.Pe.UpdateType
          ? "LimitBuy"
          : 1 === this.Pe.UpdateType
            ? "DayLimitBuy"
            : 2 === this.Pe.UpdateType
              ? "WeekLimitBuy"
              : 3 === this.Pe.UpdateType
                ? "MonthLimitBuy"
                : "LimitBuy";
      var e = this.Pe.BuyLimit - this.Pe.BoughtCount;
      return StringUtils_1.StringUtils.Format(
        ConfigManager_1.ConfigManager.TextConfig.GetTextById(t),
        e.toString(),
        this.Pe.BuyLimit.toString(),
      );
    }
    return "";
  }
  GetTabId() {
    return this.Pe.TabId;
  }
  IsLimitGoods() {
    return this.Pe.HasBuyLimit();
  }
  IfCanBuy() {
    if (this.CheckIfMonthCardItem()) {
      var e = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays(),
        i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
          this.GetGoodsData().ItemId,
        );
      let t = i.Parameters.get(
        ItemDefines_1.EItemFunctionType.ManualOpenMonthCard,
      );
      if (
        !(t =
          t ||
          i.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenMonthCard))
      )
        return !0;
      if (
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MonthCardMaxDays",
        ) < e
      )
        return !1;
    }
    i = this.GetGoodsData().GetItemConfig();
    if (i && i.ShowTypes?.includes(30)) {
      e = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
        this.GetGoodsData().ItemId,
      );
      if (e && 0 < e.length)
        return (
          (i = e[0]),
          !!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i) &&
            0 <
              ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(
                i,
              )
        );
    }
    return this.Pe.GetIfCanBuy();
  }
  IsSoldOut() {
    return !!this.Pe.HasBuyLimit() && this.Pe.BoughtCount === this.Pe.BuyLimit;
  }
  GetGoodsId() {
    return this.Pe.Id;
  }
  IsDirect() {
    return this.Pe.IsDirect();
  }
  AddBoughtCount(t) {
    this.Pe.BoughtCount += t;
  }
  IsShowInShop() {
    return this.Pe.IsShowInShop();
  }
  ConvertToPayShopBaseSt() {
    return this.XNi.Refresh(this), this.XNi;
  }
  CheckIfMonthCardItem() {
    return (
      this.GetGoodsData().Id ===
      ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId()
    );
  }
}
exports.PayShopGoods = PayShopGoods;
//# sourceMappingURL=PayShopGoods.js.map
