"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionTabComponent = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class VisionTabComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.aWi = void 0),
      (this.hWi = void 0),
      (this.lWi = () => {
        this.aWi?.();
      }),
      (this._Wi = () => {
        this.hWi?.();
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [
        [0, this.lWi],
        [1, this._Wi],
      ]);
  }
  SetToggleOneButtonClick(e) {
    this.aWi = e;
  }
  SetToggleTwoButtonClick(e) {
    this.hWi = e;
  }
}
exports.VisionTabComponent = VisionTabComponent;
//# sourceMappingURL=VisionTabComponent.js.map
