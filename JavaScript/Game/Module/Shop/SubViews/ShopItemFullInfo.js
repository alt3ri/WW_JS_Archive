"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopItemFullInfo = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ShopDefine_1 = require("../ShopDefine"),
  ShopUtils_1 = require("../ShopUtils");
class ItemPrice {
  constructor(t, i, e) {
    (this.CoinId = t), (this.CoinPrice = i), (this.OriginalPrice = e);
  }
}
class ShopItemFullInfo {
  constructor(t, s, i) {
    (this.DefaultPrice = void 0),
      (this.Price = new Map()),
      (this.ConditionText = ""),
      (this.ItemInfo = t),
      (this.BoughtCount = s.s8n ?? 0),
      (this.IsLocked = s.h3n),
      (this.BuyLimit = s.yxs),
      (this.StackSize = s.k4n),
      s.Exs.forEach((i, t) => {
        var e = s.Ixs.find((t) => t.gVn === i.gVn),
          e = new ItemPrice(i.gVn, i.Mxs, e?.Mxs ?? -1);
        this.Price.set(i.gVn, e), 0 === t && (this.DefaultPrice = e);
      }),
      (this.Id = s.Ekn),
      (this.Label = s.Txs),
      (this.BeginTime = s.HCs ?? 0),
      (this.EndTime = s.jCs ?? 0);
    t = ConfigManager_1.ConfigManager.ShopConfig.GetShopFixedInfoByItemId(
      i,
      s.Ekn,
    );
    0 !== t.CondId &&
      (this.ConditionText =
        ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
          t?.CondId,
        ).HintText),
      (this.SwitchText = s.Lxs),
      (this.PurchaseText = s.Rxs),
      (this.ItemId = s.G3n),
      (this.ShopId = i);
  }
  get LockInfo() {
    var t, i, e, s;
    if (
      0 < this.BeginTime &&
      this.BeginTime > TimeUtil_1.TimeUtil.GetServerTime()
    )
      return (
        (s = Math.trunc(this.BeginTime - TimeUtil_1.TimeUtil.GetServerTime())),
        (t = Math.trunc(s / ShopDefine_1.SECONDS_PER_DAY)),
        (i = Math.trunc(
          (s % ShopDefine_1.SECONDS_PER_DAY) / ShopDefine_1.SECONDS_PRE_HOUR,
        )),
        (e = Math.trunc(
          (s % ShopDefine_1.SECONDS_PRE_HOUR) / ShopDefine_1.SECONDS_PRE_MIN,
        )),
        (s = Math.trunc(s) % ShopDefine_1.SECONDS_PRE_MIN),
        0 < t
          ? StringUtils_1.StringUtils.Format(
              ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                "ShopLockTime1",
              ),
              t.toString(),
            )
          : 0 < i
            ? StringUtils_1.StringUtils.Format(
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "ShopLockTime2",
                ),
                i.toString(),
              )
            : 0 < e
              ? StringUtils_1.StringUtils.Format(
                  ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                    "ShopLockTime3",
                  ),
                  e.toString(),
                )
              : StringUtils_1.StringUtils.Format(
                  ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                    "ShopLockTime4",
                  ),
                  s.toString(),
                )
      );
    return this.IsLocked ? this.ConditionText : "";
  }
  IsUnlocked() {
    return !(
      (0 < this.BeginTime &&
        this.BeginTime > TimeUtil_1.TimeUtil.GetServerTime()) ||
      this.IsLocked
    );
  }
  InSellTime() {
    return (
      !(0 < this.EndTime) ||
      (TimeUtil_1.TimeUtil.GetServerTime() >= this.BeginTime &&
        this.EndTime > TimeUtil_1.TimeUtil.GetServerTime())
    );
  }
  IsAffordable(t = 1) {
    return (
      !!this.DefaultPrice &&
      ShopUtils_1.ShopUtils.GetResource(this.DefaultPrice.CoinId) >=
        this.DefaultPrice.CoinPrice * t
    );
  }
  GetMaxBuyCount() {
    var t;
    return this.DefaultPrice
      ? ((t = ShopUtils_1.ShopUtils.GetResource(this.DefaultPrice.CoinId)),
        (t = Math.trunc(t / this.DefaultPrice.CoinPrice)),
        0 < this.BuyLimit ? Math.min(this.BuyLimit - this.BoughtCount, t) : t)
      : -1;
  }
  IsOutOfDate() {
    return (
      0 < this.EndTime && this.EndTime < TimeUtil_1.TimeUtil.GetServerTime()
    );
  }
  IsSoldOut() {
    return 0 < this.BuyLimit && this.BoughtCount === this.BuyLimit;
  }
  InSaleTime() {
    var t;
    return (
      0 < this.BeginTime &&
      0 < this.EndTime &&
      ((t = TimeUtil_1.TimeUtil.GetServerTime()), this.BeginTime < t) &&
      t < this.EndTime
    );
  }
  IsOutOfStock() {
    return (
      (0 < this.BuyLimit && this.BoughtCount === this.BuyLimit) ||
      (0 < this.EndTime && this.EndTime < TimeUtil_1.TimeUtil.GetServerTime())
    );
  }
  IsInteractive() {
    return this.IsUnlocked() && !this.IsOutOfStock();
  }
  GetMoneyId() {
    return this.DefaultPrice ? this.DefaultPrice.CoinId : -1;
  }
  GetDefaultPrice() {
    return this.DefaultPrice ? this.DefaultPrice.CoinPrice : -1;
  }
  GetPrice(t) {
    return this.Price && 0 !== this.Price.size
      ? this.Price.get(t).CoinPrice
      : -1;
  }
  GetOriginalPrice() {
    return this.DefaultPrice ? this.DefaultPrice.OriginalPrice : -1;
  }
}
exports.ShopItemFullInfo = ShopItemFullInfo;
//# sourceMappingURL=ShopItemFullInfo.js.map
