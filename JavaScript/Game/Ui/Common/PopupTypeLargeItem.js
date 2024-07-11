"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupTypeLargeItem = void 0);
const UE = require("ue"),
  CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase"),
  PopupCaptionItem_1 = require("./PopupCaptionItem");
class PopupTypeLargeItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
  constructor() {
    super(...arguments), (this.n6t = void 0);
  }
  GetAttachParent() {
    return this.GetItem(1);
  }
  GetCostParent() {
    return this.GetItem(2);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickCloseBtn]]);
  }
  OnStart() {
    (this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(3))),
      this.n6t.SetCloseCallBack(() => {
        this.TryHideSelf();
      });
  }
  OnSetHelpButtonActive(t) {
    this.n6t.SetHelpBtnActive(t);
  }
  OnSetTitleByTextIdAndArg(t, ...e) {
    this.n6t.SetTitleByTextIdAndArg(t, e);
  }
  OnSetBackBtnShowState(t) {
    this.n6t.SetCloseBtnActive(t);
  }
  OnSetCloseBtnInteractive(t) {}
  OnRefreshCost(t) {
    t.forEach((t) => {
      t.GetRootItem().SetUIParent(this.GetItem(2));
    });
  }
}
exports.PopupTypeLargeItem = PopupTypeLargeItem;
//# sourceMappingURL=PopupTypeLargeItem.js.map
