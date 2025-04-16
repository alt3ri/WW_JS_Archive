"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InActiveRedItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../Util/LguiUtil");
class InActiveRedItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Ymc = () => {}),
      (this.zmc = () => {
        this.Ymc();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.zmc]]);
  }
  BindDetailButtonCall(e) {
    this.Ymc = e;
  }
  SetDetailButtonVisible(e) {
    this.GetButton(2).RootUIComp.SetUIActive(e);
  }
  SetLockItemVisible(e) {
    this.GetItem(0).SetUIActive(e);
  }
  SetText(e, ...t) {
    var i = this.GetText(1);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(i, e, ...t);
  }
}
exports.InActiveRedItem = InActiveRedItem;
//# sourceMappingURL=InActiveRedItem.js.map
