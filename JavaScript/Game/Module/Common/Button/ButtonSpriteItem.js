"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ButtonSpriteItem = void 0);
const UE = require("ue"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ButtonSpriteItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.l4e = void 0),
      (this.w4a = 0),
      (this.Gke = void 0),
      (this.ije = () => {
        this.Gke && this.Gke();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  GetBtn() {
    return this.GetButton(0);
  }
  SetButtonAllowEventBubbleUp(t) {
    this.GetButton(0).AllowEventBubbleUp = t;
  }
  SetEnableClick(t) {
    this.GetButton(0).SetSelfInteractive(t);
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetSpriteVisible(t) {
    this.GetSprite(1).SetUIActive(t);
  }
  SetSprite(t) {
    const e = this.GetSprite(1);
    e.SetUIActive(!1),
      this.SetSpriteByPath(t, e, !1, void 0, (t) => {
        e.SetUIActive(t);
      });
  }
  SetRedDotVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  BindRedDot(t, e = 0) {
    var i = this.GetItem(2);
    i &&
      (this.UnBindRedDot(), (this.l4e = t), (this.w4a = e), this.l4e) &&
      RedDotController_1.RedDotController.BindRedDot(t, i, void 0, e);
  }
  UnBindRedDot() {
    var t;
    this.l4e &&
      ((t = this.GetItem(2)),
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, t, this.w4a),
      (this.l4e = void 0),
      (this.w4a = 0));
  }
}
exports.ButtonSpriteItem = ButtonSpriteItem;
//# sourceMappingURL=ButtonSpriteItem.js.map
