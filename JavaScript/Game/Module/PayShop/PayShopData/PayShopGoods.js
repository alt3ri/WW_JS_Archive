"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopGoods = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const PayShopItemBase_1 = require("../PayShopTab/TabItem/PayShopItemBase");
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
    const t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
      this.Pe.Id,
    ).BuyConditionId;
    return t !== 0
      ? LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
          t,
        ) ?? ""
      : "";
  }
  GetDiscountLabel() {
    return this.Pe.LabelId;
  }
  GetItemData() {
    var t = ConfigManager_1.ConfigManager.InventoryConfig;
    const e = this.Pe.ItemId;
    var t = t.GetItemConfigData(e);
    return { Quality: t.QualityId, ItemId: e, Name: t.Name };
  }
  IfPayGift() {
    return this.Pe.IfPayGift();
  }
  GetPriceData() {
    const t = this.Pe.GetNowPrice();
    const e = this.Pe.GetOriginalPrice();
    const i = this.Pe.Price.Id;
    const r =
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i);
    return {
      OwnNumber: () =>
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i),
      NowPrice: t,
      OriginalPrice: e,
      CurrencyId: i,
      Enough: r - t >= 0,
      InDiscountTime: this.Pe.HasDiscount(),
    };
  }
  GetDirectPriceText() {
    let t = ModelManager_1.ModelManager.KuroSdkModel?.GetQueryProductShowPrice(
      this.Pe.Price.Id.toString(),
    );
    return (
      t ||
      ((t = this.Pe.Price.Id),
      ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(t))
    );
  }
  GetRemainingData() {
    let t;
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
      (this.Pe.EndPromotionTime === 0 && this.Pe.BeginPromotionTime === 0) ||
      (this.Pe.EndPromotionTime === 0 &&
        TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime))
    );
  }
  IsPermanentSell() {
    return (
      (this.Pe.BeginTime === 0 && this.Pe.EndTime === 0) ||
      (TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime) &&
        this.Pe.EndTime === 0)
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
    let t;
    const e = this.Pe.GetPromotionText();
    return StringUtils_1.StringUtils.IsEmpty(e)
      ? ((t = Number(this.Pe.EndPromotionTime)),
        PayShopGoods.GetEndTimeShowText(t))
      : e;
  }
  GetDiscountRemainTime() {
    const t =
      Number(this.Pe.EndPromotionTime) - TimeUtil_1.TimeUtil.GetServerTime();
    let e = TimeUtil_1.TimeUtil.CalculateRemainingTime(t);
    return (e = e || {
      TimeValue: 0,
      RemainingTime: 0 + TimeUtil_1.TimeUtil.TimeDeviation,
      TextId: CommonDefine_1.remainTimeTextId[1],
    });
  }
  GetDiscountCountDown() {
    const t =
      Number(this.Pe.EndPromotionTime) - TimeUtil_1.TimeUtil.GetServerTime();
    return TimeUtil_1.TimeUtil.GetCountDownData(t);
  }
  GetUpdateTimeRemainData() {
    const t = Number(this.Pe.UpdateTime);
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
      this.Pe.UpdateTime !== 0 &&
      Number(this.Pe.UpdateTime) > TimeUtil_1.TimeUtil.GetServerTime()
    );
  }
  NeedUpdate() {
    return this.InSellTime() && !this.S2i
      ? (this.S2i = !0)
      : !!this.Pe.HasBuyLimit() &&
          this.Pe.UpdateTime !== 0 &&
          Number(this.Pe.UpdateTime) <= TimeUtil_1.TimeUtil.GetServerTime() &&
          this.InSellTime();
  }
  static GetEndTimeShowText(t) {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    var t = Math.max(t - e, 0);
    var e = PayShopGoods.GetTimeTypeData(t);
    return e[0] === 0
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
    let t;
    const e = this.Pe.GetSellTimeText();
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
      const t = this.GetConditionTextId();
      if (!StringUtils_1.StringUtils.IsEmpty(t))
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    }
    return "";
  }
  GetConditionLimitText() {
    return this.Pe.GetIfCanBuy() ? "" : this.Pe.GetUnFinishConditionText();
  }
  GetExtraLimitText() {
    let t;
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
      const t = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
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
      const t = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
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
      const t = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
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
    let t = void 0;
    let e = 0;
    let i = 0;
    return (
      t ||
        (this.IsLimitGoods() &&
          this.GetGoodsData().IsWeeklyRefresh() &&
          this.GetRemainingData().Count === 0 &&
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
        (this.GetRemainingData().Count !== 0 ||
        this.GetGoodsData().IfMayReSell()
          ? this.GetRemainingData().Count === 0 &&
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
      this.GetRemainingData().Count === 0 &&
      this.GetGoodsData().IfMayReSell()
        ? "SoldOut"
        : t);
  }
  GetBuyLimitText() {
    if (this.IsLimitGoods()) {
      let t = "";
      let e;
      return (t =
        this.Pe.UpdateType === 0
          ? "LimitBuy"
          : this.Pe.UpdateType === 1
            ? "DailyLeftTime"
            : this.Pe.UpdateType === 2
              ? "WeekLeftTime"
              : this.Pe.UpdateType === 3
                ? "MonthLeftTime"
                : "LimitBuy") === "LimitBuy"
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
      let t = "";
      let e =
        ((t =
          this.Pe.UpdateType === 0
            ? "LimitBuy_B"
            : this.Pe.UpdateType === 1
              ? "DayLimitBuy_B"
              : this.Pe.UpdateType === 2
                ? "WeekLimitBuy_B"
                : this.Pe.UpdateType === 3
                  ? "MonthLimitBuy_B"
                  : "LimitBuy_B"),
        "");
      const i = this.Pe.BuyLimit - this.Pe.BoughtCount;
      return (
        (e =
          this.GetGoodsData().GetRemainingCount() > 0
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
        this.Pe.UpdateType === 0
          ? "LimitBuy"
          : this.Pe.UpdateType === 1
            ? "DayLimitBuy"
            : this.Pe.UpdateType === 2
              ? "WeekLimitBuy"
              : this.Pe.UpdateType === 3
                ? "MonthLimitBuy"
                : "LimitBuy";
      const e = this.Pe.BuyLimit - this.Pe.BoughtCount;
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
      var e = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
      var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
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
      if (e && e.length > 0)
        return (
          (i = e[0]),
          !!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i) &&
            ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(
              i,
            ) > 0
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
// # sourceMappingURL=PayShopGoods.js.map
