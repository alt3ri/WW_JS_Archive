"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkinRecommendItem = exports.RoleSkinItemContent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ShopSkinData_1 = require("../../Data/ShopSkinData"),
  SkinBuyDetailViewData_1 = require("../../Data/SkinBuyDetailViewData"),
  SkinRewardItemGrid_1 = require("../../SkinRewardItemGrid");
class RoleSkinItemContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.dFl = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.SpineSkeletonAnimationComponent],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.dFl = new RoleSkinRecommendItem()),
      await this.dFl.CreateByActorAsync(this.GetItem(0).GetOwner()),
      this.dFl.GetOriginalItem()?.SetUIParent(this.RootItem);
  }
  Refresh(e) {
    this.dFl?.Refresh(e),
      this.dFl?.SetActive(!0),
      this.GetSpine(1).SetAnimation(0, "idle", !0);
  }
}
exports.RoleSkinItemContent = RoleSkinItemContent;
class RoleSkinRecommendItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Kyl = void 0),
      (this.A6i = void 0),
      (this.s4e = void 0),
      (this.zSl = () => {
        var e = SkinBuyDetailViewData_1.SkinBuyDetailViewData.Create([
          this.Kyl,
        ]);
        e.SetPreviewTitle("RoleSkinPreviewTitle_Text"),
          e.SetIndex(0),
          UiManager_1.UiManager.OpenView("SkinBuyDetailView", e);
      }),
      (this.W2e = () => {
        return new SkinRewardItemGrid_1.SkinRewardItemGrid();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UITexture],
      [10, UE.UIItem],
      [11, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[7, this.zSl]]);
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.W2e,
    );
  }
  Refresh(e) {
    this.A6i =
      ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendDataById(e);
    var i = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(
      this.A6i.RecommendId,
    );
    i
      ? (this.Kyl = ShopSkinData_1.ShopSkinData.Create(i))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Shop", 27, "PayShopData is null", ["id", e]),
      this.Og();
  }
  Og() {
    this.sSt(this.Kyl),
      this.$yl(this.Kyl),
      this.jyl(this.Kyl),
      this.syl(this.Kyl),
      this.ryl(this.Kyl),
      this.iyl(this.Kyl),
      this.Oyl(this.Kyl),
      this.Ywn(this.Kyl),
      this.v4e(this.Kyl);
  }
  sSt(e) {
    var i;
    e
      ? (e = e.GetDiscountTimeData())
        ? (this.GetText(2).SetUIActive(!0),
          this.GetItem(10)?.SetUIActive(!0),
          this.GetItem(11)?.SetUIActive(!0),
          (i = this.GetText(2)),
          "string" == typeof e
            ? i.SetText(e)
            : LguiUtil_1.LguiUtil.SetLocalText(i, e.TextId, e.TimeValue))
        : (this.GetText(2).SetUIActive(!1),
          this.GetItem(10)?.SetUIActive(!1),
          this.GetItem(11)?.SetUIActive(!1))
      : (this.GetText(2)?.SetText(""),
        this.GetItem(10)?.SetUIActive(!1),
        this.GetItem(11)?.SetUIActive(!1));
  }
  $yl(e) {
    e
      ? ((e = e.GetRoleSkinData().GetTitleName()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e))
      : this.GetText(3).SetText("");
  }
  jyl(e) {
    e
      ? ((e = e.GetRoleSkinData().GetSubTitle()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e))
      : this.GetText(4).SetText("");
  }
  syl(e) {
    var i;
    e
      ? ((i = e.GetIfDirect()),
        this.GetTexture(9).SetUIActive(!i),
        i ||
          ((i = e.GetPriceData()),
          this.SetItemIcon(this.GetTexture(9), i.CurrencyId)))
      : this.GetTexture(9).SetUIActive(!1);
  }
  ryl(e) {
    !e || e.GetIfDirect()
      ? this.GetText(6).SetText("")
      : (e = e.GetPriceData().OriginalPrice)
        ? (this.GetText(6).SetUIActive(!0),
          this.GetText(6).SetText(`<s>${e.toString()}</s>`))
        : this.GetText(6).SetUIActive(!1);
  }
  iyl(e) {
    var i;
    e
      ? e.GetIfDirect()
        ? ((i = e.GetDirectPriceText()), this.GetText(5).SetText(i))
        : ((i = e.GetPriceData().NowPrice),
          this.GetText(5).SetText(i.toString()))
      : this.GetText(5).SetText("");
  }
  Oyl(e) {
    e
      ? ((e = e.GetIfCanBuy()), this.GetButton(7).RootUIComp.SetUIActive(e))
      : this.GetButton(7).RootUIComp.SetUIActive(!1);
  }
  Ywn(e) {
    e
      ? ((e = e.GetIfCanBuy()), this.GetItem(8).SetUIActive(!e))
      : this.GetItem(8).SetUIActive(!1);
  }
  v4e(e) {
    if (e) {
      var i = [];
      for (const r of e.GetAllReward()) {
        var t = new SkinRewardItemGrid_1.SkinRewardData(),
          s = [{ IncId: r[0].IncId, ItemId: r[0].ItemId }, 0];
        (t.ItemData = s),
          (t.FinishState = e.GetCurrentGoodsData().IsSoldOut()),
          i.push(t);
      }
      this.s4e?.SetActive(0 !== i.length), this.s4e?.RefreshByData(i);
    } else this.s4e?.SetActive(!1);
  }
}
exports.RoleSkinRecommendItem = RoleSkinRecommendItem;
//# sourceMappingURL=RoleSkinRecommendItem.js.map
