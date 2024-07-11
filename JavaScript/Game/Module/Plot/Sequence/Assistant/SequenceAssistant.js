"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SequenceAssistant = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelLoadingController_1 = require("../../../LevelLoading/LevelLoadingController"),
  LoginDefine_1 = require("../../../Login/Data/LoginDefine"),
  FlowController_1 = require("../../Flow/FlowController"),
  SequenceController_1 = require("../SequenceController"),
  SequenceDefine_1 = require("../SequenceDefine"),
  SeqBaseAssistant_1 = require("./SeqBaseAssistant"),
  MAX_FRAME = 99999999;
class SequenceAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments),
      (this.Cio = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.gio = void 0),
      (this.fio = !1),
      (this.pio = void 0),
      (this.vio = void 0),
      (this.bla = new Set());
  }
  Load(t) {
    StringUtils_1.StringUtils.IsEmpty(this.Model.Config?.Path)
      ? (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "剧情SequenceDA路径为空，检查配置",
        ),
        t(!1))
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 39, "[剧情加载等待] SequenceDA-开始"),
        (this.Cio = ResourceSystem_1.ResourceSystem.LoadAsync(
          this.Model.Config.Path,
          UE.BP_SequenceData_C,
          (e) => {
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 39, "[剧情加载等待] SequenceDA-结束"),
              (this.Cio = ResourceSystem_1.ResourceSystem.InvalidId),
              ObjectUtils_1.ObjectUtils.IsValid(e)
                ? ((this.Model.SequenceData = e),
                  (this.Cio = ResourceSystem_1.ResourceSystem.InvalidId),
                  t(!0))
                : t(!1);
          },
        )));
  }
  PreAllPlay() {
    void 0 === this.Model.EndLeastTime &&
      ((this.Model.EndLeastTime =
        ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.SequenceEndLeastTime),
      this.Model.EndLeastTime <
        TimerSystem_1.MIN_TIME * TimeUtil_1.TimeUtil.Millisecond) &&
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Plot",
          27,
          "配置的最后一句话淡出时间不能小于最小时间",
          ["CurTime", this.Model.EndLeastTime],
          ["MinTime", TimerSystem_1.MIN_TIME * TimeUtil_1.TimeUtil.Millisecond],
        ),
      (this.Model.EndLeastTime = SequenceDefine_1.DEFAULT_LAST_SUBTITLE_TIME)),
      this.Mio(),
      this.Model.UseRuntimeData
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "运行时获取FadeEnd数据"),
          this.Eio())
        : this.Sio(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "处理FadeEnd数据完成", [
          "FadeEnd",
          this.Model.IsFadeEnd,
        ]),
      this.Model.SequenceData.SaveFinalTransform
        ? (this.Model.UseRuntimeData
            ? (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Plot", 27, "运行时处理SequenceData最终位置"),
              this.yio())
            : this.Iio(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "处理SequenceData数据完成", [
              "FinalPosNum",
              this.Model.CurFinalPos.length,
            ]))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 39, "不使用最终位置");
  }
  PreEachPlay() {
    var e = this.Model.GetCurrentSequence();
    ObjectUtils_1.ObjectUtils.IsValid(e)
      ? ((this.fio = !0),
        this.Tio(),
        this.Lio(),
        this.Dio(),
        this.Model.UseRuntimeData
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 27, "运行时处理SequenceData帧信息"),
            this.Rio())
          : this.Uio(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "处理SequenceData数据完成",
            ["SubtitleStartNum", this.Model.CurSubtitleStartFrames.length],
            ["SubtitleEndNum", this.Model.CurSubtitleEndFrames.length],
            ["ShotStartNum", this.Model.CurShotStartFrames.length],
            ["ShotEndNum", this.Model.CurShotEndFrames.length],
          ))
      : ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "剧情Sequence失效",
          ["index", this.Model.SubSeqIndex],
        );
  }
  Play(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 27, "开始播放剧情Sequence：", [
        "Name",
        this.Model.CurLevelSeqActor.GetSequence().GetName(),
      ]),
      LevelLoadingController_1.LevelLoadingController.CloseLoading(
        0,
        void 0,
        0,
      ),
      (this.Model.NeedsQueueLatentAction = !0);
    const t = UE.NewArray(UE.BuiltinInt);
    this.Model.CurSubtitleStartFrames?.forEach((e) => {
      t.Add(e);
    }),
      this.Model.CurSubtitleEndFrames?.forEach((e) => {
        t.Add(e);
      }),
      this.Model.CurLevelSeqActor.SequencePlayer.SetKeyFrames(t),
      this.Model.TwiceAnimFlag
        ? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "Animation.ForbiddenEvaluateTwice 0",
          ),
          this.Model.CurLevelSeqActor.SequencePlayer.Play(),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "Animation.ForbiddenEvaluateTwice 1",
          ))
        : this.Model.CurLevelSeqActor.SequencePlayer.Play(),
      SequenceController_1.SequenceController.TriggerCutChange(),
      (this.Model.TalkNpcList = this.Model.CurLevelSeqActor?.GetBindingByTag(
        SequenceDefine_1.TALK_NPC_TAG,
        !0,
      )),
      (this.Model.NeedsQueueLatentAction = !1),
      this.Model.RunLatentActions(),
      (this.Model.IsPaused = !1),
      (this.vio = e),
      this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Add(e);
  }
  EachStop() {
    SequenceController_1.SequenceController.FlushDialogueState(),
      (this.fio = !1),
      this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Clear(),
      (this.vio = void 0),
      this.Model.CurLevelSeqActor.SequencePlayer.ClearKeyFrames(),
      this.Model.CurLevelSeqActor.ResetBindings(),
      ActorSystem_1.ActorSystem.Put(this.Model.CurLevelSeqActor),
      (this.Model.CurLevelSeqActor = void 0),
      (this.Model.TalkNpcList = void 0),
      this.Aio();
  }
  AllStop() {}
  End() {
    this.Cio !== ResourceSystem_1.ResourceSystem.InvalidId &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Cio),
      (this.Cio = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.fio &&
        (this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Clear(),
        this.Model.CurLevelSeqActor.SequencePlayer.GoToEndAndStop(0),
        this.Model.CurLevelSeqActor.ResetBindings(),
        ActorSystem_1.ActorSystem.Put(this.Model.CurLevelSeqActor),
        (this.Model.CurLevelSeqActor = void 0)),
      this.gio && this.gio.Remove(),
      (this.Model.RelativeTransform = void 0),
      (this.fio = !1),
      this.Aio(),
      this.bla.clear();
  }
  Tio() {
    var e = this.Model.GetCurrentSequence();
    switch (ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9)) {
      case LoginDefine_1.ELoginSex.Boy:
        UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
          e,
          SequenceDefine_1.MALE_TAG,
          !1,
        ),
          UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
            e,
            SequenceDefine_1.FEMALE_TAG,
            !0,
          );
        break;
      case LoginDefine_1.ELoginSex.Girl:
        UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
          e,
          SequenceDefine_1.FEMALE_TAG,
          !1,
        ),
          UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
            e,
            SequenceDefine_1.MALE_TAG,
            !0,
          );
        break;
      default:
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Plot", 27, "剧情Seq播放时无法获取性别"),
          UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
            e,
            SequenceDefine_1.FEMALE_TAG,
            !0,
          ),
          UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
            e,
            SequenceDefine_1.MALE_TAG,
            !0,
          );
    }
    UE.KuroSequenceRuntimeFunctionLibrary.ResetMovieSceneCompiledData(e);
    var t = e.MovieScene.MasterTracks,
      i = t?.Num() || 0;
    for (let e = 0; e < i; e++) {
      var s = t.Get(e);
      if (s instanceof UE.MovieSceneSubTrack) {
        var r = s.Sections,
          o = r?.Num() || 0;
        for (let e = 0; e < o; e++) {
          var a = r.Get(e);
          a instanceof UE.MovieSceneSubSection &&
            UE.KuroSequenceRuntimeFunctionLibrary.ResetMovieSceneCompiledData(
              a.SubSequence,
            );
        }
      }
    }
  }
  Lio() {
    var e = this.Model.GetCurrentSequence(),
      t = ActorSystem_1.ActorSystem.Spawn(
        UE.LevelSequenceActor.StaticClass(),
        new UE.Transform(),
        void 0,
      ),
      i = new UE.MovieSceneSequencePlaybackSettings(),
      i =
        ((i.PlayRate = this.Model.PlayRate),
        (t.PlaybackSettings = i),
        t.SetSequence(e),
        (this.Model.CurLevelSeqActor = t),
        this.Model.CurLevelSeqActor.SequencePlayer),
      e =
        ((this.Model.CurStartFrame = i.GetStartTime().Time.FrameNumber.Value),
        (this.Model.CurEndFrame = i.GetEndTime().Time.FrameNumber.Value),
        i.GetFrameRate());
    (this.Model.CurFrameRate = e.Numerator / e.Denominator),
      0 !== this.Model.CurStartFrame &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 18, "剧情Seq开始帧不规范，编号不是0");
  }
  Mio() {
    if (!this.Model.SequenceData.是否固定起始点) {
      let e = void 0;
      if (this.Model.SequenceData.IsTransformOverride)
        e = this.Model.SequenceData.OverrideTransform;
      else if (
        !StringUtils_1.StringUtils.IsEmpty(
          this.Model.SequenceData.绑定起始点标签,
        )
      )
        switch (this.Model.SequenceData.绑定起始点标签) {
          case "Player":
            e = Global_1.Global.BaseCharacter.GetTransform();
            break;
          case "SequenceCamera":
            e =
              CameraController_1.CameraController.SequenceCamera.GetComponent(
                9,
              ).CineCamera.GetTransform();
            break;
          default:
            for (var [t, i] of this.Model.BindingEntityMap)
              if (t.toString() === this.Model.SequenceData.绑定起始点标签) {
                e = i.Entity.GetComponent(1).ActorTransform;
                break;
              }
        }
      e
        ? (this.Model.RelativeTransform = Transform_1.Transform.Create(e))
        : ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "需要绑定起始点的Sequence读不到坐标",
            ["UseTransform", this.Model.SequenceData.IsTransformOverride],
            ["UseTag", this.Model.SequenceData.绑定起始点标签],
          );
    }
  }
  Dio() {
    var e;
    this.Model.RelativeTransform &&
      ((this.Model.CurLevelSeqActor.bOverrideInstanceData = !0),
      ((e = this.Model.CurLevelSeqActor.DefaultInstanceData).TransformOrigin =
        this.Model.RelativeTransform.ToUeTransform()),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Plot",
        27,
        "剧情Sequence起始点被改变",
        ["x", e.TransformOrigin.GetTranslation().X],
        ["y", e.TransformOrigin.GetTranslation().Y],
        ["z", e.TransformOrigin.GetTranslation().Z],
      );
  }
  Aio() {
    (this.Model.CurSubtitleStartFrames.length = 0),
      (this.Model.CurSubtitleEndFrames.length = 0),
      (this.Model.CurShotStartFrames.length = 0),
      (this.Model.CurShotEndFrames.length = 0),
      (this.Model.CurStartFrame = void 0),
      (this.Model.CurEndFrame = void 0);
  }
  Uio() {
    var e = this.Model.GetCurrentKeyFramesInfo(),
      t = e.SubtitleStartFrames,
      i = t.Num();
    for (let e = 0; e < i; e++)
      this.Model.CurSubtitleStartFrames.push(t.Get(e));
    var s = e.SubtitleEndFrames,
      r = s.Num();
    for (let e = 0; e < r; e++) this.Model.CurSubtitleEndFrames.push(s.Get(e));
    var o = e.ShotStartFrames,
      a = o.Num();
    for (let e = 0; e < a; e++) this.Model.CurShotStartFrames.push(o.Get(e));
    var h = e.ShotEndFrames,
      n = h.Num();
    for (let e = 0; e < n; e++) this.Model.CurShotEndFrames.push(h.Get(e));
  }
  Eio() {
    this.Model.IsFadeEnd.length = 0;
    var i = this.Model.SequenceData;
    for (let t = 0; t < i.剧情资源.Num(); t++) {
      var a = i.剧情资源.Get(t),
        h = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackEnd(a) - 1;
      let e = 0;
      e = this.GetFadeAmountAt(a, h);
      (a = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(
        a,
        UE.MovieSceneCinematicShotTrack.StaticClass(),
      )),
        (a = a && 0 < a.Num() ? a.Get(0) : void 0);
      if (ObjectUtils_1.ObjectUtils.IsValid(a)) {
        var n = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(a);
        if (0 < n.Num()) {
          let i = void 0,
            s = 0,
            r = 0,
            o = 0;
          for (let t = n.Num() - 1; 0 <= t; t--) {
            var l = n.Get(t);
            let e = UE.KuroSequenceRuntimeFunctionLibrary.GetEndFrame(l);
            (e = e > h ? h : e) > s &&
              ((i = l),
              (o = i.Parameters.StartFrameOffset.Value),
              (r = UE.KuroSequenceRuntimeFunctionLibrary.GetStartFrame(i)),
              (s = e));
          }
          var _,
            a = i?.GetSequence();
          ObjectUtils_1.ObjectUtils.IsValid(a) &&
            ((_ = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(a)),
            (_ = h - r + o + _),
            0 <= (a = this.GetFadeAmountAt(a, _))) &&
            (e = a);
        }
      }
      this.Model.IsFadeEnd.push(0.9 < e);
    }
  }
  GetFadeAmountAt(e, t) {
    var i = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(
      e,
      UE.MovieSceneFadeTrack.StaticClass(),
    );
    if (!i || i.Num() <= 0) return -1;
    var s = [];
    for (let e = 0; e < i.Num(); e++) {
      var r = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(i.Get(e));
      for (let e = 0; e < r.Num(); e++) s.push(r.Get(e));
    }
    if (0 === s.length) return -1;
    let o = 0;
    var a = new UE.FrameTime(new UE.FrameNumber(t), 0);
    for (const n of s) {
      var h = n;
      if (UE.KuroSequenceRuntimeFunctionLibrary.SectionContains(h, a)) {
        o =
          0 !== h.FloatCurve.Times.Num() || h.FloatCurve.bHasDefaultValue
            ? UE.KuroSequenceRuntimeFunctionLibrary.GetFadeAmountAt(h, a)
            : -1;
        break;
      }
    }
    return o;
  }
  Sio() {
    if (this.Model.SequenceData.GeneratedData)
      for (
        let e = 0;
        e < this.Model.SequenceData.GeneratedData.IsFadeEnd.Num();
        e++
      )
        this.Model.IsFadeEnd.push(
          this.Model.SequenceData.GeneratedData.IsFadeEnd.Get(e),
        );
    else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "使用了最终黑幕，却没有后处理");
  }
  Iio() {
    if (this.Model.SequenceData.GeneratedData) {
      var t = this.Model.SequenceData.GeneratedData.FinalPos,
        i = t.Num();
      for (let e = 0; e < i; e++) {
        var s = t.Get(e),
          r = Rotator_1.Rotator.Create(s.Rotator()),
          s = Vector_1.Vector.Create(s.GetLocation());
        (0 !== this.Model.GetType() && 2 !== this.Model.GetType()) ||
          (r.Yaw += 90),
          this.Model.AddFinalPos(
            Transform_1.Transform.Create(
              r.Quaternion(),
              s,
              Vector_1.Vector.OneVectorProxy,
            ),
          );
      }
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 39, "使用了最终位置，但是没有后处理位置。");
  }
  JumpToNextSubtitleOrChildSeq() {
    if (this.Model.IsPaused)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "JumpSequence Cache"),
        (this.Model.NeedJumpWhenResume = !0);
    else {
      const r = this.Model.CurLevelSeqActor.SequencePlayer,
        o = r.GetCurrentTime().Time.FrameNumber.Value;
      let e = MAX_FRAME;
      for (const a of this.Model.CurSubtitleStartFrames) {
        if (a === o) return;
        if (a > o) {
          e = a;
          break;
        }
      }
      let t = MAX_FRAME;
      for (const h of this.Model.CurShotStartFrames)
        if (h > o) {
          t = h;
          break;
        }
      let i = 0;
      var s = this.Model.GetType();
      0 === (i = 1 === s ? e : Math.min(e, t)) || i === MAX_FRAME
        ? ((i = this.Model.CurEndFrame),
          this.Model.WillFinish()
            ? (this.Model.CurEndFrame - o) / this.Model.CurFrameRate >
                this.Model.EndLeastTime &&
              (LevelLoadingController_1.LevelLoadingController.OpenLoading(
                0,
                3,
                void 0,
                this.Model.EndLeastTime,
              ),
              ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
              (this.gio = TimerSystem_1.TimerSystem.Delay(() => {
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    27,
                    "Sequence最后一句话淡出跳至结束",
                    ["curFrame", o],
                    ["targetFrame", i],
                  ),
                  (this.gio = void 0),
                  r.GoToEndAndStop(0);
              }, this.Model.EndLeastTime * TimeUtil_1.TimeUtil.InverseMillisecond)))
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Plot",
                  27,
                  "Sequence跳至结束",
                  ["curFrame", o],
                  ["targetFrame", i],
                ),
              r.OnStop.Clear(),
              r.GoToEndAndStop(0),
              this.vio &&
                (SequenceController_1.SequenceController.FlushDialogueState(),
                (this.Model.TwiceAnimFlag = !0),
                this.vio(),
                (this.Model.TwiceAnimFlag = !1))))
        : i > o &&
          i <= this.Model.CurEndFrame &&
          ((o < t && t < i) ||
            ((s = (0, puerts_1.$ref)(void 0)),
            UE.GameplayStatics.GetAllActorsOfClass(
              GlobalData_1.GlobalData.World,
              UE.BP_BaseRole_Seq_V2_C.StaticClass(),
              s,
            ),
            (this.pio = (0, puerts_1.$unref)(s)),
            (this.Model.BeginBlendFrame = 1),
            this.Pio(o, i),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 39, "BlendPose 开始")),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "SequenceAssistant:Sequence跳至下一句",
              ["curFrame", o],
              ["targetFrame", i],
            ),
          this.xio(i));
    }
  }
  xio(e, t = 0) {
    3 === this.Model.State &&
      ((e = new UE.FrameNumber(e)),
      (e = new UE.FrameTime(e, 0)),
      (e = new UE.MovieSceneSequencePlaybackParams(e, 0, "", 0, t)),
      this.Model.CurLevelSeqActor.SequencePlayer.SetPlaybackPositionWithNoEval(
        e,
      ));
  }
  Pio(e, t) {
    if (this.pio && 0 !== this.pio.Num()) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Plot",
          27,
          "SequenceAssistant:开始混合",
          ["curFrame", e],
          ["targetFrame", t],
        );
      for (let e = 0; e < this.pio.Num(); ++e) {
        var i = this.pio.Get(e);
        i.BeginSwitchPose(i, i, 0.5, !1);
      }
    }
  }
  EndSwitchPose() {
    if (this.pio && 0 !== this.pio.Num()) {
      var e =
        this.Model.CurLevelSeqActor.SequencePlayer.GetCurrentTime()?.Time
          .FrameNumber.Value;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "SequenceAssistant:结束混合", [
          "curFrame",
          e,
        ]);
      for (let e = 0; e < this.pio.Num(); ++e) {
        var t = this.pio.Get(e);
        t?.EndSwitchPose(t, !1);
      }
    }
  }
  PauseSequence(e) {
    3 !== this.Model.State
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "剧情Sequence未开始播放")
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "Sequence Pause", ["reason", e]),
        this.Model.CurLevelSeqActor.SequencePlayer.IsPlaying() &&
          this.Model.CurLevelSeqActor.SequencePlayer.PauseOnNextFrame(),
        (this.Model.IsPaused = !0),
        e && this.bla.add(e));
  }
  ResumeSequence(e) {
    3 !== this.Model.State
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "剧情Sequence未开始播放")
      : (e && this.bla.delete(e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "Sequence Resume",
            ["reasonSet", this.bla],
            ["NeedJump", this.Model.NeedJumpWhenResume],
          ),
        0 < this.bla.size ||
          (this.Model.CurLevelSeqActor.SequencePlayer.IsPaused() &&
            this.Model.CurLevelSeqActor.SequencePlayer.Play(),
          (this.Model.IsPaused = !1),
          this.Model.NeedJumpWhenResume &&
            this.JumpToNextSubtitleOrChildSeq()));
  }
  Rio() {
    var e = this.Model.SequenceData.剧情资源.Get(this.Model.SubSeqIndex),
      t = e.MovieScene.MasterTracks,
      i = t?.Num() || 0,
      s = e.MovieScene.TickResolution,
      r = e.MovieScene.DisplayRate,
      o = (r.Denominator * s.Numerator) / (r.Numerator * s.Denominator);
    for (let e = 0; e < i; e++) {
      var a = t.Get(e);
      if (!a.bIsEvalDisabled)
        if (a instanceof UE.MovieSceneDialogueTrack) {
          var h = a.Sections,
            n = h?.Num() || 0;
          for (let e = 0; e < n; e++) {
            var l = h.Get(e);
            l instanceof UE.MovieSceneDialogueSection &&
              (this.Model.CurSubtitleStartFrames.push(
                l.GetStartFrame().Value.Value / o,
              ),
              this.Model.CurSubtitleEndFrames.push(
                l.GetEndFrame().Value.Value / o,
              ));
          }
        } else if (a instanceof UE.MovieSceneDialogueStateTrack) {
          if (!a.bIsEvalDisabled) {
            var _ = a.Sections,
              u = _?.Num() || 0;
            for (let e = 0; e < u; e++) {
              var c = _.Get(e);
              c instanceof UE.MovieSceneDialogueStateSection &&
                0 === c.SectionData.State &&
                (this.Model.CurSubtitleStartFrames.push(
                  c.GetStartFrame().Value.Value / o,
                ),
                this.Model.CurSubtitleEndFrames.push(
                  c.GetEndFrame().Value.Value / o,
                ));
            }
          }
        } else if (a instanceof UE.MovieSceneSubTrack) {
          var f = a.Sections,
            v = f?.Num() || 0;
          for (let e = 0; e < v; e++) {
            var S = f.Get(e);
            S instanceof UE.MovieSceneSubSection &&
              (this.Model.CurShotStartFrames.push(
                S.GetStartFrame().Value.Value / o,
              ),
              this.Model.CurShotEndFrames.push(
                S.GetEndFrame().Value.Value / o,
              ));
          }
        }
    }
    1 === this.Model.GetType() &&
      ((this.Model.CurShotStartFrames.length = 0),
      (this.Model.CurShotEndFrames.length = 0),
      (r = this.wio(e)),
      this.Model.CurShotStartFrames.push(0),
      r?.forEach((e) => {
        this.Model.CurShotStartFrames.push(e);
      }),
      this.Model.CurShotStartFrames.pop(),
      r?.forEach((e) => {
        this.Model.CurShotEndFrames.push(e);
      })),
      this.Model.CurSubtitleStartFrames.sort((e, t) => e - t),
      this.Model.CurSubtitleEndFrames.sort((e, t) => e - t),
      this.Model.CurShotStartFrames.sort((e, t) => e - t),
      this.Model.CurShotEndFrames.sort((e, t) => e - t);
  }
  wio(e) {
    var i = new Array();
    if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
      let t = void 0;
      const f = UE.KuroSequenceRuntimeFunctionLibrary.GetMasterTracks(e);
      for (let e = 0; e < f.Num(); e++) {
        var s = f.Get(e);
        if (s instanceof UE.MovieSceneSubTrack) {
          t = s;
          break;
        }
      }
      if (t) {
        const v = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(t);
        for (let e = 0; e < v.Num(); e++) {
          var r = v.Get(e),
            o = r.GetSequence(),
            a = r.GetStartFrame().Value.Value,
            h = r.GetEndFrame().Value.Value,
            n = r.Parameters.StartFrameOffset.Value,
            l = UE.KuroSequenceRuntimeFunctionLibrary.GetSpawnables(o);
          for (let e = 0; e < l.Num(); e++) {
            var _ = l.Get(e);
            if (
              UE.KuroSequenceRuntimeFunctionLibrary.GetObjectTemplate(
                _,
              ).GetClass() === UE.CineCameraActor.StaticClass()
            ) {
              const f = UE.KuroSequenceRuntimeFunctionLibrary.GetTracks(_);
              for (let e = 0; e < f.Num(); e++) {
                var u = f.Get(e);
                if (
                  u.GetClass() === UE.MovieScene3DTransformTrack.StaticClass()
                ) {
                  const v =
                    UE.KuroSequenceRuntimeFunctionLibrary.GetSections(u);
                  for (let e = 0; e < v.Num(); e++) {
                    var c =
                      v.Get(e).GetEndFrame().Value.Value -
                      n +
                      a -
                      UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(o);
                    a < c && c <= h ? i.push(c) : h < c && i.push(h);
                  }
                  break;
                }
              }
              break;
            }
          }
        }
        return i.sort((e, t) => e - t), i;
      }
    }
  }
  yio() {
    var t = this.Model.SequenceData;
    for (let e = 0; e < t.剧情资源.Num(); e++) {
      var i,
        s = t.剧情资源.Get(e),
        r = this.Bio(s);
      r
        ? ((i = Rotator_1.Rotator.Create(r.Rotator())),
          (r = Vector_1.Vector.Create(r.GetLocation())),
          (0 !== t.类型 && 2 !== t.类型) || (i.Yaw += 90),
          r.IsNearlyZero() &&
            FlowController_1.FlowController.LogError(
              "Seq最终位置提取到0点坐标",
              ["name", s.GetName()],
            ),
          this.Model.AddFinalPos(
            Transform_1.Transform.Create(
              i.Quaternion(),
              r,
              Vector_1.Vector.OneVectorProxy,
            ),
          ))
        : this.Model.CurFinalPos.push(void 0);
    }
  }
  Bio(e) {
    let t = this.Model.SequenceData.GeneratedData?.BlendOutTag;
    if (
      (FNameUtil_1.FNameUtil.IsNothing(t) && (t = SequenceDefine_1.HERO_TAG),
      !e.FindBindingByTag(t).Guid.IsValid())
    ) {
      var i = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackEnd(e) - 1,
        s = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(
          e,
          UE.MovieSceneCinematicShotTrack.StaticClass(),
        ),
        s = 0 < s.Num() ? s?.Get(0) : void 0;
      if (!ObjectUtils_1.ObjectUtils.IsValid(s)) return;
      var r = new UE.FrameTime(new UE.FrameNumber(i), 0),
        i = s,
        o = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(i);
      for (let e = o.Num() - 1; 0 <= e; e--) {
        var a = o.Get(e);
        if (UE.KuroSequenceRuntimeFunctionLibrary.SectionContains(a, r)) {
          if (a.GetSequence()?.FindBindingByTag(t)?.Guid.IsValid()) break;
          return;
        }
      }
    }
    (s = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackEnd(e) - 1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Editor", 39, "外层最后一帧：", ["Frame", s]),
      (i = (0, puerts_1.$ref)(void 0));
    return (
      UE.KuroSequenceRuntimeFunctionLibrary.GetFrameTransformByTag(e, t, s, i),
      (0, puerts_1.$unref)(i)
    );
  }
}
exports.SequenceAssistant = SequenceAssistant;
//# sourceMappingURL=SequenceAssistant.js.map
