"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VideoLauncher = void 0);
const AudioController_1 = require("../../../Core/Audio/AudioController");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiManager_1 = require("../../Ui/UiManager");
class VideoLauncher {
  static ShowVideoCg(e, i, o, a) {
    e ? VideoLauncher.ShowVideoCgAsync(e, i, o, a) : i();
  }
  static async ShowVideoCgAsync(e, i, o, a) {
    this.BGo = i;
    const n = ConfigManager_1.ConfigManager.VideoConfig.GetVideoData(e);
    n
      ? ((this.pDe = {
          VideoDataConf: n,
          VideoCloseCb: this.Neo,
          BackgroundColor: o,
          RemainViewWhenEnd: a,
        }),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Video", 39, "打开视频播放界面", ["视频配置", e]),
        UiManager_1.UiManager.IsViewShow("VideoView")
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.PlayVideo,
              this.pDe,
            )
          : await UiManager_1.UiManager.OpenViewAsync("VideoView", this.pDe))
      : i?.();
  }
  static CloseVideoCg(e) {
    (this.BGo = void 0), UiManager_1.UiManager.CloseView("VideoView", e);
  }
}
(exports.VideoLauncher = VideoLauncher),
  ((_a = VideoLauncher).BGo = void 0),
  (VideoLauncher.pDe = void 0),
  (VideoLauncher.Neo = () => {
    let e;
    _a.BGo && ((e = _a.BGo), (_a.BGo = void 0), e());
  }),
  (VideoLauncher.AudioEventResult = new AudioController_1.PlayResult());
// # sourceMappingURL=VideoLauncher.js.map
