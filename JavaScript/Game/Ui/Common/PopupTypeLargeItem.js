"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupTypeLargeItem = void 0);
const UE = require("ue");
const CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase");
const PopupCaptionItem_1 = require("./PopupCaptionItem");
class PopupTypeLargeItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
  constructor() {
    super(...arguments), (this.nVt = void 0);
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
    (this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(3))),
      this.nVt.SetCloseCallBack(() => {
        this.TryHideSelf();
      });
  }
  OnSetHelpButtonActive(t) {
    this.nVt.SetHelpBtnActive(t);
  }
  OnSetTitleByTextIdAndArg(t, ...e) {
    this.nVt.SetTitleByTextIdAndArg(t, e);
  }
  OnSetBackBtnShowState(t) {
    this.nVt.SetCloseBtnActive(t);
  }
  OnSetCloseBtnInteractive(t) {}
  OnRefreshCost(t) {
    t.forEach((t) => {
      t.GetRootItem().SetUIParent(this.GetItem(2));
    });
  }
}
exports.PopupTypeLargeItem = PopupTypeLargeItem;
// # sourceMappingURL=PopupTypeLargeItem.js.map
