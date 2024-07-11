"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PcAndGamepadProgressBar = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ProgressBar extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  SetPercent(e) {
    this.GetTexture(0)?.SetFillAmount(e);
  }
}
class PcAndGamepadProgressBar {
  constructor() {
    (this.Sxo = void 0), (this.Exo = void 0);
  }
  async Init(e, s) {
    (this.Sxo = new ProgressBar()),
      (this.Exo = new ProgressBar()),
      await Promise.all([
        this.Sxo.CreateByActorAsync(e.GetOwner()),
        this.Exo.CreateByActorAsync(s.GetOwner()),
      ]),
      this.SetProgressPercent(0);
  }
  SetProgressPercent(e) {
    (ModelManager_1.ModelManager.PlatformModel?.IsGamepad()
      ? this.Exo
      : this.Sxo
    )?.SetPercent(e),
      this.Wgi();
  }
  SetProgressVisible(e) {
    e ? this.Wgi() : (this.Sxo?.SetActive(!1), this.Exo?.SetActive(!1));
  }
  Wgi() {
    const e = ModelManager_1.ModelManager.PlatformModel.IsGamepad();
    const s = !e;
    this.Sxo?.GetActive() !== s && this.Sxo?.SetActive(s),
      this.Exo?.GetActive() !== e && this.Exo?.SetActive(e);
  }
}
exports.PcAndGamepadProgressBar = PcAndGamepadProgressBar;
// # sourceMappingURL=PcAndGamepadProgressBar.js.map
