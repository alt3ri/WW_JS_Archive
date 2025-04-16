"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GiftPackageMonthlyCardItem = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  PayShopDefine_1 = require("../../PayShopDefine"),
  GiftPackageItem_1 = require("./GiftPackageItem");
class GiftPackageMonthlyCardItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, a) {
    super(),
      (this.u4i = void 0),
      (this.eFi = void 0),
      (this.c4i = e),
      this.CreateThenShowByResourceIdAsync("UiItem_GiftPackageMonthlyCard", a);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    (this.u4i = new GiftPackageItem_1.GiftPackageItem()),
      this.u4i.Initialize(this.GetItem(0)),
      this.u4i.SetBelongViewName("GiftPackageDetailsView"),
      (this.eFi = new GiftPackageItem_1.GiftPackageItem()),
      this.eFi.Initialize(this.GetItem(1)),
      this.u4i.SetBelongViewName("GiftPackageDetailsView"),
      this.InitDailyRewardItem(),
      this.Refresh(),
      this.BV_();
  }
  InitDailyRewardItem() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonthCardDailyItemId",
      ),
      a = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonthCardDailyItemCount",
      );
    this.eFi.UpdateItem(e, a);
  }
  Update(e) {
    (this.c4i = e), this.Refresh();
  }
  Refresh() {
    var e;
    this.InAsyncLoading() ||
      ((e = ConfigManager_1.ConfigManager.MonthCardConfig.GetConfig(this.c4i)),
      this.u4i.UpdateItem(e.ItemId, e.Count));
  }
  BV_() {
    var e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
        PayShopDefine_1.MONTH_CARD_SHOP_ID,
      ),
      a = e.HasCloudGameInfo(),
      t = this.GetText(3);
    t.SetUIActive(a), a && t.SetText(e.GetCloudGameDesc());
  }
}
exports.GiftPackageMonthlyCardItem = GiftPackageMonthlyCardItem;
//# sourceMappingURL=GiftPackageMonthlyCardItem.js.map
