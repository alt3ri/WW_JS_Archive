"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VideoView = void 0);
const UE = require("ue");
const Application_1 = require("../../../Core/Application/Application");
const AudioController_1 = require("../../../Core/Audio/AudioController");
const AudioDefine_1 = require("../../../Core/Audio/AudioDefine");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const UiLayer_1 = require("../../Ui/UiLayer");
const PlotSkipComponent_1 = require("../Plot/PlotView/PlotSkipComponent");
const VideoDefine_1 = require("./VideoDefine");
const VideoLauncher_1 = require("./VideoLauncher");
const USE_TICK = !0;
class VideoView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.bGo = void 0),
      (this.qGo = void 0),
      (this.GGo = void 0),
      (this.NGo = void 0),
      (this.kGo = 0),
      (this.FGo = 0),
      (this.VGo = void 0),
      (this.HGo = void 0),
      (this.fZi = void 0),
      (this.MUe = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.aIn = !1),
      (this.jGo = !1),
      (this.WGo = !0),
      (this.HPn = void 0),
      (this.jPn = !0),
      (this.KGo = () => {
        ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
          "UI点击跳过(VideoView)",
        );
      }),
      (this.n9s = (i) => {
        (this.OpenParam = i), this.OnStart(), (this.jPn = !1), this.JGo();
      }),
      (this.QGo = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Video",
            28,
            "UE.EApplicationDelegate.ApplicationHasReactivatedDelegate",
            ["this.VideoPauseTime", this.HGo],
          ),
          (this.WGo = !0),
          this.HGo &&
            (ModelManager_1.ModelManager.PlatformModel.PlatformType !== 2 &&
              this.qGo?.Seek(this.HGo),
            this.qGo?.Play(),
            (this.HGo = void 0)),
          this.VGo &&
            this.HGo &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Audio",
                56,
                "[VideoView] ResumeVideo 当前只绑定返回应用，全部音频已在CPP的返回应用时处理，跳过此处的音频 Resume",
              ),
            void 0 !== this.NGo) &&
            TimerSystem_1.TimerSystem.IsPause(this.NGo) &&
            TimerSystem_1.TimerSystem.Resume(this.NGo);
      }),
      (this.XGo = () => {
        (this.HGo = this.qGo?.GetTime()),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Video",
              28,
              "UE.EApplicationDelegate.ApplicationWillDeactivateDelegate",
              ["this.VideoPauseTime", this.HGo],
            ),
          (this.WGo = !1),
          ModelManager_1.ModelManager.PlatformModel.PlatformType !== 2 &&
            this.qGo?.Pause(),
          this.VGo &&
            VideoLauncher_1.VideoLauncher.AudioEventResult.PlayingIds.length !==
              0 &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Audio",
                56,
                "[VideoView] PauseVideo 当前只绑定切换后台，全部音频已在CPP的切换后台时处理，跳过此处的音频 Pause",
              ),
            void 0 === this.NGo ||
              TimerSystem_1.TimerSystem.IsPause(this.NGo) ||
              TimerSystem_1.TimerSystem.Pause(this.NGo));
      }),
      (this.WPn = () => {
        const i = this.OpenParam.RemainViewWhenEnd;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Video", 39, "开始关闭VideoView", ["bRemain", i]),
          this.HPn &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Video",
                39,
                "MediaPlayer还在倒计时检查状态中,提前移除timer",
              ),
            this.HPn.Remove(),
            (this.HPn = void 0),
            this.MFs()),
          i
            ? (this.s9s(),
              (0, this.OpenParam?.VideoCloseCb)?.(),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Video", 17, "VideoView callback done"))
            : (this.jPn || this.CloseMe(), (this.jPn = !0));
      }),
      (this.$Go = () => {
        (this.jGo = !0),
          this.WPn(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Video", 28, "视频播放结束", ["视频名称", this.VGo]);
      }),
      (this.YGo = () => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Video",
            39,
            "视频文件打开失败,可能需要修复修复系统文件",
          ),
          this.WPn();
      }),
      (this.JGo = () => {
        if (this.VGo)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Video", 39, "必须等上个视频放完才能放下一个"),
            this.WPn();
        else {
          const o = this.OpenParam.VideoDataConf;
          o
            ? ((this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(
                o.CgFile,
                UE.MediaSource,
                (i) => {
                  if (i)
                    if (
                      ((this.MUe = ResourceSystem_1.ResourceSystem.InvalidId),
                      this.qGo.OpenSource(i))
                    ) {
                      AudioController_1.AudioController.SetState(
                        AudioDefine_1.PLOT_VIDEO_GROUP,
                        AudioDefine_1.PLOT_VIDEO,
                      ),
                        (this.VGo = o.CgName),
                        (this.aIn = !1);
                      (i =
                        !ModelManager_1.ModelManager.GameModeModel
                          .PlayTravelMp4 &&
                        (ModelManager_1.ModelManager.PlotModel.IsGmCanSkip ||
                          o.CanSkip)),
                        (i =
                          (ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(
                            i,
                          ),
                          (this.GGo = [
                            ...ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptions(
                              this.VGo,
                            ),
                          ]),
                          this.GGo.sort((i, e) => e.ShowMoment - i.ShowMoment),
                          this.zGo(),
                          ConfigManager_1.ConfigManager.VideoConfig.GetVideoSounds(
                            this.VGo,
                          )));
                      for (const t of i) {
                        const e = t.EventPath;
                        AudioController_1.AudioController.PostEventByUi(
                          e,
                          VideoLauncher_1.VideoLauncher.AudioEventResult,
                        );
                      }
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName.VideoStart,
                        this.VGo,
                      ),
                        Log_1.Log.CheckDebug() &&
                          Log_1.Log.Debug(
                            "Video",
                            39,
                            "MediaPlayer开始5秒倒计时检查",
                          ),
                        (this.HPn = TimerSystem_1.TimerSystem.Delay(() => {
                          (this.HPn = void 0),
                            this.qGo
                              ? this.qGo.IsPlaying() || this.qGo.IsPaused()
                                ? (Log_1.Log.CheckDebug() &&
                                    Log_1.Log.Debug(
                                      "Video",
                                      39,
                                      "MediaPlayer状态检查通过",
                                    ),
                                  this.MFs())
                                : (Log_1.Log.CheckWarn() &&
                                    Log_1.Log.Warn(
                                      "Video",
                                      39,
                                      "MediaPlayer加载了5秒超时，强制关闭CG界面",
                                      ["配置名称", o.CgName],
                                      ["视频路径", o.CgFile],
                                    ),
                                  this.WPn())
                              : Log_1.Log.CheckDebug() &&
                                Log_1.Log.Debug(
                                  "Video",
                                  39,
                                  "MediaPlayer已经没有了",
                                );
                        }, 5e3));
                    } else
                      Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Video",
                          39,
                          "打开视频失败",
                          ["配置名称", o.CgName],
                          ["视频路径", o.CgFile],
                        ),
                        this.WPn();
                  else
                    Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Video",
                        39,
                        "mediaSource加载失败",
                        ["配置名称", o.CgName],
                        ["视频路径", o.CgFile],
                      ),
                      this.WPn();
                },
              )),
              this.MUe < 0 &&
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Video",
                    39,
                    "mediaSource加载失败",
                    ["配置名称", o.CgName],
                    ["视频路径", o.CgFile],
                  ),
                this.WPn()))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Video", 39, "事件被错误触发了", [
                  "名称",
                  EventDefine_1.EEventName.ShowVideo,
                ]),
              this.WPn());
        }
      }),
      (this.ZGo = () => {
        let i;
        const e = this.qGo.GetVideoTrackAspectRatio(0, 0);
        const t =
          UiLayer_1.UiLayer.UiRootItem.GetWidth() /
          UiLayer_1.UiLayer.UiRootItem.GetHeight();
        t < e
          ? ((i = UiLayer_1.UiLayer.UiRootItem.GetWidth() / e),
            this.bGo.SetHeight(i),
            this.bGo.SetWidth(UiLayer_1.UiLayer.UiRootItem.GetWidth()))
          : e < t &&
            ((i = UiLayer_1.UiLayer.UiRootItem.GetHeight() * e),
            this.bGo.SetWidth(i),
            this.bGo.SetHeight(UiLayer_1.UiLayer.UiRootItem.GetHeight()));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
    ];
  }
  OnStart() {
    if (
      (this.GetButton(1).RootUIComp.SetUIActive(!1),
      (this.fZi = new PlotSkipComponent_1.PlotSkipComponent(
        this.GetButton(1),
        this.KGo,
        void 0,
        this,
      )),
      this.fZi.AddEventListener(),
      this.fZi.EnableSkipButton(!1),
      (this.bGo = this.GetButton(0)
        .GetOwner()
        .GetComponentByClass(UE.UITexture.StaticClass())),
      this.bGo)
    ) {
      const e = this.bGo.GetTexture();
      const t =
        ((this.qGo = e?.GetMediaPlayer()),
        this.qGo ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Video", 39, "获取MediaPlayer异常！！")),
        this.qGo.OnEndReached.Add(this.$Go),
        this.qGo.OnMediaOpened.Add(this.ZGo),
        this.qGo.OnMediaOpenFailed.Add(this.YGo),
        this.GetText(2).SetUIActive(!1),
        this.OpenParam?.BackgroundColor?.FadeInBackgroundType ??
          IAction_1.EMovieBackgroundType.Black);
      let i = void 0;
      (i =
        t === IAction_1.EMovieBackgroundType.White
          ? new UE.LinearColor(1, 1, 1, 1)
          : (IAction_1.EMovieBackgroundType.Black,
            new UE.LinearColor(0, 0, 0, 1))),
        (e.ClearColor = i),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Video", 27, "改变CG界面底色", ["color", t]);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Video", 39, "获取CgTexture异常！！");
  }
  async OnPlayingStartSequenceAsync() {
    const i = new CustomPromise_1.CustomPromise();
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 27, "VideoView界面隐藏"),
      this.SetUiActive(!1),
      TimerSystem_1.TimerSystem.Delay(() => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Video", 27, "VideoView界面显示"),
          this.SetUiActive(!0),
          i.SetResult();
      }, 100),
      await i.Promise;
  }
  OnAfterShow() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 28, "VideoView OnShow"),
      (this.jPn = !1),
      this.JGo();
  }
  s9s() {
    void 0 !== this.NGo &&
      (TimerSystem_1.TimerSystem.Remove(this.NGo), (this.NGo = void 0)),
      this.MUe !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MUe),
        (this.MUe = ResourceSystem_1.ResourceSystem.InvalidId)),
      (this.VGo = void 0),
      this.qGo?.OnEndReached.Remove(this.$Go),
      this.qGo?.OnMediaOpened.Remove(this.ZGo),
      this.qGo?.OnMediaOpenFailed.Remove(this.YGo),
      this.qGo?.Close(),
      (this.qGo = void 0),
      (this.GGo = void 0),
      (this.HGo = void 0),
      AudioController_1.AudioController.StopEvent(
        VideoLauncher_1.VideoLauncher.AudioEventResult,
        !this.jGo,
      ),
      AudioController_1.AudioController.SetState(
        AudioDefine_1.PLOT_VIDEO_GROUP,
        AudioDefine_1.PLOT_NOT_VIDEO,
      ),
      (this.aIn = !1),
      this.fZi?.OnClear(),
      this.fZi?.RemoveEventListener(),
      (this.fZi = void 0);
  }
  OnBeforeHide() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Video", 17, "VideoView OnBeforeHide"),
      this.fZi.EnableSkipButton(!1);
  }
  OnBeforeDestroy() {
    this.s9s(),
      (0, this.OpenParam?.VideoCloseCb)?.(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Video", 17, "VideoView callback done");
  }
  OnAddEventListener() {
    Application_1.Application.AddApplicationHandler(1, this.QGo),
      Application_1.Application.AddApplicationHandler(0, this.XGo),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlayVideo,
        this.n9s,
      );
  }
  OnRemoveEventListener() {
    Application_1.Application.RemoveApplicationHandler(1, this.QGo),
      Application_1.Application.RemoveApplicationHandler(0, this.XGo),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlayVideo,
        this.n9s,
      );
  }
  zGo() {
    if (!this.GGo?.length || USE_TICK) this.NGo = void 0;
    else {
      const o = this.GGo.pop();
      const i =
        ((o.ShowMoment - this.kGo - this.FGo) /
          VideoDefine_1.VideoUtils.FramePerSecond) *
        TimeUtil_1.TimeUtil.InverseMillisecond;
      this.NGo = TimerSystem_1.TimerSystem.Delay((i) => {
        let e =
          ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptionText(o);
        const t = this.GetText(2);
        t.SetUIActive(!0), t.SetText(e);
        e =
          (o.Duration / VideoDefine_1.VideoUtils.FramePerSecond) *
          TimeUtil_1.TimeUtil.InverseMillisecond;
        this.NGo = TimerSystem_1.TimerSystem.Delay((i) => {
          t.SetUIActive(!1),
            (this.kGo = o.ShowMoment),
            (this.FGo = o.Duration),
            this.zGo();
        }, e);
      }, i);
    }
  }
  eNo(i) {
    if (this.GGo?.length && USE_TICK && this.WGo) {
      let e;
      let t;
      const o = UE.KismetMathLibrary.GetTotalMilliseconds(this.qGo.GetTime());
      let i = void 0;
      for (; this.GGo.length > 0; ) {
        if (
          !(
            ((i = this.GGo[this.GGo.length - 1]).ShowMoment + i.Duration) *
              VideoDefine_1.VideoUtils.MillisecondPerFrame <
            o
          )
        )
          break;
        this.GGo.pop(),
          this.aIn
            ? ((this.aIn = !1),
              this.GetText(2).SetUIActive(!1),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Video",
                  27,
                  "CG字幕关闭",
                  ["id", i.CaptionId],
                  ["frame", o * VideoDefine_1.VideoUtils.FramePerMillisecond],
                  ["config frame", i.ShowMoment + i.Duration],
                ))
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Video", 27, "CG字幕废弃", ["id", i.CaptionId]),
          (i = void 0);
      }
      !i ||
        this.aIn ||
        o < i.ShowMoment * VideoDefine_1.VideoUtils.MillisecondPerFrame ||
        ((this.aIn = !0),
        (e = this.GetText(2)),
        (t = ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptionText(i)),
        e.SetUIActive(!0),
        e.SetText(t),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Video",
            27,
            "CG字幕",
            ["text", t],
            ["frame", o * VideoDefine_1.VideoUtils.FramePerMillisecond],
            ["config frame", i.ShowMoment],
            ["id", i.CaptionId],
          ));
    }
  }
  MFs() {
    const i = this.OpenParam?.BackgroundColor?.FadeOutBackgroundType;
    let e = void 0;
    let t = !0;
    switch (i) {
      case IAction_1.EMovieBackgroundType.White:
        (e = new UE.LinearColor(1, 1, 1, 1)),
          (t =
            ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.SetColor(
              IAction_1.EFadeInScreenShowType.White,
            ));
        break;
      case IAction_1.EMovieBackgroundType.Black:
        (e = new UE.LinearColor(0, 0, 0, 1)),
          (t =
            ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.SetColor(
              IAction_1.EFadeInScreenShowType.Black,
            ));
        break;
      default:
        e = new UE.LinearColor(0, 0, 0, 1);
    }
    t ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Video",
          27,
          "[VideoView] 当前未开启黑幕界面，继承颜色失败",
        )),
      (this.bGo.GetTexture().ClearColor = e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Video", 27, "改变CG界面底色", ["color", i]);
  }
  OnTick(i) {
    this.eNo(i);
  }
}
exports.VideoView = VideoView;
// # sourceMappingURL=VideoView.js.map
