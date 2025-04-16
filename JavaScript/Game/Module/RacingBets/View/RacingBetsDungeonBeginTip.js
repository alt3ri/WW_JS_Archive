"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDungeonBeginTip = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class RacingBetsDungeonBeginTip extends UiViewBase_1.UiViewBase {
  OnAfterPlayStartSequence() {
    TimerSystem_1.TimerSystem.Next(() => {
      var e = this.OpenParam;
      this.CloseMe(), e.SetResult(void 0);
    });
  }
}
exports.RacingBetsDungeonBeginTip = RacingBetsDungeonBeginTip;
//# sourceMappingURL=RacingBetsDungeonBeginTip.js.map
