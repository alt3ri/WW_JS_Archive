"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsLoadingView = void 0);
const UE = require("ue"),
  LoadingViewBase_1 = require("./LoadingViewBase");
class RacingBetsLoadingView extends LoadingViewBase_1.LoadingViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  UpdateProgressRate(e) {
    this.SetTextureProgressRate(0, e);
  }
  UpdateProgressValue(e) {}
  OnLevelSequencePlayerBandStateChange(e) {
    this.PlaySequence("Start01");
  }
}
exports.RacingBetsLoadingView = RacingBetsLoadingView;
//# sourceMappingURL=RacingBetsLoadingView.js.map
