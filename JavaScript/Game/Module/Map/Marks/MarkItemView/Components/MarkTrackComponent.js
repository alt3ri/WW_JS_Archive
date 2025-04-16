"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkTrackComponent = void 0);
const UE = require("ue"),
  MarkPanelBase_1 = require("../MarkPanelBase");
class MarkTrackComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments), (this.MapType = 2), (this.TrackFxScale = 1);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UINiagara]]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    var e = this.GetUiNiagara(0),
      e =
        (e &&
          (2 === this.MapType
            ? (e.bAdaptPosAndSizeChanged = !0)
            : (e.bAdaptPosAndSizeChanged = !1)),
        new UE.Vector(this.TrackFxScale, this.TrackFxScale, 1));
    this.RootItem.SetUIRelativeScale3D(e);
  }
}
exports.MarkTrackComponent = MarkTrackComponent;
//# sourceMappingURL=MarkTrackComponent.js.map
