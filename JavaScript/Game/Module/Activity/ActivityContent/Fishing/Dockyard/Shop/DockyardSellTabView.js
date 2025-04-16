"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardSellTabView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../../../Ui/Base/UiTabViewBase"),
  DockyardBackpackPanel_1 = require("../Bag/DockyardBackpackPanel"),
  DockyardItemListPanel_1 = require("../List/DockyardItemListPanel"),
  DockyardSellTipsPanel_1 = require("../Tips/DockyardSellTipsPanel");
class DockyardSellTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.HXl = void 0),
      (this.jYl = void 0),
      (this.WXl = void 0),
      (this.HLn = void 0);
  }
  OnRegisterComponent() {
    this.QXl(),
      (this.ComponentRegisterInfos = [
        [0, UE.UIItem],
        [1, UE.UIItem],
        [2, UE.UIItem],
        [3, UE.UIItem],
      ]);
  }
  QXl() {
    (this.HLn = this.ExtraParams), this.HLn.RegisterView(this);
  }
  async $Xl() {
    (this.HXl = new DockyardBackpackPanel_1.DockyardBackpackPanel(
      this.HLn.BackpackPanelModel,
    )),
      await this.HXl.CreateByActorAsync(this.GetItem(0).GetOwner()),
      this.AddChild(this.HXl);
  }
  async OYl() {
    ModelManager_1.ModelManager.FishingModel?.IsInDock
      ? ((this.jYl = new DockyardItemListPanel_1.DockyardItemListPanel()),
        await this.jYl.CreateByActorAsync(
          this.GetItem(1).GetOwner(),
          this.HLn.ListPanelModel,
        ))
      : this.GetItem(1).SetUIActive(!1);
  }
  async XXl() {
    (this.WXl = new DockyardSellTipsPanel_1.DockyardSellTipsPanel()),
      this.WXl.SetSellClick(this.HLn.SellClick),
      await this.WXl.CreateByActorAsync(this.GetItem(2).GetOwner());
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.$Xl(), this.OYl(), this.XXl()]),
      (this.HLn.BackpackPanelModel.IsInSelectState = !1);
  }
  async OnBeforeShowAsyncImplement() {
    this.HLn.IsInTrawlState && (await this.jYl.RefreshListItem());
  }
  ShowTipsPanel(i) {
    i = this.HLn.GetItemBlockData(i);
    this.WXl.ShowTipsPanel(i);
  }
  HideTipsPanel() {
    this.WXl.HideTipsPanel();
  }
  CloseMe() {
    this.HLn.NotifyMainViewClose();
  }
  SetTrawlState(i) {
    this.jYl.SetActive(i), this.HLn.NotifyMainViewUiBlur(i);
  }
}
exports.DockyardSellTabView = DockyardSellTabView;
//# sourceMappingURL=DockyardSellTabView.js.map
