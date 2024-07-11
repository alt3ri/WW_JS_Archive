"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixSceneManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherResourceLib_1 = require("../../Util/LauncherResourceLib"),
  BLACK_SEQUENCE = "/Game/Aki/HotPatch/Sequence/XuanJue1_Black.XuanJue1_Black",
  HOTPATCH_START_SEQUENCE =
    "/Game/Aki/HotPatch/Sequence/XuanJue1_Sky.XuanJue1_Sky",
  HOTPATCH_BGM = "/Game/Aki/WwiseAudio/Events/play_login_bgm.play_login_bgm",
  SEQUNCE_CAMERA_NAME = new UE.FName("SequenceCamera");
class HotFixSceneManager {
  constructor() {
    (this.PSr = void 0), (this.yEr = void 0);
  }
  SetupScene(e) {
    this.PSr = e;
    var a = UE.KismetMathLibrary.Now(),
      a = UE.KismetMathLibrary.GetHour(a);
    UE.KuroRenderingRuntimeBPPluginBPLibrary.SetGlobalGITime(this.PSr, a),
      HotFixSceneManager.SpawnCamera(e),
      HotFixSceneManager.SetViewTarget(e),
      this.IEr();
  }
  Destroy() {
    this.DWt();
  }
  static SpawnCamera(e) {
    e = UE.KuroRenderingRuntimeBPPluginBPLibrary.SpawnActorFromClass(
      e,
      UE.CineCameraActor.StaticClass(),
      new UE.Transform(),
    );
    (e.CameraComponent.bConstrainAspectRatio = !1),
      e.GetCineCameraComponent().SetFilmbackPresetByName("16:9 DSLR"),
      (this.Hh = e);
  }
  static SetViewTarget(e) {
    e = UE.GameplayStatics.GetPlayerController(e, 0);
    e
      ? e.SetViewTargetWithBlend(HotFixSceneManager.Hh)
      : LauncherLog_1.LauncherLog.Error("PlayerController为空");
  }
  PlayBlackSeq(e) {
    var a,
      t = LauncherResourceLib_1.LauncherResourceLib.Load(
        BLACK_SEQUENCE,
        UE.LevelSequence,
        100,
      );
    t?.IsValid()
      ? ((a = (0, puerts_1.$ref)(void 0)),
        UE.LevelSequencePlayer.CreateLevelSequencePlayer(
          this.PSr,
          t,
          new UE.MovieSceneSequencePlaybackSettings(),
          a,
        ),
        (t = (0, puerts_1.$unref)(a)),
        e && t.SequencePlayer.OnFinished.Add(e),
        t.SequencePlayer.Play(),
        LauncherLog_1.LauncherLog.Info("热更场景开幕黑屏Sequence播放"))
      : (LauncherLog_1.LauncherLog.Error("热更场景开幕黑屏Sequence加载失败", [
          "path",
          BLACK_SEQUENCE,
        ]),
        e?.());
  }
  PlayStartLaunchSeq() {
    var e,
      a = LauncherResourceLib_1.LauncherResourceLib.Load(
        HOTPATCH_START_SEQUENCE,
        UE.LevelSequence,
        100,
      );
    a?.IsValid()
      ? ((e = (0, puerts_1.$ref)(void 0)),
        UE.LevelSequencePlayer.CreateLevelSequencePlayer(
          this.PSr,
          a,
          new UE.MovieSceneSequencePlaybackSettings(),
          e,
        ),
        (this.yEr = (0, puerts_1.$unref)(e)),
        this.yEr.ResetBindings(),
        this.yEr.AddBindingByTag(SEQUNCE_CAMERA_NAME, HotFixSceneManager.Hh),
        this.yEr.SequencePlayer.PlayLooping(),
        LauncherLog_1.LauncherLog.Info("热更场景循环Sequence播放"))
      : LauncherLog_1.LauncherLog.Error("热更场景循环Sequence加载失败", [
          "path",
          HOTPATCH_START_SEQUENCE,
        ]);
  }
  DWt() {
    LauncherLog_1.LauncherLog.Info("热更场景结束");
  }
  static StopHotPatchBgm() {
    HotFixSceneManager.Yje &&
      (UE.AkGameplayStatics.ExecuteActionOnEvent(
        HotFixSceneManager.Yje,
        0,
        void 0,
      ),
      (HotFixSceneManager.Yje = void 0)),
      HotFixSceneManager.TEr && (HotFixSceneManager.TEr = void 0),
      LauncherLog_1.LauncherLog.Info("背景音乐销毁", ["path", HOTPATCH_BGM]);
  }
  IEr() {
    LauncherResourceLib_1.LauncherResourceLib.LoadAsync(
      HOTPATCH_BGM,
      UE.AkAudioEvent,
      (e) => {
        (HotFixSceneManager.Yje = e)?.IsValid()
          ? ((HotFixSceneManager.TEr = UE.AkGameplayStatics.PostEvent(
              e,
              void 0,
              0,
              void 0,
            )),
            LauncherLog_1.LauncherLog.Info("播放背景音乐", [
              "path",
              HOTPATCH_BGM,
            ]))
          : LauncherLog_1.LauncherLog.Error("背景音乐加载有问题", [
              "path",
              HOTPATCH_BGM,
            ]);
      },
    );
  }
}
((exports.HotFixSceneManager = HotFixSceneManager).TEr = void 0),
  (HotFixSceneManager.Yje = void 0);
//# sourceMappingURL=HotFixSceneManager.js.map
