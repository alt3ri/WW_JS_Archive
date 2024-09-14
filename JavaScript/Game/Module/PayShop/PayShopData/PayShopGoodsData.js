"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopGoodsData = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  PayShopDefine_1 = require("../PayShopDefine"),
  PayShopGoodsPrice_1 = require("./PayShopGoodsPrice");
class PayShopGoodsData {
  constructor() {
    (this.Id = 0),
      (this.TabId = 0),
      (this.ItemId = 0),
      (this.ItemCount = 0),
      (this.Locked = !1),
      (this.yFi = !0),
      (this.BuyLimit = 0),
      (this.BoughtCount = 0),
      (this.Price = new PayShopGoodsPrice_1.PayShopGoodsPrice()),
      (this.UpdateType = 0),
      (this.ShopItemType = 0),
      (this.BeginTime = 0),
      (this.EndTime = 0),
      (this.BeginPromotionTime = 0),
      (this.EndPromotionTime = 0),
      (this.UpdateTime = 0),
      (this.LabelId = 0),
      (this.LabelBeginTime = 0),
      (this.LabelEndTime = 0),
      (this.Sort = 0),
      (this.Show = !0),
      (this.PromotionShow = 0),
      (this.he = ""),
      (this.StageImage = ""),
      (this.IFi = 0),
      (this.OBn = ""),
      (this.Kjs = !1),
      (this.UnFinishedCondition = void 0),
      (this.SYa = !1);
  }
  Phrase(t) {
    this.Id = t.s5n;
    var i = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
      t.s5n,
    );
    (this.TabId = i.TabId),
      (this.ItemId = t.L8n),
      (this.ItemCount = t.n9n),
      (this.Locked = t.pBs),
      (this.yFi = t.LBs),
      (this.BuyLimit = t.dBs),
      (this.BoughtCount = t.X7n),
      this.Price.Phrase(t.MBs),
      (this.BeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.cps))),
      (this.EndTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.dps))),
      (this.BeginPromotionTime = Number(
        MathUtils_1.MathUtils.LongToBigInt(t.SBs),
      )),
      (this.EndPromotionTime = Number(
        MathUtils_1.MathUtils.LongToBigInt(t.EBs),
      )),
      (this.UpdateTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.Lxs))),
      (this.UpdateType = Number(t.OAs)),
      (this.ShopItemType = Number(t.yBs)),
      (this.LabelId = i.Tag),
      (this.LabelBeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.IBs))),
      (this.LabelEndTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.TBs))),
      (this.Sort = i.Sort),
      (this.PromotionShow = i.PromotionShow),
      (this.Kjs = i.SoldoutShowInShop),
      (this.SYa = t.Drh),
      this.MFi();
  }
  GetIfCanBuy() {
    if (this.IfRoleCallBackItem())
      return !(!this.IfHaveRoleCallBackItemNeedRole() || !this.IfCanResonant());
    if (
      this.CheckIfMonthCardItem() &&
      !ModelManager_1.ModelManager.MonthCardModel.CheckMonthCardIfCanBuy()
    )
      return !1;
    return !!this.yFi;
  }
  IfRoleCallBackItem() {
    var t = this.GetItemConfig();
    return !!t && !!t.ShowTypes && t.ShowTypes.includes(30);
  }
  IfHaveRoleCallBackItemNeedRole() {
    if (this.IfRoleCallBackItem()) {
      var t = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
        this.ItemId,
      )[0];
      if (
        void 0 === ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t)
      )
        return !1;
    }
    return !0;
  }
  IfCanResonant() {
    if (this.IfRoleCallBackItem()) {
      var t = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(
        this.ItemId,
      )[0];
      if (
        ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(
          t,
        ) <= 0
      )
        return !1;
    }
    return !0;
  }
  GetBuyConditionId() {
    return 1 === this.IFi
      ? this.UnFinishedCondition && 0 < this.UnFinishedCondition.length
        ? this.UnFinishedCondition[0]
        : 0
      : ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
          this.Id,
        ).BuyConditionId;
  }
  GetUnFinishConditionText() {
    if (this.IfRoleCallBackItem()) {
      if (!this.IfHaveRoleCallBackItemNeedRole())
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "DontHaveRole",
        );
      if (!this.IfCanResonant())
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "RoleBrenchItemMax",
        );
    }
    var t;
    return this.CheckIfMonthCardItem()
      ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_MonthlyCardMax_Text",
        )
      : 0 !== (t = this.GetBuyConditionId())
        ? ((t =
            LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
              t,
            ) ?? ""),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t))
        : "";
  }
  CheckIfMonthCardItem() {
    return (
      this.Id ===
      ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId()
    );
  }
  MFi() {
    let t = "";
    var i;
    "" === t &&
      (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          this.ItemId,
        ).Name,
      )),
      1 < this.ItemCount &&
        ((i =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "GoodsName",
          )),
        (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i)),
        (t = StringUtils_1.StringUtils.Format(
          i,
          t,
          this.ItemCount.toString(),
        ))),
      (this.OBn = LanguageSystem_1.LanguageSystem.PackageLanguage),
      (this.he = t);
  }
  PhraseFromPayPackageData(t) {
    (this.Id = t.Id),
      (this.ItemId = t.ItemId),
      (this.ItemCount = t.ItemCount),
      (this.Locked = t.IsLock),
      (this.yFi = t.IsCanBuy),
      (this.BuyLimit = t.BuyLimit),
      (this.BoughtCount = t.BoughtCount),
      (this.Price.Id = t.PayId),
      (this.BeginTime = t.BeginTime),
      (this.EndTime = t.EndTime),
      (this.UpdateTime = t.EndTime),
      (this.UpdateType = 0),
      (this.ShopItemType = 1),
      (this.LabelId = 0),
      (this.LabelBeginTime = 0),
      (this.LabelEndTime = 0),
      (this.Sort = t.Sort),
      (this.PromotionShow = 0),
      (this.TabId = t.TabId),
      (this.StageImage = t.StageImage),
      (this.IFi = 1),
      (this.SYa = t.IsRemind),
      0 < t.BuyCondition &&
        ((this.UnFinishedCondition = []),
        this.UnFinishedCondition.push(t.BuyCondition)),
      ModelManager_1.ModelManager.RechargeModel.SetRechargeInfo(
        t.PayId,
        t.Amount,
        t.ProductId,
      ),
      (this.he = t.GetName());
  }
  PhraseFromTempData(t, i) {
    (this.ItemId = t), (this.ItemCount = i), (this.IFi = -1);
    i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    this.he = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
  }
  GetItemConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
      this.ItemId,
    );
  }
  GetGoodsName(t) {
    return (
      this.OBn !== LanguageSystem_1.LanguageSystem.PackageLanguage &&
        this.MFi(),
      this.he
    );
  }
  IfMayReSell() {
    if (0 !== this.UpdateType && 4 !== this.UpdateType) {
      if (0 === Number(this.EndTime)) return !0;
      if (Number(this.UpdateTime) < Number(this.EndTime)) return !0;
    }
    return !1;
  }
  InLabelShowTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return (
      0 !== this.LabelId &&
      ((0 < this.LabelBeginTime &&
        t >= Number(this.LabelBeginTime) &&
        0 === this.LabelEndTime) ||
        (0 === this.LabelBeginTime && 0 === this.LabelEndTime) ||
        (Number(this.LabelEndTime) > t && t >= Number(this.LabelBeginTime)))
    );
  }
  GetSortValue() {
    return (
      0 === this.Sort
        ? ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
            this.Id,
          )
        : this
    ).Sort;
  }
  IsWeeklyRefresh() {
    return 0 !== this.UpdateType && 4 !== this.UpdateType;
  }
  IfShowAfterSoldOut() {
    return this.Kjs;
  }
  HasDiscount() {
    var t, i;
    return (
      !(this.Price.PromotionCount <= 0) &&
      ((i = TimeUtil_1.TimeUtil.GetServerTime()),
      (0 === this.EndPromotionTime && 0 === this.BeginPromotionTime) ||
        (0 === this.EndPromotionTime &&
          0 < this.BeginPromotionTime &&
          i >= Number(this.BeginPromotionTime)) ||
        ((t = TimeUtil_1.TimeUtil.IsExceededServerTime(this.EndPromotionTime)),
        (i =
          Number(this.EndPromotionTime) > i &&
          i >= Number(this.BeginPromotionTime)),
        t && i))
    );
  }
  GetOriginalPrice() {
    if (this.HasDiscount()) return this.Price.Count;
  }
  GetDiscount() {
    return this.Price.GetDiscount();
  }
  GetRemainingCount() {
    return this.BuyLimit - this.BoughtCount;
  }
  GetRemainingTextId() {
    return PayShopDefine_1.payShopUpdateTypeTextId[this.UpdateType];
  }
  HasBuyLimit() {
    return 0 < this.BuyLimit;
  }
  SetUnLock() {
    this.Locked = !1;
  }
  IsDirect() {
    return 1 === this.ShopItemType;
  }
  GetNowPrice() {
    return this.HasDiscount() ? this.Price.PromotionCount : this.Price.Count;
  }
  GetPromotionText() {
    if (0 === this.IFi) {
      var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
        this.Id,
      );
      if (t.PromotionTimeText)
        return ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsLocalText(
          t.PromotionTimeText,
        );
    }
    return "";
  }
  GetSellTimeText() {
    if (0 === this.IFi) {
      var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
        this.Id,
      );
      if (t.SellTimeText)
        return ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsLocalText(
          t.SellTimeText,
        );
    }
    return "";
  }
  IsShowInShop() {
    if (0 === this.IFi) {
      var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
        this.Id,
      );
      if (t) return t.Show && !this.Locked;
    }
    return !0;
  }
  IfPayGift() {
    return 1 === this.IFi;
  }
  GetGiftId() {
    let t = void 0;
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
      this.ItemId,
    );
    return (t =
      11 === i.ItemType
        ? (t = i.Parameters.get(
            ItemDefines_1.EItemFunctionType.ManualOpenGift,
          )) || i.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift)
        : t);
  }
  GetRewardItemType() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
      this.ItemId,
    ).ItemType;
  }
  GetIfNeedRemind() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.GoodsRemindMap,
      void 0,
    );
    if (t) {
      t = t.get(this.IFi);
      if (t) {
        t = t.get(this.Id);
        if (void 0 !== t && 0 < t) return !1;
      }
    }
    return this.SYa;
  }
  SaveRemindState(t) {
    let i = LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.GoodsRemindMap,
        void 0,
      ),
      e = (i = i || new Map()).get(this.IFi);
    e || ((e = new Map()), i.set(this.IFi, e));
    var s = e.get(this.Id);
    return void 0 !== s && 0 < s
      ? -1
      : (e.set(this.Id, t),
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.GoodsRemindMap,
          i,
        ),
        0);
  }
}
exports.PayShopGoodsData = PayShopGoodsData;
//# sourceMappingURL=PayShopGoodsData.js.map
