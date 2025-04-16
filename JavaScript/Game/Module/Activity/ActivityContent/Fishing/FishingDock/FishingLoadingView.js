"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingLoadingView = void 0);
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../../Ui/UiManager");
class FishingLoadingView extends UiViewBase_1.UiViewBase {
  OnStart() {
    const e = this.OpenParam;
    this.UiViewSequence?.AddSequenceFinishEvent("Start", () => {
      e
        ? UiManager_1.UiManager.OpenView("FishingDockView", void 0, () => {
            this.CloseMe();
          })
        : TimerSystem_1.TimerSystem.Next(() => {
            this.CloseMe();
          });
    });
  }
}
exports.FishingLoadingView = FishingLoadingView;
//# sourceMappingURL=FishingLoadingView.js.map
