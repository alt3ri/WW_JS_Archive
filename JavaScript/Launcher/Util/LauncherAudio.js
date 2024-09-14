"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherAudio = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  Platform_1 = require("../Platform/Platform"),
  LauncherLog_1 = require("./LauncherLog"),
  LauncherResourceLib_1 = require("./LauncherResourceLib"),
  PAUSE_AUDIO_EVENT =
    "/Game/Aki/WwiseAudio/Events/pause_all_wwise_audio.pause_all_wwise_audio",
  RESUME_AUDIO_EVENT =
    "/Game/Aki/WwiseAudio/Events/resume_all_wwise_audio.resume_all_wwise_audio";
class LauncherAudio {
  static Init() {
    UE.AkGameplayStatics.ClearSoundBanksAndMedia(),
      UE.AkGameplayStatics.UnloadInitBank(),
      UE.AkGameplayStatics.LoadInitBank(),
      UE.AkGameplayStatics.ReloadAudioAssetData();
  }
  static InitIosAuditPackage() {
    this.gU ||
      (Platform_1.Platform.IsIOSPlatform() &&
        (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip()
          ? (UE.KuroAudioStatics.SetIosAuditPackage(!0),
            UE.KuroAudioStatics.ChangeIosAudioSessionProperties(),
            LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
              PAUSE_AUDIO_EVENT,
              UE.AkAudioEvent,
              (e) => {
                (this.NIr = e), this.OIr();
              },
            ),
            LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
              RESUME_AUDIO_EVENT,
              UE.AkAudioEvent,
              (e) => {
                (this.kIr = e), this.OIr();
              },
            ),
            (this.gU = !0))
          : LauncherLog_1.LauncherLog.Info("LauncherAudio 不是提审包 ~")));
  }
  static OIr() {
    void 0 !== this.NIr &&
      void 0 !== this.kIr &&
      (UE.KuroAudioDelegates.SetAudioPauseDelegate(
        (0, puerts_1.toManualReleaseDelegate)(this.FIr),
      ),
      UE.KuroAudioDelegates.SetAudioResumeDelegate(
        (0, puerts_1.toManualReleaseDelegate)(this.VIr),
      ));
  }
  static Destroy() {
    this.gU &&
      (void 0 !== this.NIr &&
        void 0 !== this.kIr &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.FIr),
        UE.KuroAudioDelegates.UnbindAudioPauseDelegate(),
        (0, puerts_1.releaseManualReleaseDelegate)(this.VIr),
        UE.KuroAudioDelegates.UnbindAudioResumeDelegate()),
      (this.gU = !1));
  }
}
(exports.LauncherAudio = LauncherAudio),
  ((_a = LauncherAudio).NIr = void 0),
  (LauncherAudio.kIr = void 0),
  (LauncherAudio.gU = !1),
  (LauncherAudio.Gjr = void 0),
  (LauncherAudio.FIr = () => {
    void 0 !== _a.NIr &&
      (!0 === _a.Gjr
        ? LauncherLog_1.LauncherLog.Info("重复暂停音乐")
        : (LauncherLog_1.LauncherLog.Info("暂停所有音乐"),
          UE.AkGameplayStatics.PostEvent(_a.NIr, void 0, 0, void 0),
          UE.AkGameplayStatics.RenderAudio(),
          (_a.Gjr = !0)));
  }),
  (LauncherAudio.VIr = () => {
    void 0 !== _a.kIr &&
      (!1 === _a.Gjr
        ? LauncherLog_1.LauncherLog.Info("重复恢复音乐")
        : (LauncherLog_1.LauncherLog.Info("恢复所有音乐"),
          UE.AkGameplayStatics.PostEvent(_a.kIr, void 0, 0, void 0),
          UE.AkGameplayStatics.RenderAudio(),
          (_a.Gjr = !1)));
  });
//# sourceMappingURL=LauncherAudio.js.map
