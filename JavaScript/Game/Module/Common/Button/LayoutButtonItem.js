"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LayoutButtonItem = exports.ButtonItemData = void 0);
const UE = require("ue"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class ButtonItemData {
  constructor() {
    (this.OnClickCallback = () => {}),
      (this.ButtonText = ""),
      (this.Index = 0),
      (this.RedDotName = void 0);
  }
}
exports.ButtonItemData = ButtonItemData;
class LayoutButtonItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.ije = () => {
        this.$8i && this.$8i.OnClickCallback(this.$8i.Index);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  Refresh(t, e, i) {
    this.$8i &&
      this.$8i.RedDotName &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        this.$8i.RedDotName,
        this.GetItem(2),
      ),
      RedDotController_1.RedDotController.BindRedDot(
        t.RedDotName,
        this.GetItem(2),
      )),
      (this.$8i = t),
      this.GetText(1)?.ShowTextNew(t.ButtonText);
  }
  OnBeforeDestroy() {
    this.$8i &&
      this.$8i.RedDotName &&
      RedDotController_1.RedDotController.UnBindGivenUi(
        this.$8i.RedDotName,
        this.GetItem(2),
      );
  }
  SetEnableClick(t) {
    this.GetButton(0)?.SetSelfInteractive(t);
  }
  SetShowText(t) {
    this.GetText(1).ShowTextNew(t);
  }
  SetLocalText(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, ...e);
  }
  SetRedDotVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
}
exports.LayoutButtonItem = LayoutButtonItem;
//# sourceMappingURL=LayoutButtonItem.js.map
