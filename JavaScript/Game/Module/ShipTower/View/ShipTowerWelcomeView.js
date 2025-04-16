"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerWelcomeView = void 0);
const UE = require("ue"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
class ShipTowerWelcomeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), (this.OpenParam = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.GetText(0)?.SetUIActive(!1),
      this.UiViewSequence?.AddSequenceFinishEvent("Start", () => {
        this.OpenParam?.Promise.SetResult(!0);
      });
  }
}
exports.ShipTowerWelcomeView = ShipTowerWelcomeView;
//# sourceMappingURL=ShipTowerWelcomeView.js.map
