"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueButtonItemCollection = exports.RogueButtonItemA = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RogueButtonItemA extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.y8i = () => {}),
      (this.l4e = void 0),
      (this.eTt = () => {
        this.y8i();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  BindRedDot(t, e) {
    this.l4e = t;
    var i = this.GetItem(3);
    RedDotController_1.RedDotController.BindRedDot(t, i, void 0, e);
  }
  UnBindRedDot() {
    var t;
    this.l4e &&
      ((t = this.GetItem(3)),
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, t));
  }
  SetNameById(t) {
    t = ConfigManager_1.ConfigManager.TextConfig?.GetTextById(t);
    this.GetText(1)?.SetText(t);
  }
  SetName(t) {
    this.GetText(1)?.SetText(t);
  }
  SetNum(t) {
    this.GetText(2)?.SetText(t);
  }
  SetOnClickCall(t) {
    this.y8i = t;
  }
}
exports.RogueButtonItemA = RogueButtonItemA;
class RogueButtonItemCollection extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.y8i = () => {}),
      (this.l4e = void 0),
      (this.eTt = () => {
        this.y8i();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  BindRedDot(t, e) {
    this.l4e = t;
    var i = this.GetItem(3);
    RedDotController_1.RedDotController.BindRedDot(t, i, void 0, e);
  }
  UnBindRedDot() {
    var t;
    this.l4e &&
      ((t = this.GetItem(3)),
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, t));
  }
  SetNameById(t) {
    t = ConfigManager_1.ConfigManager.TextConfig?.GetTextById(t);
    this.GetText(1)?.SetText(t);
  }
  SetName(t) {
    this.GetText(1)?.SetText(t);
  }
  SetNum(t) {
    this.GetText(2)?.SetText(t);
  }
  SetOnClickCall(t) {
    this.y8i = t;
  }
  SetButtonDone(t) {
    this.GetItem(5)?.SetUIActive(t);
  }
}
exports.RogueButtonItemCollection = RogueButtonItemCollection;
//# sourceMappingURL=RogueOutButtonItem.js.map
