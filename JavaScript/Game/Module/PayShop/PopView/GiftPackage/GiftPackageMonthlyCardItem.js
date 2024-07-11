"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GiftPackageMonthlyCardItem = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GiftPackageItem_1 = require("./GiftPackageItem");
class GiftPackageMonthlyCardItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.u4i = void 0),
      (this.eFi = void 0),
      (this.c4i = e),
      this.CreateThenShowByResourceIdAsync("UiItem_GiftPackageMonthlyCard", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
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
      this.Refresh();
  }
  InitDailyRewardItem() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonthCardDailyItemId",
      ),
      t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonthCardDailyItemCount",
      );
    this.eFi.UpdateItem(e, t);
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
}
exports.GiftPackageMonthlyCardItem = GiftPackageMonthlyCardItem;
//# sourceMappingURL=GiftPackageMonthlyCardItem.js.map
