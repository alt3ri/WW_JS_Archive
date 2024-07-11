"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherAudio = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherResourceLib_1 = require("./LauncherResourceLib"),
  LauncherLog_1 = require("./LauncherLog"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  PAUSE_AUDIO_EVENT =
    "/Game/Aki/WwiseAudio/Events/pause_all_wwise_audio.pause_all_wwise_audio",
  RESUME_AUDIO_EVENT =
    "/Game/Aki/WwiseAudio/Events/resume_all_wwise_audio.resume_all_wwise_audio";
class LauncherAudio {
  static Initialize() {
    this.gU ||
      ("IOS" === UE.GameplayStatics.GetPlatformName() &&
        (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip()
          ? (UE.KuroAudioStatics.SetIosAuditPackage(!0),
            UE.KuroAudioStatics.ChangeIosAudioSessionProperties(),
            LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
              PAUSE_AUDIO_EVENT,
              UE.AkAudioEvent,
              (e) => {
                (this.Fyr = e), this.Vyr();
              },
            ),
            LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
              RESUME_AUDIO_EVENT,
              UE.AkAudioEvent,
              (e) => {
                (this.Hyr = e), this.Vyr();
              },
            ),
            (this.gU = !0))
          : LauncherLog_1.LauncherLog.Info("LauncherAudio 不是提审包 ~")));
  }
  static Vyr() {
    void 0 !== this.Fyr &&
      void 0 !== this.Hyr &&
      (UE.KuroAudioDelegates.SetAudioPauseDelegate(
        (0, puerts_1.toManualReleaseDelegate)(this.jyr),
      ),
      UE.KuroAudioDelegates.SetAudioResumeDelegate(
        (0, puerts_1.toManualReleaseDelegate)(this.Wyr),
      ));
  }
  static Destroy() {
    this.gU &&
      (void 0 !== this.Fyr &&
        void 0 !== this.Hyr &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.jyr),
        UE.KuroAudioDelegates.UnbindAudioPauseDelegate(),
        (0, puerts_1.releaseManualReleaseDelegate)(this.Wyr),
        UE.KuroAudioDelegates.UnbindAudioResumeDelegate()),
      (this.gU = !1));
  }
}
(exports.LauncherAudio = LauncherAudio),
  ((_a = LauncherAudio).Fyr = void 0),
  (LauncherAudio.Hyr = void 0),
  (LauncherAudio.gU = !1),
  (LauncherAudio.oWr = void 0),
  (LauncherAudio.jyr = () => {
    void 0 !== _a.Fyr &&
      (!0 === _a.oWr
        ? LauncherLog_1.LauncherLog.Info("重复暂停音乐")
        : (LauncherLog_1.LauncherLog.Info("暂停所有音乐"),
          UE.AkGameplayStatics.PostEvent(_a.Fyr, void 0, 0, void 0),
          UE.AkGameplayStatics.RenderAudio(),
          (_a.oWr = !0)));
  }),
  (LauncherAudio.Wyr = () => {
    void 0 !== _a.Hyr &&
      (!1 === _a.oWr
        ? LauncherLog_1.LauncherLog.Info("重复恢复音乐")
        : (LauncherLog_1.LauncherLog.Info("恢复所有音乐"),
          UE.AkGameplayStatics.PostEvent(_a.Hyr, void 0, 0, void 0),
          UE.AkGameplayStatics.RenderAudio(),
          (_a.oWr = !1)));
  });
//# sourceMappingURL=LauncherAudio.js.map
