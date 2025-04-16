"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerNewLevelTipsView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerNewLevelTipsView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam;
    BabelTowerController_1.BabelTowerController.SaveNewLevelData(e),
      this.UiViewSequence?.AddSequenceFinishEvent("Start", () => {
        this.UiViewSequence?.PlaySequence("Close");
      }),
      this.UiViewSequence?.AddSequenceFinishEvent("Close", () => {
        this.CloseMe();
      });
  }
}
exports.BabelTowerNewLevelTipsView = BabelTowerNewLevelTipsView;
//# sourceMappingURL=BabelTowerNewLevelTipsView.js.map
