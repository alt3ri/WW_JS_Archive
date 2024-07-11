"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsWithButtonComponent = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  ButtonItem_1 = require("../Button/ButtonItem"),
  ItemTipsComponent_1 = require("./ItemTipsComponent");
class ItemTipsWithButtonComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.vQs = void 0),
      (this.Mxt = void 0),
      (this.Sxt = (t, e, i) => {
        e = new ButtonItem_1.ButtonItem(e);
        return (
          e.SetFunction(t.Function),
          e.SetShowText(t.Text),
          { Key: t.Index, Value: e }
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.vQs = new ItemTipsComponent_1.ItemTipsComponentContentComponent()),
      await this.vQs.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.Mxt = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetHorizontalLayout(1),
      this.Sxt,
    );
  }
  OnBeforeDestroy() {
    this.vQs.Destroy(), this.Mxt.ClearChildren();
  }
  RefreshTips(t) {
    this.vQs.Refresh(t);
  }
  RefreshButton(t) {
    this.Mxt.RebuildLayoutByDataNew(t);
  }
  ClearButtonList() {
    this.Mxt.RebuildLayoutByDataNew([]);
  }
  SetButtonTextByIndex(t, e, i) {
    this.Mxt.GetLayoutItemMap().get(t)?.SetLocalText(e, i);
  }
  SetButtonEnableByIndex(t, e) {
    this.Mxt.GetLayoutItemMap().get(t)?.SetEnableClick(e);
  }
  SetButtonPanelVisible(t) {
    this.GetHorizontalLayout(1).RootUIComp.SetUIActive(t);
  }
  SetButtonRedDotVisible(t, e) {
    this.Mxt.GetLayoutItemMap().get(t)?.SetRedDotVisible(e);
  }
  SetVisible(t) {
    this.SetActive(t);
  }
  SetTipsComponentLockButton(t) {
    this.vQs.SetTipsComponentLockButton(t);
  }
}
exports.ItemTipsWithButtonComponent = ItemTipsWithButtonComponent;
//# sourceMappingURL=ItemTipsWithButton.js.map
