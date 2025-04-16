"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsWithButtonComponent = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LayoutButtonItem_1 = require("../Button/LayoutButtonItem"),
  ItemTipsComponent_1 = require("./ItemTipsComponent"),
  ItemTipsLockState_1 = require("./SubComponents/ItemTipsLockState");
class ItemTipsWithButtonComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.GXs = void 0),
      (this.Mxt = void 0),
      (this.au_ = void 0),
      (this.Dxt = void 0),
      (this.W2e = () => {
        return new LayoutButtonItem_1.LayoutButtonItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.GXs = new ItemTipsComponent_1.ItemTipsComponentContentComponent()),
      await this.GXs.CreateByActorAsync(this.GetItem(0).GetOwner()),
      (this.Dxt = new ItemTipsLockState_1.ItemTipsLockState()),
      await this.Dxt.Init(this.GetItem(3)),
      this.Dxt.SetActive(!1);
  }
  OnStart() {
    this.Mxt = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(1),
      this.W2e,
    );
  }
  OnBeforeDestroy() {
    this.GXs.Destroy(), this.Mxt.ClearChildren();
  }
  RefreshTips(t) {
    this.GXs.Refresh(t);
  }
  RefreshButton(t) {
    this.au_ = new CustomPromise_1.CustomPromise();
    var e = new Array();
    for (const s of t) {
      var i = new LayoutButtonItem_1.ButtonItemData();
      (i.OnClickCallback = s.Function),
        (i.ButtonText = s.Text),
        (i.RedDotName = s.RedDotName),
        (i.Index = s.Index),
        e.push(i);
    }
    this.Mxt.RefreshByData(e, () => {
      this.au_.IsFulfilled() || this.au_?.SetResult();
    });
  }
  ClearButtonList() {
    this.Mxt.RefreshByData([]);
  }
  async SetButtonTextByIndex(t, e, i) {
    this.au_ && (await this.au_.Promise),
      this.Mxt.GetLayoutItemMap().get(t)?.SetLocalText(e, i);
  }
  async SetButtonEnableByIndex(t, e) {
    this.au_ && (await this.au_.Promise),
      this.Mxt.GetLayoutItemMap().get(t)?.SetEnableClick(e);
  }
  SetButtonPanelVisible(t) {
    this.GetHorizontalLayout(1).RootUIComp.SetUIActive(t);
  }
  async SetButtonRedDotVisible(t, e) {
    this.au_ && (await this.au_.Promise),
      this.Mxt.GetLayoutItemMap().get(t)?.SetRedDotVisible(e);
  }
  SetVisible(t) {
    this.SetActive(t);
  }
  SetTipsComponentLockButton(t) {
    this.GXs.SetTipsComponentLockButton(t);
  }
  SetLockStateData(t) {
    this.Dxt.UpdateData(t);
  }
  SetLockStateVisible(t = !1) {
    this.Dxt.SetActive(t);
  }
}
exports.ItemTipsWithButtonComponent = ItemTipsWithButtonComponent;
//# sourceMappingURL=ItemTipsWithButton.js.map
