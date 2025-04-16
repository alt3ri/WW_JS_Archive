"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardSellTipsPanel = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer"),
  DockyardTipsPanel_1 = require("./DockyardTipsPanel");
class DockyardSellTipsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.TipsPanel = void 0),
      (this.SequencePlayer = void 0),
      (this.Data = void 0),
      (this.SellClick = void 0),
      (this.$Yl = () => {
        this.SellClick?.(this.Data.IncId, this.Data.ItemId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.$Yl]]);
  }
  async XXl() {
    (this.TipsPanel = new DockyardTipsPanel_1.DockyardTipsPanel()),
      await this.TipsPanel.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      );
  }
  async OnBeforeStartAsync() {
    (this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(
      this.RootItem,
    )),
      await this.XXl();
  }
  XYl() {
    this.GetButton(1).RootUIComp.SetUIActive(0 < this.Data.Price);
  }
  async OnShowAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SequencePlayer.PlaySequenceAsync("Start", e);
  }
  async OnHideAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SequencePlayer.PlaySequenceAsync("Close", e);
  }
  OnBeforeDestroy() {
    this.SequencePlayer.Clear();
  }
  Refresh() {
    this.TipsPanel.Refresh(this.Data),
      this.TipsPanel.SetPanelVisible(!0, !1),
      this.XYl();
  }
  ShowTipsPanel(e) {
    (this.Data = e), this.Refresh(), this.SetActive(!0);
  }
  HideTipsPanel() {
    this.IsShowOrShowing && this.SetActive(!1);
  }
  SetSellClick(e) {
    this.SellClick = e;
  }
}
exports.DockyardSellTipsPanel = DockyardSellTipsPanel;
//# sourceMappingURL=DockyardSellTipsPanel.js.map
