"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerLoadingView = void 0);
const UE = require("ue"),
  LoadingViewBase_1 = require("../../Loading/View/LoadingViewBase");
class ShipTowerLoadingView extends LoadingViewBase_1.LoadingViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  UpdateProgressRate(e) {}
  UpdateProgressValue(e) {
    this.SetTextProgressValue(0, e, "%");
  }
}
exports.ShipTowerLoadingView = ShipTowerLoadingView;
//# sourceMappingURL=ShipTowerLoadingView.js.map
