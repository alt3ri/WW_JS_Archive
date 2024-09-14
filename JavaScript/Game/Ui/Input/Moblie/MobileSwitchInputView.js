"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MobileSwitchInputView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../Base/UiViewBase"),
  MobileSwitchInputController_1 = require("./MobileSwitchInputController");
class MobileSwitchInputView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    var e = this.OpenParam;
    this.GetItem(0)?.SetUIActive(!e), this.GetItem(1)?.SetUIActive(e);
  }
  OnAfterPlayStartSequence() {
    this.CloseMe(
      MobileSwitchInputController_1.MobileSwitchInputController
        .ReOpenBattleView,
    );
  }
}
exports.MobileSwitchInputView = MobileSwitchInputView;
//# sourceMappingURL=MobileSwitchInputView.js.map
