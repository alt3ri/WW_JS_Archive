"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
  UiManager_1 = require("../../Ui/UiManager"),
  CAMERA_TAG = new UE.FName("SequenceCamera");
class SimpleLevelSequenceActor {
  constructor(t) {
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
      (this.mv1 = !1),
      (this.fv1 = -1),
      (this.gv1 = 1),
      (this.Cv1 = void 0),
      (this.pv1 = 0),
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
      (this.vv1 = () => {
        ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.GetComponent(
          10,
        )?.GetIsInCinematic()
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("UiCore", 45, "DoPlayToMark在Cinematic因此跳过"),
            (this.XPe = !0),
            this.PlayLevelSequence())
          : this.sxe
            ? this.PlayLevelSequence()
            : this.XPe || !this.hxe
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "UiCore",
                    45,
                    "DoPlayToMark为JumpToEnd或者没有camera轨道",
                    [
                      "CameraMode",
                      ModelManager_1.ModelManager.CameraModel?.CameraMode,
                    ],
                  ),
                this.PlayLevelSequence())
              : (this.YPe
                  ? Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("UiCore", 45, "DoPlayToMark非首次绑定", [
                      "CameraMode",
                      ModelManager_1.ModelManager.CameraModel?.CameraMode,
                    ])
                  : Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("UiCore", 45, "DoPlayToMark首次绑定", [
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
                        this.PlayLevelSequence();
                      },
                    )
                  : this._xe(() => {
                      this.PlayLevelSequence();
                    }));
      }),
      (this.B_e = () => {
        (this.exe = void 0),
          ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(
            this,
          ),
          (this.rxe = !1),
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
            8,
          ),
          this.JPe ||
            ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi ||
            ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.SetUiActive(
              !0,
            );
      }),
      (this.bPe = t).HasBindingTag(CAMERA_TAG, !0) && (this.hxe = !0),
      this.mxe();
  }
  UpdateSettings(t) {
    this.JPe = t ?? !1;
  }
  ForceSwitchSceneCamera(t) {
    return this.qPe?.IsValid()
      ? this.hxe
        ? ((this.sxe = !0),
          t
            ? ((this.txe = !0),
              this._xe(() => {
                UiManager_1.UiManager.OpenView(
                  "TimeTrackControlView",
                  void 0,
                  (t) => {
                    t
                      ? ControllerHolder_1.ControllerHolder.CameraController.Model.IsToSceneCameraMode() ||
                        (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "SceneGameplay",
                            45,
                            "时间控制装置启动请求:失败，IsToSceneCameraMode",
                          ),
                        TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
                        ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose(),
                        UiManager_1.UiManager.GetViewByName(
                          "TimeTrackControlView",
                        )?.CloseMe(),
                        ControllerHolder_1.ControllerHolder.TimeTrackController.FinishCallback(
                          !1,
                        ))
                      : (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "SceneGameplay",
                            45,
                            "时间控制装置启动请求:失败，OpenView(EUiViewName.TimeTrackControlView",
                          ),
                        TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
                        ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose(),
                        ControllerHolder_1.ControllerHolder.TimeTrackController.FinishCallback(
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
              45,
              "时间控制装置启动请求:失败，!this.HasCameraTrack",
            ),
          !1)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneGameplay",
            45,
            "时间控制装置启动请求:失败，!this.Director?.IsValid()",
          ),
        !1);
  }
  PlayToMarkOld(t, i, e, s) {
    this.Cxe(t) &&
      ((this.$Pe = t),
      (this.NPe = i),
      (this.FPe = e),
      (this.XPe = s),
      (this.zPe = 0),
      this.gxe());
  }
  PlayToMark(t, i, e, s, h) {
    if (this.Cxe(t)) {
      if (((this.$Pe = t), i))
        switch (((this.jPe = i.TransitType), this.jPe)) {
          case 0:
            (this.VPe = i.Duration ?? 0),
              (this.NPe = i.Duration ?? 0),
              (this.OPe = 0),
              (this.KPe = i.IsValid ?? !1);
            break;
          case 1:
            (this.VPe = i.Duration ?? 0),
              (this.NPe = i.TransitFadeIn ?? 0),
              (this.OPe = i.TransitFadeOut ?? 0),
              (this.KPe = i.IsValid ?? !1),
              (this.ixe = i.Mask);
        }
      if (e)
        switch (((this.WPe = e.TransitType), this.WPe)) {
          case 0:
            (this.HPe = e.Duration ?? 0),
              (this.kPe = 0),
              (this.FPe = e.Duration ?? 0),
              (this.QPe = e.IsValid ?? !1);
            break;
          case 1:
            (this.HPe = e.Duration ?? 0),
              (this.kPe = e.TransitFadeIn ?? 0),
              (this.FPe = e.TransitFadeOut ?? 0),
              (this.QPe = e.IsValid ?? !1),
              (this.oxe = e.Mask);
        }
      (this.XPe = h), (this.Cv1 = s), (this.zPe = 0), this.gxe();
    }
  }
  PlayLoop(t, i, e, s, h) {
    if (((this.$Pe = ""), e))
      switch (((this.jPe = e.TransitType), this.jPe)) {
        case 0:
          (this.VPe = e.Duration ?? 0),
            (this.NPe = e.Duration ?? 0),
            (this.OPe = 0),
            (this.KPe = e.IsValid ?? !1);
          break;
        case 1:
          (this.VPe = e.Duration ?? 0),
            (this.NPe = e.TransitFadeIn ?? 0),
            (this.OPe = e.TransitFadeOut ?? 0),
            (this.KPe = e.IsValid ?? !1),
            (this.ixe = e.Mask);
      }
    if (s)
      switch (((this.WPe = s.TransitType), this.WPe)) {
        case 0:
          (this.HPe = s.Duration ?? 0),
            (this.kPe = 0),
            (this.FPe = s.Duration ?? 0),
            (this.QPe = s.IsValid ?? !1);
          break;
        case 1:
          (this.HPe = s.Duration ?? 0),
            (this.kPe = s.TransitFadeIn ?? 0),
            (this.FPe = s.TransitFadeOut ?? 0),
            (this.QPe = s.IsValid ?? !1),
            (this.oxe = s.Mask);
      }
    (this.Cv1 = h), (this.mv1 = t), (this.fv1 = i), (this.zPe = 2), this.gxe();
  }
  gxe() {
    ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed
      ? this.vv1()
      : EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.WorldDoneAndCloseLoading,
          this.vv1,
        );
  }
  PlayLevelSequence() {
    switch (this.zPe) {
      case 0:
      case 1:
        this.yv1(this.$Pe, this.XPe);
        break;
      case 2:
        this.Sv1(this.mv1, this.fv1);
    }
  }
  yv1(t, i) {
    if (this.qPe?.IsValid()) {
      this.qPe.bOverrideInstanceData = !0;
      var e = this.qPe.SequencePlayer;
      if (e?.IsValid()) {
        if (
          (this.pv1 &&
            (UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(
              this.qPe,
              this.pv1,
            ),
            (this.pv1 = 0)),
          i)
        )
          e.Play(),
            e.SetPlaybackPosition(
              new UE.MovieSceneSequencePlaybackParams(
                new UE.FrameTime(),
                0,
                t,
                2,
                1,
              ),
            ),
            (this.gv1 = this.Cv1?.PlayRateAbs ?? 1),
            this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.gv1),
            e.Pause();
        else
          switch (this.zPe) {
            case 0:
              e.PlayTo(
                new UE.MovieSceneSequencePlaybackParams(
                  new UE.FrameTime(),
                  0,
                  t,
                  2,
                  0,
                ),
              ),
                (this.gv1 = this.Cv1?.PlayRateAbs ?? 1),
                this.Cv1?.EaseDuration
                  ? (this.pv1 =
                      UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(
                        this.qPe,
                        this.nxe * this.gv1,
                        this.Cv1.EaseType,
                        this.Cv1.EaseDuration,
                        this.Cv1.EaseExponent,
                      ))
                  : this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.gv1);
              break;
            case 1:
              e.PlayTo_Circle(
                new UE.MovieSceneSequencePlaybackParams(
                  new UE.FrameTime(),
                  0,
                  t,
                  2,
                  0,
                ),
                !0,
              ),
                (this.gv1 = this.Cv1?.PlayRateAbs ?? 1),
                this.Cv1?.EaseDuration
                  ? (this.pv1 =
                      UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(
                        this.qPe,
                        this.nxe * this.gv1,
                        this.Cv1.EaseType,
                        this.Cv1.EaseDuration,
                        this.Cv1.EaseExponent,
                      ))
                  : this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.gv1);
          }
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Interaction",
            33,
            "LevelSequence播放至对应mark",
            ["levelSequence", this.bPe.GetName()],
            ["mark", t],
          );
      }
    }
  }
  Sv1(t, i) {
    var e;
    this.qPe?.IsValid() &&
      ((this.qPe.bOverrideInstanceData = !0),
      (e = this.qPe.SequencePlayer)?.IsValid()) &&
      (this.pv1 &&
        (UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(
          this.qPe,
          this.pv1,
        ),
        (this.pv1 = 0)),
      2 === this.zPe &&
        (t ? e.PlayReverseLooping(i) : e.PlayLooping(i),
        (this.gv1 = this.Cv1?.PlayRateAbs ?? 1),
        this.Cv1?.EaseDuration
          ? (this.pv1 = UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(
              this.qPe,
              this.nxe * this.gv1,
              this.Cv1.EaseType,
              this.Cv1.EaseDuration,
              this.Cv1.EaseExponent,
            ))
          : this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.gv1)),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Interaction",
        39,
        "LevelSequence循环播放",
        ["levelSequence", this.bPe.GetName()],
        ["bReverse", t],
        ["numLoops", i],
      );
  }
  mxe() {
    var t = new UE.MovieSceneSequencePlaybackSettings(),
      t =
        ((t.bDisableMovementInput = !1),
        (t.bDisableLookAtInput = !1),
        (this.qPe = ActorSystem_1.ActorSystem.Get(
          UE.LevelSequenceActor.StaticClass(),
          new UE.TransformDouble(),
          void 0,
          !1,
        )),
        (this.qPe.PlaybackSettings = t),
        this.qPe.SetSequence(this.bPe),
        this.qPe.SequencePlayer);
    t?.IsValid()
      ? (t.OnPause.Add(this.pxe.bind(this)),
        t.OnStop.Add(this.vxe.bind(this)),
        t.OnFinished.Add(this.Mxe.bind(this)))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Level", 45, "SimpleLevelSequenceActor 没找到Player");
  }
  vxe() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Level", 33, "SimpleLevelSequenceActor OnSequenceStop", [
        "levelSequence",
        this.bPe.GetName(),
      ]);
  }
  pxe() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Level", 33, "SimpleLevelSequenceActor OnSequencePause", [
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
                ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
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
        33,
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
                ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
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
  Cxe(i) {
    var e = this.bPe.GetMovieScene();
    let s = !1;
    if (e)
      for (let t = 0; t < e.MarkedFrames.Num(); t++)
        if (e.MarkedFrames.Get(t).Label === i) {
          s = !0;
          break;
        }
    return (
      !!s ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Interaction",
          33,
          "mark配置不合法",
          ["levelSequence", this.bPe.GetName()],
          ["mark", i],
        ),
      !1)
    );
  }
  _xe(t = () => {}) {
    var i;
    this.qPe?.IsValid()
      ? ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Camera",
              45,
              "SimpleLevelSeqeunce:演出中触发了场景镜头切换 请检查配置",
            ),
          t())
        : ((i = this.qPe.SequencePlayer.IsPlaying()),
          this.JPe ||
            ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi ||
            i ||
            ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.SetUiActive(
              !1,
            ),
          this.exe?.IsBinding ||
            ((this.exe =
              ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.GetUnBoundSceneCamera(
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
              ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnterSceneSubCamera(
                this.exe,
              ),
              t())
            : this.sxe
              ? 1 === this.jPe
                ? this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
                    ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(
                      3,
                      0,
                      0,
                      0,
                      () => {
                        ControllerHolder_1.ControllerHolder.CameraController.Model.IsToSceneCameraMode()
                          ? t()
                          : (TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
                            ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose());
                      },
                      !0,
                    );
                  })
                : ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(
                    3,
                    this.NPe ?? 1,
                    0,
                    0,
                    () => {
                      ControllerHolder_1.ControllerHolder.CameraController.Model.IsToSceneCameraMode()
                        ? t()
                        : (TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
                          ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose());
                    },
                    !0,
                  )
              : (ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(
                  3,
                  1 === this.jPe ? 0 : (this.NPe ?? 1),
                  0,
                  0,
                ),
                t(),
                (this.YPe = !0),
                (this.exe.IsBinding = !0)))
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCore",
            45,
            "SimpleLevelSeqeunce:EnterSceneCamera Director为空",
          ),
        t());
  }
  dxe() {
    this.qPe.ResetBindings(),
      (this.YPe = !1),
      this.exe?.IsBinding
        ? this.sxe
          ? 1 === this.WPe
            ? this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
                (this.exe.FadeOut = 0),
                  ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
                    this.exe,
                    this.B_e,
                    this.WPe,
                  );
              })
            : ((this.exe.FadeOut = 0 !== this.FPe ? this.FPe : this.HPe),
              ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
                this.exe,
                this.B_e,
                this.WPe,
              ))
          : 1 === this.WPe
            ? this.B_e()
            : ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
                this.exe,
                this.B_e,
                this.WPe,
              )
        : this.B_e();
  }
  lxe(t, i, e, s, h = () => {}, r = () => {}) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Lock(
      this,
    ),
      (this.rxe = !0),
      ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
        8,
        3,
        () => {
          h && h(),
            i <= 0
              ? (r && r(),
                ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
                  8,
                  void 0,
                  s ?? 0,
                ))
              : TimerSystem_1.TimerSystem.Delay(
                  () => {
                    r && r(),
                      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
                        8,
                        void 0,
                        s ?? 0,
                      );
                  },
                  1e3 * (i ?? 0),
                );
        },
        e ?? 0,
        0 === t
          ? IAction_1.EFadeInScreenShowType.Black
          : IAction_1.EFadeInScreenShowType.White,
      );
  }
  SetSequenceData(t) {
    t !== this.bPe && ((this.bPe = t), this.qPe.SetSequence(t));
  }
  Clear() {
    if (
      (EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.vv1,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.WorldDoneAndCloseLoading,
          this.vv1,
        ),
      this.exe &&
        (this.exe.IsBinding &&
          (this.JPe ||
            ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi ||
            this.txe ||
            ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.SetUiActive(
              !0,
            ),
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
            this.exe,
          )),
        ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.RemoveBoundSceneCamera(
          this.exe,
        )),
      this.pv1 &&
        (UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(
          this.qPe,
          this.pv1,
        ),
        (this.pv1 = 0)),
      this.qPe?.IsValid())
    ) {
      const t = this.qPe;
      t.SequencePlayer?.Stop(),
        TimerSystem_1.TimerSystem.Next(() => {
          ActorSystem_1.ActorSystem.Put("SimpleLevelSequenceActor.Clear", t);
        }),
        (this.qPe = void 0);
    }
    this.rxe &&
      (ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(
        this,
      ),
      (this.rxe = !1));
  }
  PlayToMarkByCheckWay(t, i, e, s, h) {
    if (this.Cxe(t)) {
      if (((this.$Pe = t), i))
        switch (((this.jPe = i.TransitType), this.jPe)) {
          case 0:
            (this.VPe = i.Duration ?? 0),
              (this.NPe = i.Duration ?? 0),
              (this.OPe = 0),
              (this.KPe = i.IsValid ?? !1);
            break;
          case 1:
            (this.VPe = i.Duration ?? 0),
              (this.NPe = i.TransitFadeIn ?? 0),
              (this.OPe = i.TransitFadeOut ?? 0),
              (this.KPe = i.IsValid ?? !1),
              (this.ixe = i.Mask);
        }
      if (e)
        switch (((this.WPe = e.TransitType), this.WPe)) {
          case 0:
            (this.HPe = e.Duration ?? 0),
              (this.kPe = 0),
              (this.FPe = e.Duration ?? 0),
              (this.QPe = e.IsValid ?? !1);
            break;
          case 1:
            (this.HPe = e.Duration ?? 0),
              (this.kPe = e.TransitFadeIn ?? 0),
              (this.FPe = e.TransitFadeOut ?? 0),
              (this.QPe = e.IsValid ?? !1),
              (this.oxe = e.Mask);
        }
      (this.XPe = h), (this.Cv1 = s), this.CheckLatestWay(), this.gxe();
    }
  }
  GetMarkValue(i) {
    var e = this.bPe.GetMovieScene();
    for (let t = 0; t < e.MarkedFrames.Num(); t++)
      if (e.MarkedFrames.Get(t).Label === i)
        return this.Sxe(e.MarkedFrames.Get(t).FrameNumber.Value);
  }
  CheckLatestWay() {
    var t, i, e, s;
    this.bPe.GetMovieScene()
      ? ((s = this.qPe.SequencePlayer),
        (t = this.GetMarkValue(this.$Pe)),
        (i = s.GetStartTime().Time.FrameNumber.Value),
        (e = s.GetEndTime().Time.FrameNumber.Value),
        (s = s.GetCurrentTime().Time.FrameNumber.Value),
        Math.abs(t - s) > Math.abs(e - i - Math.abs(t - s))
          ? (this.zPe = 1)
          : (this.zPe = 0))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Interaction", 45, "检查最短路径，但movieScene为空");
  }
  Sxe(t) {
    var i = this.bPe.GetMovieScene();
    return (t * i.DisplayRate.Numerator) / i.TickResolution.Numerator;
  }
  SetTimeDilation(t) {
    this.nxe !== t && ((this.nxe = t), this.yxe());
  }
  yxe() {
    this.pv1 &&
      (UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(
        this.qPe,
        this.pv1,
      ),
      (this.pv1 = 0)),
      this.qPe.SequencePlayer.SetPlayRate(this.nxe * this.gv1);
  }
  GetCurrentFrame() {
    return this.qPe
      ? this.qPe.SequencePlayer.GetCurrentTime().Time.FrameNumber.Value
      : 0;
  }
}
exports.default = SimpleLevelSequenceActor;
//# sourceMappingURL=SimpleLevelSequenceActor.js.map
