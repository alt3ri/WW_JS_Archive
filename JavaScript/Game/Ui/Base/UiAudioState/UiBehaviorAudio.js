"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviorAudio = void 0);
const AudioFilterController_1 = require("../../../../Core/Audio/AudioFilterController"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiAudioModel_1 = require("../../UiAudioModel"),
  AudioStateData_1 = require("./AudioStateData");
class UiBehaviorAudio {
  constructor(i) {
    (this.Dja = 0),
      (this.D_r = void 0),
      (this.bne = void 0),
      (this.OQt = void 0),
      (this.LAe = void 0),
      (this.OQt = i),
      this.OQt && this.OQt.Info
        ? (this.LAe = this.OQt.Info)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Audio", 75, "BehaviorAudio 缺少UiViewInfo");
  }
  OnAfterUiStart() {
    var i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(
      this.LAe.Name,
    );
    i.AudioFilter &&
      0 < i.AudioFilter.length &&
      0 === this.Dja &&
      (this.Dja =
        AudioFilterController_1.AudioFilterController.PushUiFilterState(
          i.AudioFilter,
          this.LAe.Name,
        )),
      this.D_r || (this.D_r = this.OQt.GetUiAudioComponent()),
      this.LAe.OpenAudioEvent &&
        AudioSystem_1.AudioSystem.PostEvent(this.LAe.OpenAudioEvent);
  }
  OnAfterUiShow() {
    this.D_r &&
      this.D_r.bAudioCoverEnable &&
      (this.R_r(),
      UiAudioModel_1.UiAudioModel.AddAudioStateData(this.bne),
      UiAudioModel_1.UiAudioModel.SetRtpcLevelOpening(this.bne.Level),
      UiAudioModel_1.UiAudioModel.CalculateRtpcValueAndApply()),
      this.LAe.LoopAudioEvent &&
        this.OQt.GetLoopAudioEventSwitch() &&
        UiAudioModel_1.UiAudioModel.SetLoopAudioEventShow(
          this.OQt.GetViewId(),
          this.OQt.GetRootActor(),
          this.LAe.LoopAudioEvent,
        );
  }
  OnBeforeUiHide() {
    this.D_r &&
      this.D_r.bAudioCoverEnable &&
      (UiAudioModel_1.UiAudioModel.SetRtpcLevelClosing(this.bne.Level),
      UiAudioModel_1.UiAudioModel.RemoveAudioStateData(this.bne),
      UiAudioModel_1.UiAudioModel.CalculateRtpcValueAndApply()),
      this.LAe.LoopAudioEvent &&
        this.OQt.GetLoopAudioEventSwitch() &&
        UiAudioModel_1.UiAudioModel.SetLoopAudioEventHide(
          this.OQt.GetViewId(),
          this.OQt.GetRootActor(),
          this.LAe.LoopAudioEvent,
        );
  }
  OnBeforeDestroy() {
    (this.D_r = void 0),
      this.LAe.LoopAudioEvent &&
        this.OQt.GetLoopAudioEventSwitch() &&
        UiAudioModel_1.UiAudioModel.SetLoopAudioEventDestroy(
          this.OQt.GetViewId(),
          this.OQt.GetRootActor(),
          this.LAe.LoopAudioEvent,
        ),
      this.LAe.CloseAudioEvent &&
        AudioSystem_1.AudioSystem.PostEvent(this.LAe.CloseAudioEvent);
    var i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(
      this.LAe.Name,
    );
    i.AudioFilter &&
      0 < i.AudioFilter.length &&
      0 !== this.Dja &&
      (AudioFilterController_1.AudioFilterController.RemoveUiFilterState(
        this.Dja,
        this.LAe.Name,
      ),
      (this.Dja = 0));
  }
  R_r() {
    (this.bne = new AudioStateData_1.AudioStateData()),
      (this.bne.Level = this.D_r.AudioUiCover),
      (this.bne.Alpha = this.D_r.AudioUiAlpha);
  }
}
exports.UiBehaviorAudio = UiBehaviorAudio;
//# sourceMappingURL=UiBehaviorAudio.js.map
