"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCircleButtonItem = void 0);
const UE = require("ue"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class ActivityCircleButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ZDc = () => {}),
      (this.l4e = void 0),
      (this.eTt = () => {
        this.ZDc();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  SetOnClick(t) {
    this.ZDc = t;
  }
  SetSubText(t) {
    this.GetText(1).SetText(t);
  }
  SetRedDotVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  BindRedDot(t, e) {
    var i = this.GetItem(2);
    i &&
      (this.UnBindRedDot(), (this.l4e = t), this.l4e) &&
      RedDotController_1.RedDotController.BindRedDot(t, i, void 0, e);
  }
  BindGivenUid(t, e) {
    var i = this.GetItem(2);
    i &&
      ((this.l4e = t), this.l4e) &&
      RedDotController_1.RedDotController.BindRedDot(t, i, void 0, e);
  }
  UnBindGivenUid(t) {
    this.l4e &&
      RedDotController_1.RedDotController.UnBindGivenUi(
        this.l4e,
        this.GetItem(2),
        t,
      );
  }
  UnBindRedDot() {
    this.l4e &&
      (RedDotController_1.RedDotController.UnBindRedDot(this.l4e),
      (this.l4e = void 0));
  }
}
exports.ActivityCircleButtonItem = ActivityCircleButtonItem;
//# sourceMappingURL=ActivityCircleButtonItem.js.map
