"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviorAudio = void 0);
const UiAudioModel_1 = require("../../UiAudioModel"),
  AudioStateData_1 = require("./AudioStateData");
class UiBehaviorAudio {
  constructor(i) {
    (this.D_r = void 0),
      (this.bne = void 0),
      (this.OQt = void 0),
      (this.OQt = i);
  }
  OnAfterUiShow() {
    this.D_r || (this.D_r = this.OQt.GetUiAudioComponent()),
      this.D_r &&
        this.D_r.bAudioCoverEnable &&
        (this.R_r(),
        UiAudioModel_1.UiAudioModel.AddAudioStateData(this.bne),
        UiAudioModel_1.UiAudioModel.SetRTPCLevelOpening(this.bne.Level),
        UiAudioModel_1.UiAudioModel.CalculateRTPCValueAndApply());
  }
  OnBeforeUiHide() {
    this.D_r &&
      this.D_r.bAudioCoverEnable &&
      (UiAudioModel_1.UiAudioModel.SetRTPCLevelClosing(this.bne.Level),
      UiAudioModel_1.UiAudioModel.RemoveAudioStateData(this.bne),
      UiAudioModel_1.UiAudioModel.CalculateRTPCValueAndApply());
  }
  OnBeforeDestroy() {
    this.D_r = void 0;
  }
  R_r() {
    (this.bne = new AudioStateData_1.AudioStateData()),
      (this.bne.Level = this.D_r.AudioUiCover),
      (this.bne.Alpha = this.D_r.AudioUiAlpha);
  }
}
exports.UiBehaviorAudio = UiBehaviorAudio;
//# sourceMappingURL=UiBehaviorAudio.js.map
