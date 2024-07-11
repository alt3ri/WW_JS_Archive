"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkTrackComponent = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class MarkTrackComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.MapType = 2);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UINiagara]]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    var e = this.GetUiNiagara(0);
    e &&
      (2 === this.MapType
        ? (e.bAdaptPosAndSizeChanged = !0)
        : (e.bAdaptPosAndSizeChanged = !1));
  }
}
exports.MarkTrackComponent = MarkTrackComponent;
//# sourceMappingURL=MarkTrackComponent.js.map
