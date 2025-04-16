"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AbyssButtonItem = void 0);
const UE = require("ue"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class AbyssButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.l4e = void 0),
      (this.ButtonCallBack = void 0),
      (this.IUn = () => {
        this.ButtonCallBack?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.IUn]]);
  }
  RefreshRedDotVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  SetNumText(t) {
    this.GetText(1).SetText(t);
  }
  SetNameText(t) {
    this.GetText(3).SetText(t);
  }
  SetSelfInteractive(t) {
    this.GetButton(0).SetSelfInteractive(t);
  }
  BindClickCallBack(t) {
    this.ButtonCallBack = t;
  }
  SetRedDotVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  BindRedDot(t, e = 0) {
    var s = this.GetItem(2);
    s &&
      (this.UnBindRedDot(), (this.l4e = t), this.l4e) &&
      RedDotController_1.RedDotController.BindRedDot(t, s, void 0, e);
  }
  UnBindRedDot() {
    var t;
    this.l4e &&
      ((t = this.GetItem(2)),
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, t),
      (this.l4e = void 0));
  }
}
exports.AbyssButtonItem = AbyssButtonItem;
//# sourceMappingURL=AbyssButtonItem.js.map
