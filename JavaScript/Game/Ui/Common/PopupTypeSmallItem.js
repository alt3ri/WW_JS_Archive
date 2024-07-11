"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupTypeSmallItem = void 0);
const UE = require("ue");
const CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase");
class PopupTypeSmallItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
  GetAttachParent() {
    return this.GetItem(1);
  }
  GetCostParent() {
    return this.GetItem(3);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.OnClickMaskButton],
        [2, this.OnClickCloseBtn],
      ]);
  }
  OnSetCloseBtnInteractive(e) {
    this.GetButton(2).SetSelfInteractive(e);
  }
  OnSetBackBtnShowState(e) {
    this.GetButton(2).RootUIComp.SetUIActive(e);
  }
  OnSetHelpButtonActive(e) {}
  OnSetTitleByTextIdAndArg(e) {}
  OnRefreshCost(e) {
    e.forEach((e) => {
      e.GetRootItem().SetUIParent(this.GetItem(3));
    });
  }
}
exports.PopupTypeSmallItem = PopupTypeSmallItem;
// # sourceMappingURL=PopupTypeSmallItem.js.map
