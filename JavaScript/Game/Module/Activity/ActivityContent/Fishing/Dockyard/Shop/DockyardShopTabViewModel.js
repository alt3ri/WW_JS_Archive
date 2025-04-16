"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardShopTabViewModel = void 0);
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  FishingDefine_1 = require("../../FishingDefine"),
  DockyardViewModelBase_1 = require("../Base/DockyardViewModelBase"),
  DockyardShopBackpackPanelModel_1 = require("./DockyardShopBackpackPanelModel"),
  DockyardShopListPanelModel_1 = require("./DockyardShopListPanelModel");
class DockyardShopTabViewModel extends DockyardViewModelBase_1.DockyardViewModelBase {
  constructor() {
    super(...arguments),
      (this.BackpackPanelModel =
        new DockyardShopBackpackPanelModel_1.DockyardShopBackpackPanelModel()),
      (this.ListPanelModel =
        new DockyardShopListPanelModel_1.DockyardShopListPanelModel()),
      (this.uOn = void 0),
      (this.SellClick = (e, o) => {
        var r;
        this.BackpackPanelModel.IsInDragState ||
        !this.BackpackPanelModel.IsInSelectState ||
        this.BackpackPanelModel.InSelectedBlockId ===
          FishingDefine_1.UNVALID_ITEM_BLOCK_ID
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "GenericPrompt_NotAllowOpenPhotograph_TipsText",
            )
          : ((r = this.BackpackPanelModel.IsInSelectState),
            ControllerHolder_1.ControllerHolder.FishingController.TryRequestFishingSell(
              [e],
              [o],
              r,
              (e) => {
                e &&
                  (this.ListPanelModel.DeleteSelectedItemBlockAndRefresh(),
                  this.BackpackPanelModel.Panel.DestroySelectItemBlock(),
                  this.uOn.ShowPlotPanel("SellItem"));
              },
            ));
      });
  }
  RegisterMainView(e) {
    this.uOn = e;
  }
  ItemBlockClick(e) {
    super.ItemBlockClick(e), this.uOn.HidePlotPanel();
  }
  AllSellClick() {
    var e = this.GetLeftPanelItemBlockDataList();
    const r = this.QYl(e);
    var e = this.cH_(e),
      o = this.BackpackPanelModel.Panel.GetItemBlockDataList();
    const i = this.QYl(o);
    var l,
      o = this.cH_(o);
    r.length + i.length === 0
      ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Fishing_SellAllFailed",
        )
      : ((l = this.BackpackPanelModel.IsInSelectState),
        ControllerHolder_1.ControllerHolder.FishingController.TryRequestFishingSell(
          [...r, ...i],
          [...e, ...o],
          l,
          (e) => {
            if (e) {
              0 < r.length &&
                this.ListPanelModel.DeleteItemBlockListFromWareHouse(r);
              for (const o of i)
                this.BackpackPanelModel.Panel.DestroyItemBlockById(o);
              this.uOn.ShowPlotPanel("SellAllItem");
            }
          },
        ));
  }
  NotifyMainViewClose() {
    this.uOn.CloseMe();
  }
  QYl(e) {
    var o = [];
    for (const r of e) 0 < r.MBs && o.push(r.b9n);
    return o;
  }
  cH_(e) {
    var o = [];
    for (const r of e) 0 < r.MBs && o.push(r.L8n);
    return o;
  }
  NotifyMainViewUiBlur(e) {
    this.uOn.NotifyUiBlur(e);
  }
  get HasFishingCanSell() {
    var e = this.ListPanelModel.GetShowItemList(),
      o = ModelManager_1.ModelManager.DockyardModel.GetBackpackItemList(),
      r = [];
    for (const i of e) 0 < i.Price && r.push(i.IncId);
    for (const l of o) 0 < l.Price && r.push(l.IncId);
    return 0 < r.length;
  }
}
exports.DockyardShopTabViewModel = DockyardShopTabViewModel;
//# sourceMappingURL=DockyardShopTabViewModel.js.map
