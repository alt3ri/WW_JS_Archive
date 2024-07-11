"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopItemBase = exports.PayShopItemBaseSt = void 0);
const UE = require("ue"),
  LanguageSystem_1 = require("../../../../../Core/Common/LanguageSystem"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  HelpController_1 = require("../../../Help/HelpController"),
  PayShopGoods_1 = require("../../PayShopData/PayShopGoods"),
  PayShopDefine_1 = require("../../PayShopDefine"),
  NORMALCOLOR = "000000FF",
  REDCOLOR = "BA5C59FF";
class PayShopItemBaseSt {
  constructor() {
    (this.Id = 0),
      (this.Quality = 0),
      (this.ItemId = 0),
      (this.ItemCount = 0),
      (this.ItemName = ""),
      (this.IsDirect = !1),
      (this.PriceData = void 0),
      (this.IfRechargeItem = !1),
      (this.StageImage = ""),
      (this.GetShopTipsText = void 0),
      (this.GetIfNeedShowDownTipsText = void 0),
      (this.GetDownTipsText = void 0),
      (this.GetSpriteTextBgColor = void 0),
      (this.GetTextTipsColor = void 0),
      (this.RedDotExistFunc = void 0),
      (this.GetDirectPriceTextFunc = void 0),
      (this.xrr = "");
  }
  Refresh(t) {
    this.xrr !== LanguageSystem_1.LanguageSystem.PackageLanguage &&
      (t instanceof PayShopGoods_1.PayShopGoods
        ? this.PhraseFromPayItemData(t)
        : this.PhrasePromPayItemData(t));
  }
  PhraseFromPayItemData(t) {
    (this.Quality = t.GetItemData().Quality),
      (this.ItemId = t.GetItemData().ItemId),
      (this.ItemCount = t.GetGoodsData().ItemCount),
      (this.ItemName = t
        .GetGoodsData()
        .GetGoodsName(LanguageSystem_1.LanguageSystem.PackageLanguage)),
      (this.IsDirect = t.IsDirect()),
      (this.Id = t.GetGoodsData().Id),
      (this.StageImage = t.GetGoodsData().StageImage),
      (this.PriceData = t.GetPriceData());
    (this.GetShopTipsText = () => t.GetShopTipsText()),
      (this.GetIfNeedShowDownTipsText = () => t.GetIfNeedShowDownTipsText()),
      (this.GetDownTipsText = () => t.GetDownTipsText()),
      (this.GetTextTipsColor = () => t.GetTextTipsColor()),
      (this.GetSpriteTextBgColor = () => t.GetSpriteTextBgColor()),
      (this.GetDirectPriceTextFunc = () => t.GetDirectPriceText());
    (this.RedDotExistFunc = () =>
      !(!t.IfCanBuy() || t.IsLocked() || t.IsSoldOut() || this.IsDirect) &&
      0 === t.GetPriceData().NowPrice),
      (this.xrr = LanguageSystem_1.LanguageSystem.PackageLanguage);
  }
  PhrasePromPayItemData(t) {
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
      t.ItemId,
    );
    (this.Quality = i.QualityId),
      (this.ItemId = t.ItemId),
      (this.ItemCount = t.ItemCount),
      (this.StageImage = t.StageImage),
      (this.ItemName = t.GetPayItemShowName()),
      (this.IsDirect = !0),
      (this.Id = t.PayItemId),
      this.IsDirect &&
        (this.GetDirectPriceTextFunc = () => t.GetDirectPriceText()),
      (this.IfRechargeItem = !0),
      (this.xrr = LanguageSystem_1.LanguageSystem.PackageLanguage);
  }
}
exports.PayShopItemBaseSt = PayShopItemBaseSt;
class PayShopItemBase extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Pe = void 0),
      (this.wqe = void 0),
      (this.q3i = !1),
      (this.hJ = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.G3i = void 0),
      (this.rkn = ""),
      (this.Gsi = () => {
        HelpController_1.HelpController.OpenHelpById(
          PayShopDefine_1.MONTH_CARD_HELP_ID,
        );
      }),
      (this.N3i = !0),
      (this.RefreshRedDotState = !0),
      (this.wqe = t);
  }
  Init() {
    this.SetRootActor(this.wqe.GetOwner(), !0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UITexture],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UITexture],
      [13, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.Gsi]]);
  }
  SetDownPriceShowState(t) {
    this.GetSprite(1).SetUIActive(t),
      this.GetItem(6).SetUIActive(t),
      this.GetText(10).SetUIActive(t);
  }
  SetDownPriceOnlyShow(t) {
    this.GetSprite(1).SetUIActive(t),
      this.GetItem(6).SetUIActive(t),
      this.GetText(10).SetUIActive(!t);
  }
  OnTimerRefresh(t, i, s) {
    (this.Pe && this.Pe.Id === t.Id) || (this.q3i = !1),
      (this.Pe = t),
      this.O3i();
  }
  Refresh(t, i, s) {
    (this.Pe && this.Pe.Id === t.Id) || (this.q3i = !1),
      (this.Pe = t),
      this.k3i(),
      this.Aqe(),
      this.F3i(),
      this.V3i(),
      this.H3i(),
      this.j3i(),
      this.O3i();
  }
  O3i() {
    this.W3i(), this.iFi(), this.K3i(), this.Q3i(), this.RefreshRedDot();
  }
  OnBeforeDestroy() {
    this.X3i();
  }
  Q3i() {
    var t;
    this.Pe.GetTextTipsColor &&
      ((t = this.Pe.GetTextTipsColor()),
      this.GetText(10).SetColor(UE.Color.FromHex(t)));
  }
  H3i() {
    var t = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId();
    this.GetButton(3).RootUIComp.SetUIActive(this.Pe.Id === t);
  }
  k3i() {
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
      this.Pe.Quality,
    ).PayShopQualitySprite;
    this.SetSpriteByPath(t, this.GetSprite(0), !1);
  }
  Aqe() {
    let t = this.GetTexture(2);
    var i,
      s =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
          this.Pe.ItemId,
        );
    this.Pe.IfRechargeItem
      ? (t.SetUIActive(!1),
        (t = this.GetTexture(12)).SetUIActive(!0),
        (i = this.Pe.StageImage),
        this.SetTextureByPath(i, t))
      : "" !== this.Pe.StageImage
        ? ((i = this.Pe.StageImage), this.SetTextureByPath(i, t))
        : (1 === s
            ? ((i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
                this.Pe.ItemId,
              )),
              this.SetRoleIcon(i.Card, t, this.Pe.ItemId))
            : this.SetItemIcon(t, this.Pe.ItemId),
          this.X3i(),
          this.$3i());
  }
  X3i() {
    this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ),
      (this.hJ = ResourceSystem_1.ResourceSystem.InvalidId));
  }
  $3i() {
    var t =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        this.Pe.ItemId,
      );
    const i = this.GetTexture(2);
    3 === t
      ? ((t =
          ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
            "MI_HeadYuan",
          )),
        (this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(
          t,
          UE.MaterialInterface,
          (t) => {
            i.SetCustomUIMaterial(t);
          },
          102,
        )))
      : i.SetCustomUIMaterial(void 0);
  }
  F3i() {
    this.q3i || (this.GetText(5).SetText(this.Pe.ItemName), (this.q3i = !0));
  }
  V3i() {
    var t,
      i = this.GetTexture(7);
    this.Pe.IsDirect || 0 === (t = this.Pe.PriceData).NowPrice
      ? i.SetUIActive(!1)
      : (i.SetUIActive(!0), this.SetItemIcon(i, t.CurrencyId));
  }
  W3i() {
    var t,
      i = this.GetText(9);
    !this.Pe.IsDirect &&
    (t = this.Pe.PriceData).OriginalPrice &&
    t.InDiscountTime
      ? (i.SetUIActive(!0), i.SetText(`<s>${t.OriginalPrice.toString()}</s>`))
      : i.SetUIActive(!1);
  }
  iFi() {
    let t = NORMALCOLOR;
    var i, s;
    !this.Pe.IsDirect &&
      this.Pe.PriceData.OwnNumber() < this.Pe.PriceData.NowPrice &&
      (t = REDCOLOR),
      (this.G3i && this.G3i === this.Pe.PriceData && this.rkn === t) ||
        ((this.rkn = t),
        (this.G3i = this.Pe?.PriceData),
        (i = this.GetText(8)),
        this.Pe.IsDirect
          ? (s = this.Pe.GetDirectPriceTextFunc?.()) &&
            (i.SetText(s), i.SetColor(UE.Color.FromHex(t)))
          : (0 === (s = this.Pe.PriceData).NowPrice
              ? i.ShowTextNew("ShopDiscountLabel_4")
              : i.SetText(s.NowPrice.toString()),
            (s = t),
            i.SetColor(UE.Color.FromHex(s))));
  }
  K3i() {
    var t,
      i = this.Pe.GetShopTipsText?.();
    this.N3i && !StringUtils_1.StringUtils.IsEmpty(i)
      ? ((t = this.GetText(4)).SetUIActive(!0), t.SetText(i))
      : this.GetText(4).SetUIActive(!1);
  }
  SetLeftTimeTextShowState(t) {
    (this.N3i = t),
      this.Pe &&
        ((t = this.Pe.GetShopTipsText?.()),
        this.GetText(4).SetUIActive(
          this.N3i && !StringUtils_1.StringUtils.IsEmpty(t),
        ));
  }
  SetNameTextShowState(t) {
    this.GetText(5).SetUIActive(t);
  }
  SetRedDotVisible(t) {
    this.GetItem(11).SetUIActive(t);
  }
  RefreshRedDot() {
    this.RefreshRedDotState &&
      this.Pe.RedDotExistFunc &&
      this.SetRedDotVisible(this.Pe.RedDotExistFunc());
  }
  j3i() {
    this.GetItem(13)?.SetUIActive(!this.Pe.IfRechargeItem);
  }
}
exports.PayShopItemBase = PayShopItemBase;
//# sourceMappingURL=PayShopItemBase.js.map
