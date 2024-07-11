"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PcAndGamepadProgressBar = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ProgressBar extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  SetPercent(s) {
    this.GetTexture(0)?.SetFillAmount(s);
  }
}
class PcAndGamepadProgressBar {
  constructor() {
    (this.pwo = void 0), (this.vwo = void 0);
  }
  async Init(s, e) {
    (this.pwo = new ProgressBar()),
      (this.vwo = new ProgressBar()),
      await Promise.all([
        this.pwo.CreateByActorAsync(s.GetOwner()),
        this.vwo.CreateByActorAsync(e.GetOwner()),
      ]),
      this.SetProgressPercent(0);
  }
  SetProgressPercent(s) {
    this.SetPercent(s), this.W0i();
  }
  SetPercent(s) {
    (Info_1.Info.IsInGamepad() ? this.vwo : this.pwo)?.SetPercent(s);
  }
  SetProgressVisible(s) {
    s ? this.W0i() : (this.pwo?.SetActive(!1), this.vwo?.SetActive(!1));
  }
  W0i() {
    var s = Info_1.Info.IsInGamepad(),
      e = !s;
    this.pwo?.GetActive() !== e && this.pwo?.SetActive(e),
      this.vwo?.GetActive() !== s && this.vwo?.SetActive(s);
  }
}
exports.PcAndGamepadProgressBar = PcAndGamepadProgressBar;
//# sourceMappingURL=PcAndGamepadProgressBar.js.map
