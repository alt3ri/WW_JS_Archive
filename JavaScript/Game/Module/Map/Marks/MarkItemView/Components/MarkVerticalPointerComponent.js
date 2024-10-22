"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkVerticalPointerComponent = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class MarkVerticalPointerComponent extends UiPanelBase_1.UiPanelBase {
  ShowUp() {
    this.RootItem?.SetUIActive(!0),
      this.RootItem?.SetUIRelativeRotation(new UE.Rotator(0, 0, 0));
  }
  ShowDown() {
    this.RootItem?.SetUIActive(!0),
      this.RootItem?.SetUIRelativeRotation(new UE.Rotator(0, 0, 180));
  }
  HideSelf() {
    this.RootItem?.SetUIActive(!1);
  }
}
exports.MarkVerticalPointerComponent = MarkVerticalPointerComponent;
//# sourceMappingURL=MarkVerticalPointerComponent.js.map
