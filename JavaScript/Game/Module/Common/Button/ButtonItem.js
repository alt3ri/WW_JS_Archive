"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ButtonItem = void 0);
const UE = require("ue"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class ButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Pe = 0),
      (this.l4e = void 0),
      (this.Gke = void 0),
      (this.ije = () => {
        this.Gke && this.Gke(this.Pe);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  SetButtonAllowEventBubbleUp(t) {
    this.GetButton(0).AllowEventBubbleUp = t;
  }
  SetText(t) {
    var e = this.GetText(1);
    e && e.SetText(t);
  }
  SetLocalText(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, ...e);
  }
  SetLocalTextNew(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, ...e);
  }
  SetShowText(t) {
    this.GetText(1).ShowTextNew(t);
  }
  SetData(t) {
    this.Pe = t;
  }
  SetEnableClick(t) {
    this.GetButton(0)?.SetSelfInteractive(t);
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetRedDotVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  BindRedDot(t, e = 0) {
    var i = this.GetItem(2);
    i &&
      (this.UnBindRedDot(), (this.l4e = t), this.l4e) &&
      RedDotController_1.RedDotController.BindRedDot(t, i, void 0, e);
  }
  UnBindRedDot() {
    this.l4e &&
      (RedDotController_1.RedDotController.UnBindRedDot(this.l4e),
      (this.l4e = void 0));
  }
  GetBtn() {
    return this.GetButton(0);
  }
}
exports.ButtonItem = ButtonItem;
//# sourceMappingURL=ButtonItem.js.map
