"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
  LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
  UiManager_1 = require("../../Ui/UiManager"),
  TimeTrackController_1 = require("../TimeTrackControl/TimeTrackController"),
  CAMERA_TAG = new UE.FName("SequenceCamera");
class SimpleLevelSequenceActor {
  constructor(e) {
    (this.bPe = void 0),
      (this.qPe = void 0),
      (this.GPe = UE.NewArray(UE.Actor)),
      (this.NPe = 0),
      (this.OPe = 0),
      (this.kPe = 0),
      (this.FPe = 0),
      (this.VPe = 0),
      (this.HPe = 0),
      (this.jPe = 0),
      (this.WPe = 0),
      (this.KPe = !1),
      (this.QPe = !1),
      (this.XPe = !1),
      (this.$Pe = ""),
      (this.YPe = !1),
      (this.JPe = !1),
      (this.zPe = 0),
      (this.exe = void 0),
      (this.txe = !1),
      (this.ixe = 0),
      (this.oxe = 0),
      (this.rxe = !1),
      (this.nxe = 1),
      (this.sxe = !1),
      (this.axe = () => {
        CameraController_1.CameraController.SequenceCamera.GetComponent(
          10,
        )?.GetIsInCinematic()
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("UiCore", 46, "DoPlayToMark在Cinematic因此跳过"),
            (this.XPe = !0),
            this.PlayLevelsequence(this.$Pe, this.XPe))
          : this.sxe
            ? this.PlayLevelsequence(this.$Pe, this.XPe)
            : this.XPe || !this.hxe
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "UiCore",
                    46,
                    "DoPlayToMark为JumpToEnd或者没有camera轨道",
                    [
                      "CameraMode",
                      ModelManager_1.ModelManager.CameraModel?.CameraMode,
                    ],
                  ),
                this.PlayLevelsequence(this.$Pe, this.XPe))
              : (this.YPe
                  ? Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("UiCore", 46, "DoPlayToMark非首次绑定", [
                      "CameraMode",
                      ModelManager_1.ModelManager.CameraModel?.CameraMode,
                    ])
                  : Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("UiCore", 46, "DoPlayToMark首次绑定", [
                      "CameraMode",
                      ModelManager_1.ModelManager.CameraModel?.CameraMode,
                    ]),
                1 === this.jPe
                  ? this.lxe(
                      this.ixe,
                      this.VPe,
                      this.NPe,
                      this.OPe,
                      () => {
                        this._xe();
                      },
                      () => {
                        this.PlayLevelsequence(this.$Pe, this.XPe);
                      },
                    )
                  : this._xe(() => {
                      this.PlayLevelsequence(this.$Pe, this.XPe);
                    }));
      }),
      (this.B_e = () => {
        (this.exe = void 0),
          CameraController_1.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(
            this,
          ),
          (this.rxe = !1),
          LevelLoadingController_1.LevelLoadingController.CloseLoading(9),
          this.JPe ||
            ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi ||
            CameraController_1.CameraController.SceneCamera.DisplayComponent.SetUiActive(
              !0,
            );
      }),
      (this.bPe = e).HasBindingTag(CAMERA_TAG, !0) && (this.hxe = !0),
      this.mxe();
  }
  UpdateSettings(e) {
    this.JPe = e ?? !1;
  }
  ForceSwitchSceneCamera(e) {
    return this.qPe?.IsValid()
      ? this.hxe
        ? ((this.sxe = !0),
          e
            ? ((this.txe = !0),
              this._xe(() => {
                UiManager_1.UiManager.OpenView(
                  "TimeTrackControlView",
                  void 0,
                  (e) => {
                    e
                      ? CameraController_1.CameraController.Model.IsToSceneCameraMode() ||
                        (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "SceneGameplay",
                            46,
                            "时间控制装置启动请求:失败，IsToSceneCameraMode",
                          ),
                        TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
                        TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose(),
                        UiManager_1.UiManager.GetViewByName(
                          "TimeTrackControlView",
                        )?.CloseMe(),
                        TimeTrackController_1.TimeTrackController.FinishCallback(
                          !1,
                        ))
                      : (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "SceneGameplay",
                            46,
                            "时间控制装置启动请求:失败，OpenView(EUiViewName.TimeTrackControlView",
                          ),
                        TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
                        TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose(),
                        TimeTrackController_1.TimeTrackController.FinishCallback(
                          !1,
                        ));
                  },
                );
              }))
            : ((this.txe = !1), this.dxe()),
          !0)
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneGameplay",
              46,
              "时间控制装置启动请求:失败，!this.HasCameraTrack",
            ),
          !1)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneGameplay",
            46,
            "时间控制装置启动请求:失败，!this.Director?.IsValid()",
          ),
        !1);
  }
  PlayToMarkOld(e, t, i, s) {
    this.Cxe(e) &&
      ((this.$Pe = e),
      (this.NPe = t),
      (this.FPe = i),
      (this.XPe = s),
      (this.zPe = 0),
      this.gxe());
  }
  PlayToMark(e, t, i, s) {
    if (this.Cxe(e)) {
      if (((this.$Pe = e), t))
        switch (((this.jPe = t.TransitType), this.jPe)) {
          case 0:
            (this.VPe = t.Duration ?? 0),
              (this.NPe = t.Duration ?? 0),
              (this.OPe = 0),
              (this.KPe = t.IsValid ?? !1);
            break;
          case 1:
            (this.VPe = t.Duration ?? 0),
              (this.NPe = t.TransitFadeIn ?? 0),
              (this.OPe = t.TransitFadeOut ?? 0),
              (this.KPe = t.IsValid ?? !1),
              (this.ixe = t.Mask);
        }
      if (i)
        switch (((this.WPe = i.TransitType), this.WPe)) {
          case 0:
            (this.HPe = i.Duration ?? 0),
              (this.kPe = 0),
              (this.FPe = i.Duration ?? 0),
              (this.QPe = i.IsValid ?? !1);
            break;
          case 1:
            (this.HPe = i.Duration ?? 0),
              (this.kPe = i.TransitFadeIn ?? 0),
              (this.FPe = i.TransitFadeOut ?? 0),
              (this.QPe = i.IsValid ?? !1),
              (this.oxe = i.Mask);
        }
      (this.XPe = s), (this.zPe = 0), this.gxe();
    }
  }
  gxe() {
    ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed
      ? this.axe()
      : EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.WorldDoneAndCloseLoading,
          this.axe,
        );
  }
  PlayLevelsequence(e, t) {
    if (this.qPe?.IsValid()) {
      var i = this.qPe.SequencePlayer;
      if (i?.IsValid()) {
        if (t)
          i.Play(),
            i.SetPlaybackPosition(
              new UE.MovieSceneSequencePlaybackParams(
                new UE.FrameTime(),
                0,
                e,
                2,
                1,
              ),
            ),
            i.Pause();
        else
          switch (this.zPe) {
            case 0:
              i.PlayTo(
                new UE.MovieSceneSequencePlaybackParams(
                  new UE.FrameTime(),
                  0,
                  e,
                  2,
                  0,
                ),
              );
              break;
            case 1:
              i.PlayTo_Circle(
                new UE.MovieSceneSequencePlaybackParams(
                  new UE.FrameTime(),
                  0,
                  e,
                  2,
                  0,
                ),
                !0,
              );
          }
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Interaction",
            34,
            "LevelSequence播放至对应mark",
            ["levelSequence", this.bPe.GetName()],
            ["mark", e],
          );
      }
    }
  }
  mxe() {
    var e = new UE.MovieSceneSequencePlaybackSettings(),
      e =
        ((e.bDisableMovementInput = !1),
        (e.bDisableLookAtInput = !1),
        (this.qPe = ActorSystem_1.ActorSystem.Get(
          UE.LevelSequenceActor.StaticClass(),
          new UE.Transform(),
          void 0,
          !1,
        )),
        (this.qPe.PlaybackSettings = e),
        this.qPe.SetSequence(this.bPe),
        this.qPe.SequencePlayer);
    e?.IsValid()
      ? (e.OnPause.Add(this.pxe.bind(this)),
        e.OnStop.Add(this.vxe.bind(this)),
        e.OnFinished.Add(this.Mxe.bind(this)))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Level", 46, "SimpleLevelSequenceActor 没找到Player");
  }
  vxe() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Level", 34, "SimpleLevelSequenceActor OnSequenceStop", [
        "levelSequence",
        this.bPe.GetName(),
      ]);
  }
  pxe() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Level", 34, "SimpleLevelSequenceActor OnSequencePause", [
        "levelSequence",
        this.bPe.GetName(),
      ]),
      this.XPe ||
        (1 !== this.WPe || this.sxe
          ? this.Exe()
          : this.lxe(
              this.oxe,
              this.HPe,
              this.kPe,
              this.FPe,
              () => {
                CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
                  this.exe,
                  void 0,
                  this.WPe,
                );
              },
              () => {
                this.Exe();
              },
            ));
  }
  Mxe() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Level",
        34,
        "SimpleLevelSequenceActor OnSequenceFinish",
        ["levelSequence", this.bPe.GetName()],
      ),
      this.XPe ||
        (1 !== this.WPe || this.sxe
          ? this.Exe()
          : this.lxe(
              this.oxe,
              this.HPe,
              this.kPe,
              this.FPe,
              () => {
                CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
                  this.exe,
                  void 0,
                  this.WPe,
                );
              },
              () => {
                this.Exe();
              },
            ));
  }
  Exe() {
    (Global_1.Global.CharacterCameraManager.FadeAmount = 0),
      !this.hxe ||
        (ModelManager_1.ModelManager.StaticSceneModel
          .IsNotAutoExitSceneCamera &&
          this.txe) ||
        this.sxe ||
        this.dxe();
  }
  Cxe(t) {
    var i = this.bPe.GetMovieScene();
    let s = !1;
    if (i)
      for (let e = 0; e < i.MarkedFrames.Num(); e++)
        if (i.MarkedFrames.Get(e).Label === t) {
          s = !0;
          break;
        }
    return (
      !!s ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Interaction",
          34,
          "mark配置不合法",
          ["levelSequence", this.bPe.GetName()],
          ["mark", t],
        ),
      !1)
    );
  }
  _xe(e = () => {}) {
    var t;
    this.qPe?.IsValid()
      ? ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Camera",
              46,
              "SimpleLevelSeqeunce:演出中触发了场景镜头切换 请检查配置",
            ),
          e())
        : ((t = this.qPe.SequencePlayer.IsPlaying()),
          this.JPe ||
            ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi ||
            t ||
            CameraController_1.CameraController.SceneCamera.DisplayComponent.SetUiActive(
              !1,
            ),
          this.exe?.IsBinding ||
            ((this.exe =
              CameraController_1.CameraController.SceneCamera.DisplayComponent.GetUnBoundSceneCamera(
                0,
              )),
            (this.exe.IsKeepUi = this.JPe),
            this.KPe
              ? (this.exe.FadeIn = 0 !== this.NPe ? this.NPe : this.VPe)
              : (this.exe.FadeIn = 0),
            this.QPe
              ? (this.exe.FadeOut = 0 !== this.FPe ? this.FPe : this.HPe)
              : (this.exe.FadeOut = 0)),
          this.GPe.Empty(),
          this.GPe.Add(this.exe.Camera),
          this.qPe.SetBindingByTag(CAMERA_TAG, this.GPe, !0),
          3 === ModelManager_1.ModelManager.CameraModel.CameraMode
            ? ((this.YPe = !0),
              (this.exe.IsBinding = !0),
              CameraController_1.CameraController.SceneCamera.PlayerComponent.EnterSceneSubCamera(
                this.exe,
              ),
              e())
            : this.sxe
              ? 1 === this.jPe
                ? this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
                    CameraController_1.CameraController.EnterCameraMode(
                      3,
                      0,
                      0,
                      0,
                      () => {
                        CameraController_1.CameraController.Model.IsToSceneCameraMode()
                          ? e()
                          : (TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
                            TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose());
                      },
                      !0,
                    );
                  })
                : CameraController_1.CameraController.EnterCameraMode(
                    3,
                    this.NPe ?? 1,
                    0,
                    0,
                    () => {
                      CameraController_1.CameraController.Model.IsToSceneCameraMode()
                        ? e()
                        : (TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
                          TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose());
                    },
                    !0,
                  )
              : (this.YPe
                  ? Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Level",
                      34,
                      "EnterSceneCamera CameraBindFinished为True",
                      ["levelSequence", this.bPe.GetName()],
                    )
                  : Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Level",
                      34,
                      "EnterSceneCamera CameraBindFinished为False",
                      ["levelSequence", this.bPe.GetName()],
                    ),
                CameraController_1.CameraController.EnterCameraMode(
                  3,
                  this.NPe ?? 1,
                  0,
                  0,
                  e,
                ) || e(),
                (this.YPe = !0),
                (this.exe.IsBinding = !0)))
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCore",
            46,
            "SimpleLevelSeqeunce:EnterSceneCamera Director为空",
          ),
        e());
  }
  dxe() {
    this.qPe.ResetBindings(),
      (this.YPe = !1),
      this.exe?.IsBinding
        ? this.sxe
          ? 1 === this.WPe
            ? this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
                (this.exe.FadeOut = 0),
                  CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
                    this.exe,
                    this.B_e,
                    this.WPe,
                  );
              })
            : ((this.exe.FadeOut = 0 !== this.FPe ? this.FPe : this.HPe),
              CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
                this.exe,
                this.B_e,
                this.WPe,
              ))
          : 1 === this.WPe
            ? this.B_e()
            : CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
                this.exe,
                this.B_e,
                this.WPe,
              )
        : this.B_e();
  }
  lxe(e, t, i, s, h = () => {}, r = () => {}) {
    CameraController_1.CameraController.FightCamera.LogicComponent.CameraInputController.Lock(
      this,
    ),
      (this.rxe = !0),
      LevelLoadingController_1.LevelLoadingController.OpenLoading(
        9,
        3,
        () => {
          h && h(),
            t <= 0
              ? LevelLoadingController_1.LevelLoadingController.CloseLoading(
                  9,
                  () => {
                    r && r();
                  },
                  s ?? 0,
                )
              : TimerSystem_1.TimerSystem.Delay(
                  () => {
                    LevelLoadingController_1.LevelLoadingController.CloseLoading(
                      9,
                      () => {
                        r && r();
                      },
                      s ?? 0,
                    );
                  },
                  1e3 * t ?? 0,
                );
        },
        i ?? 0,
        0 === e
          ? IAction_1.EFadeInScreenShowType.Black
          : IAction_1.EFadeInScreenShowType.White,
      );
  }
  SetSequenceData(e) {
    e !== this.bPe && ((this.bPe = e), this.qPe.SetSequence(e));
  }
  Clear() {
    if (
      (EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.axe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.WorldDoneAndCloseLoading,
          this.axe,
        ),
      this.exe &&
        (this.exe.IsBinding &&
          (this.JPe ||
            ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi ||
            this.txe ||
            CameraController_1.CameraController.SceneCamera.DisplayComponent.SetUiActive(
              !0,
            ),
          CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
            this.exe,
          )),
        CameraController_1.CameraController.SceneCamera.DisplayComponent.RemoveBoundSceneCamera(
          this.exe,
        )),
      this.qPe?.IsValid())
    ) {
      const e = this.qPe;
      e.SequencePlayer?.Stop(),
        TimerSystem_1.TimerSystem.Next(() => {
          ActorSystem_1.ActorSystem.Put(e);
        }),
        (this.qPe = void 0);
    }
    this.rxe &&
      (CameraController_1.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(
        this,
      ),
      (this.rxe = !1));
  }
  PlayToMarkByCheckWay(e, t, i, s) {
    if (this.Cxe(e)) {
      if (((this.$Pe = e), t))
        switch (((this.jPe = t.TransitType), this.jPe)) {
          case 0:
            (this.VPe = t.Duration ?? 0),
              (this.NPe = t.Duration ?? 0),
              (this.OPe = 0),
              (this.KPe = t.IsValid ?? !1);
            break;
          case 1:
            (this.VPe = t.Duration ?? 0),
              (this.NPe = t.TransitFadeIn ?? 0),
              (this.OPe = t.TransitFadeOut ?? 0),
              (this.KPe = t.IsValid ?? !1),
              (this.ixe = t.Mask);
        }
      if (i)
        switch (((this.WPe = i.TransitType), this.WPe)) {
          case 0:
            (this.HPe = i.Duration ?? 0),
              (this.kPe = 0),
              (this.FPe = i.Duration ?? 0),
              (this.QPe = i.IsValid ?? !1);
            break;
          case 1:
            (this.HPe = i.Duration ?? 0),
              (this.kPe = i.TransitFadeIn ?? 0),
              (this.FPe = i.TransitFadeOut ?? 0),
              (this.QPe = i.IsValid ?? !1),
              (this.oxe = i.Mask);
        }
      (this.XPe = s), this.CheckLatestWay(), this.gxe();
    }
  }
  GetMarkValue(t) {
    var i = this.bPe.GetMovieScene();
    for (let e = 0; e < i.MarkedFrames.Num(); e++)
      if (i.MarkedFrames.Get(e).Label === t)
        return this.Sxe(i.MarkedFrames.Get(e).FrameNumber.Value);
  }
  CheckLatestWay() {
    var e, t, i, s;
    this.bPe.GetMovieScene()
      ? ((s = this.qPe.SequencePlayer),
        (e = this.GetMarkValue(this.$Pe)),
        (t = s.GetStartTime().Time.FrameNumber.Value),
        (i = s.GetEndTime().Time.FrameNumber.Value),
        (s = s.GetCurrentTime().Time.FrameNumber.Value),
        Math.abs(e - s) > Math.abs(i - t - Math.abs(e - s))
          ? (this.zPe = 1)
          : (this.zPe = 0))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Interaction", 46, "检查最短路径，但movieScene为空");
  }
  Sxe(e) {
    var t = this.bPe.GetMovieScene();
    return (e * t.DisplayRate.Numerator) / t.TickResolution.Numerator;
  }
  SetTimeDilation(e) {
    this.nxe !== e && ((this.nxe = e), this.yxe());
  }
  yxe() {
    var e = this.nxe;
    this.qPe.SequencePlayer.SetPlayRate(e);
  }
}
exports.default = SimpleLevelSequenceActor;
//# sourceMappingURL=SimpleLevelSequenceActor.js.map
