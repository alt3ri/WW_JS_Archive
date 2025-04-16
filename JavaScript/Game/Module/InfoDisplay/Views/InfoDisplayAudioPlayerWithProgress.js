"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayAudioPlayerWithProgress = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InfoDisplayAudioPlayerImpl_1 = require("../Data/InfoDisplayAudioPlayerImpl"),
  InfoDisplayModel_1 = require("../Data/InfoDisplayModel");
class InfoDisplayAudioPlayerWithProgress extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.sai = void 0),
      (this.xrc = void 0),
      (this.Urc = void 0),
      (this.Drc = 1),
      (this.$si = () => {
        this.sai?.OnClickPlayAudioBtn();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [2, UE.UIExtendToggle],
      [1, UE.UISliderComponent],
      [0, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.$si]]);
  }
  OnStart() {
    (this.xrc = this.GetText(0)),
      (this.Urc = this.GetSlider(1)),
      this.xrc.SetText("00:00/00:00"),
      this.Urc.SetValue(0);
  }
  OnBeforeDestroy() {
    this.sai?.Release();
  }
  Stop() {
    this.sai?.Stop();
  }
  async InitAudioPlayer(i) {
    (this.sai = new InfoDisplayAudioPlayerImpl_1.InfoDisplayAudioPlayerImpl(
      this.GetRootActor(),
      this.GetExtendToggle(2),
    )),
      await this.sai.SetAudioClipPathAndLoadAudio(i),
      (this.Drc = this.sai.GetMaxDurationInSecond()),
      this.sai.Start();
  }
  SetOnAudioEnd(i) {
    this.sai && (this.sai.OverrideEndCallBack = i);
  }
  SetOnPlay(i) {
    this.sai && (this.sai.OnPlay = i);
  }
  SetOnPause(i) {
    this.sai && (this.sai.OnPause = i);
  }
  Tick(i) {
    this.sai?.OnTick(i),
      this.sai?.IsPlaying() &&
        ((i = this.sai.GetCurrentRunningTimeInSecond()),
        this.Brc(i),
        this.krc(i));
  }
  Brc(i) {
    this.xrc.SetText(
      InfoDisplayModel_1.InfoDisplayModel.ConvertToHourMinuteString(i),
    );
  }
  krc(i) {
    this.Urc.SetValue((i / this.Drc) * this.Urc.GetMaxValue());
  }
}
exports.InfoDisplayAudioPlayerWithProgress = InfoDisplayAudioPlayerWithProgress;
//# sourceMappingURL=InfoDisplayAudioPlayerWithProgress.js.map
