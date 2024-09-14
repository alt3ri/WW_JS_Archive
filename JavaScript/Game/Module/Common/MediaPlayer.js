"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediaPlayer = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
class MediaPlayer {
  constructor(i) {
    (this.CgTexture = void 0),
      (this.MediaPlayer = void 0),
      (this.VideoName = void 0),
      (this.MUe = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.z9a = void 0),
      (this.KNo = () => {
        this.z9a?.(this.VideoName),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Video", 38, "[MediaPlayer] 视频播放结束", [
              "视频名称",
              this.VideoName,
            ]);
      }),
      (this.QNo = () => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Video", 38, "[MediaPlayer] 视频文件打开失败", [
            "视频名称",
            this.VideoName,
          ]);
      }),
      (this.CgTexture = i);
    i = this.CgTexture.GetTexture();
    (this.MediaPlayer = i?.GetMediaPlayer()),
      this.MediaPlayer
        ? (this.MediaPlayer.OnEndReached.Add(this.KNo),
          this.MediaPlayer.OnMediaOpenFailed.Add(this.QNo))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Video", 38, "[MediaPlayer] 获取MediaPlayer异常");
  }
  Clear() {
    this.bra(),
      this.MediaPlayer?.OnEndReached.Remove(this.KNo),
      this.MediaPlayer?.OnMediaOpenFailed.Remove(this.QNo),
      this.MediaPlayer?.Close(),
      (this.MediaPlayer = void 0);
  }
  bra() {
    this.MUe !== ResourceSystem_1.ResourceSystem.InvalidId &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MUe),
      (this.MUe = ResourceSystem_1.ResourceSystem.InvalidId)),
      (this.MediaPlayer?.IsPlaying() ?? this.MediaPlayer?.IsPaused()) &&
        this.MediaPlayer?.Close(),
      (this.VideoName = void 0);
  }
  PlayVideo(e, s, t = !1) {
    s &&
      (this.VideoName && this.bra(),
      (this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(
        s,
        UE.MediaSource,
        (i) => {
          i
            ? ((this.MUe = ResourceSystem_1.ResourceSystem.InvalidId),
              this.MediaPlayer.OpenSource(i)
                ? (this.MediaPlayer.SetLooping(t), (this.VideoName = e))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Video",
                    38,
                    "[MediaPlayer] 打开视频失败",
                    ["配置名称", e],
                    ["视频路径", s],
                  ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Video",
                38,
                "[MediaPlayer] mediaSource加载失败",
                ["配置名称", e],
                ["视频路径", s],
              );
        },
      )),
      this.MUe < 0) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Video",
        38,
        "[MediaPlayer] mediaSource加载失败",
        ["配置名称", e],
        ["视频路径", s],
      );
  }
  async LoadVideoAndPlay(e, s, t = !1) {
    if (s) {
      this.VideoName && this.bra();
      const o = new CustomPromise_1.CustomPromise();
      (this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(
        s,
        UE.MediaSource,
        (i) => {
          i
            ? ((this.MUe = ResourceSystem_1.ResourceSystem.InvalidId),
              this.MediaPlayer.OpenSource(i)
                ? (this.MediaPlayer.SetLooping(t), (this.VideoName = e))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Video",
                    38,
                    "[MediaPlayer] 打开视频失败",
                    ["配置名称", e],
                    ["视频路径", s],
                  ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Video",
                38,
                "[MediaPlayer] mediaSource加载失败",
                ["配置名称", e],
                ["视频路径", s],
              ),
            o.SetResult();
        },
      )),
        await o.Promise;
    }
  }
  StopVideo(i) {
    this.VideoName === i &&
      ((this.MediaPlayer.IsPlaying() || this.MediaPlayer.IsPaused()) &&
        this.MediaPlayer.Close(),
      (this.VideoName = void 0));
  }
  PauseVideo(i) {
    this.VideoName === i &&
      this.MediaPlayer.IsPlaying() &&
      this.MediaPlayer.Pause();
  }
  ResumeVideo(i) {
    this.VideoName === i &&
      this.MediaPlayer.IsPaused() &&
      this.MediaPlayer.Play();
  }
  BindCallbackOnVideoEnd(i) {
    this.z9a = i;
  }
}
exports.MediaPlayer = MediaPlayer;
//# sourceMappingURL=MediaPlayer.js.map
