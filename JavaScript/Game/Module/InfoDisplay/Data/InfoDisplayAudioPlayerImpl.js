"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayAudioPlayerImpl = void 0);
const puerts_1 = require("puerts"),
  AudioController_1 = require("../../../../Core/Audio/AudioController"),
  Log_1 = require("../../../../Core/Common/Log"),
  MS_PER_SECOND = 1e3;
class InfoDisplayAudioPlayerImpl {
  constructor(i, t) {
    (this.brc = void 0),
      (this.Lrc = void 0),
      (this.Uqe = 0),
      (this.$Zt = 1),
      (this.Td = !1),
      (this.Wsi = -0),
      (this.Qsi = ""),
      (this.mQe = !1),
      (this.wrc = !1),
      (this.YZt = void 0),
      (this.OverrideEndCallBack = void 0),
      (this.OnPlay = void 0),
      (this.OnPause = void 0),
      (this.zsi = (i, t) => {
        0 === i &&
          this.Td &&
          (Log_1.Log.CheckDebug() && Log_1.Log.Debug("InfoDisplay", 27, "End"),
          AudioController_1.AudioController.StopAudio(this.Lrc),
          this.OverrideEndCallBack
            ? this.OverrideEndCallBack()
            : ((i = this.Qsi),
              AudioController_1.AudioController.GetAudioEvent(i, !1) &&
                this.XZi(i)),
          (this.Uqe = 0));
      }),
      (this.Lrc = i),
      (this.brc = t);
  }
  Start() {
    this.Rrc();
  }
  Stop() {
    this.Release();
  }
  Release() {
    this.oai(),
      this.YZt &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.zsi),
        (this.YZt = void 0));
  }
  SetSpectrumCallBack(i) {}
  async SetAudioClipPathAndLoadAudio(i) {
    i && ((this.Qsi = i), await this.Arc());
  }
  OnClickPlayAudioBtn() {
    this.Rrc();
  }
  OnTick(i) {
    this.IsPlaying() && this.iai(i);
  }
  IsPlaying() {
    return this.Td && !this.mQe;
  }
  GetMaxDurationInSecond() {
    return this.Wsi;
  }
  GetCurrentRunningTimeInSecond() {
    return this.Uqe / MS_PER_SECOND;
  }
  async Arc() {
    return (
      this.oai(),
      new Promise((i) => {
        AudioController_1.AudioController.LoadAndAddCallback(this.Qsi, () => {
          void 0 === AudioController_1.AudioController.GetAudioEvent(this.Qsi)
            ? (Log_1.Log.CheckError() &&
                Log_1.Log.Error("InfoDisplay", 74, "音频加载失败，请检查配置", [
                  "audioPath:",
                  this.Qsi,
                ]),
              (this.wrc = !1),
              i(!1))
            : ((this.Wsi = AudioController_1.AudioController.GetAudioEvent(
                this.Qsi,
              ).MaximumDuration),
              (this.wrc = !0),
              i(!0));
        });
      })
    );
  }
  Rrc() {
    this.wrc &&
      (this.Td
        ? this.mQe
          ? this.Ysi()
          : this.Jsi()
        : (this.YZt ||
            (this.YZt = (0, puerts_1.toManualReleaseDelegate)(this.zsi)),
          this.XZi(this.Qsi),
          (this.Td = !0),
          (this.mQe = !1)),
      this.brc.SetToggleState(this.mQe ? 0 : 1),
      this.mQe ? this.OnPause && this.OnPause() : this.OnPlay && this.OnPlay());
  }
  Jsi() {
    this.mQe = !0;
    var i = AudioController_1.AudioController.GetAudioEvent(this.Qsi, !1);
    AudioController_1.AudioController.ExecuteActionOnEvent(i, 1, this.Lrc);
  }
  Ysi() {
    this.mQe = !1;
    var i = AudioController_1.AudioController.GetAudioEvent(this.Qsi, !1);
    AudioController_1.AudioController.ExecuteActionOnEvent(i, 2, this.Lrc);
  }
  XZi(i) {
    AudioController_1.AudioController.PlayAudioByEventPath(
      i,
      this.Lrc,
      this.$Zt,
      this.YZt,
    );
  }
  iai(i) {
    (this.Uqe += i),
      this.Uqe >= this.Wsi * MS_PER_SECOND &&
        (this.Uqe = this.Wsi * MS_PER_SECOND);
  }
  oai() {
    AudioController_1.AudioController.StopAudio(this.Lrc),
      (this.Uqe = 0),
      (this.Td = !1),
      (this.wrc = !1);
  }
}
exports.InfoDisplayAudioPlayerImpl = InfoDisplayAudioPlayerImpl;
//# sourceMappingURL=InfoDisplayAudioPlayerImpl.js.map
