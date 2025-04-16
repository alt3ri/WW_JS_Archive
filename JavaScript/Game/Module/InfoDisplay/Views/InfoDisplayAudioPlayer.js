"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayAudioPlayer = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InfoDisplayAudioPlayerImpl_1 = require("../Data/InfoDisplayAudioPlayerImpl"),
  InfoDisplayModel_1 = require("../Data/InfoDisplayModel");
class InfoDisplayAudioPlayer extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.sai = void 0),
      (this.jsi = void 0),
      (this.$si = () => {
        this.sai?.OnClickPlayAudioBtn();
      });
  }
  Initialize(i) {
    this.CreateThenShowByActor(i),
      (this.sai = new InfoDisplayAudioPlayerImpl_1.InfoDisplayAudioPlayerImpl(
        this.RootActor,
        this.GetExtendToggle(0),
      ));
  }
  SetShowTextComponent(i) {
    (this.jsi = i), this.jsi.SetText("00:00/00:00");
  }
  SetSpectrumCallBack(i) {
    this.sai.SetSpectrumCallBack(i);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]]),
      (this.BtnBindInfo = [[0, this.$si]]);
  }
  OnTick(i) {
    var e;
    this.sai.OnTick(i),
      this.sai.IsPlaying() &&
        ((i = InfoDisplayModel_1.InfoDisplayModel.ConvertToHourMinuteString(
          this.sai.GetCurrentRunningTimeInSecond(),
        )),
        (e = InfoDisplayModel_1.InfoDisplayModel.ConvertToHourMinuteString(
          this.sai.GetMaxDurationInSecond(),
        )),
        this.jsi.SetText(i + "/" + e));
  }
  async Refresh(i) {
    await this.sai.SetAudioClipPathAndLoadAudio(i), this.sai.Start();
  }
  OnBeforeDestroy() {
    this.sai.Release();
  }
}
exports.InfoDisplayAudioPlayer = InfoDisplayAudioPlayer;
//# sourceMappingURL=InfoDisplayAudioPlayer.js.map
