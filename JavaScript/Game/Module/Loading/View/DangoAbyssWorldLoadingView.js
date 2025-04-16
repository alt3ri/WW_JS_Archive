"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssWorldLoadingView = void 0);
const UE = require("ue"),
  LoadingViewBase_1 = require("./LoadingViewBase");
class DangoAbyssWorldLoadingView extends LoadingViewBase_1.LoadingViewBase {
  constructor() {
    super(...arguments), (this._t1 = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    super.OnStart(), (this._t1 = this.GetItem(1)?.Width ?? 0);
  }
  UpdateProgressRate(e) {
    this.SetTextureProgressRate(0, e);
    e = this._t1 * e;
    this.GetItem(2)?.SetAnchorOffsetX(e);
  }
  UpdateProgressValue(e) {
    this.SetTextProgressValue(3, e);
  }
  OnLevelSequencePlayerBandStateChange(e) {
    this.PlaySequence("Loop");
  }
}
exports.DangoAbyssWorldLoadingView = DangoAbyssWorldLoadingView;
//# sourceMappingURL=DangoAbyssWorldLoadingView.js.map
