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
  SequenceController_1 = require("../SequenceController"),
  SequenceDefine_1 = require("../SequenceDefine"),
  SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class SequenceAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments),
      (this.vto = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.Mto = void 0),
      (this.Sto = !1),
      (this.Eto = void 0),
      (this.yto = void 0);
  }
  Load(t) {
    StringUtils_1.StringUtils.IsEmpty(this.Model.Config?.Path)
      ? (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "剧情SequenceDA路径为空，检查配置",
        ),
        t(!1))
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 39, "[剧情加载等待] SequenceDA-开始"),
        (this.vto = ResourceSystem_1.ResourceSystem.LoadAsync(
          this.Model.Config.Path,
          UE.BP_SequenceData_C,
          (e) => {
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 39, "[剧情加载等待] SequenceDA-结束"),
              (this.vto = ResourceSystem_1.ResourceSystem.InvalidId),
              ObjectUtils_1.ObjectUtils.IsValid(e)
                ? ((this.Model.SequenceData = e),
                  (this.vto = ResourceSystem_1.ResourceSystem.InvalidId),
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
      this.Ito(),
      this.Model.UseRuntimeData
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "运行时获取FadeEnd数据"),
          this.Tto())
        : this.Lto(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "处理FadeEnd数据完成", [
          "FadeEnd",
          this.Model.IsFadeEnd,
        ]),
      this.Model.SequenceData.SaveFinalTransform
        ? (this.Model.UseRuntimeData
            ? (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Plot", 27, "运行时处理SequenceData最终位置"),
              this.Dto())
            : this.Rto(),
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
      ? ((this.Sto = !0),
        this.Uto(),
        this.Ato(),
        this.Pto(),
        this.Model.UseRuntimeData
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 27, "运行时处理SequenceData帧信息"),
            this.xto())
          : this.wto(),
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
      (this.yto = e),
      this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Add(e);
  }
  EachStop() {
    SequenceController_1.SequenceController.FlushDialogueState(),
      (this.Sto = !1),
      this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Clear(),
      (this.yto = void 0),
      this.Model.CurLevelSeqActor.SequencePlayer.ClearKeyFrames(),
      this.Model.CurLevelSeqActor.ResetBindings(),
      ActorSystem_1.ActorSystem.Put(this.Model.CurLevelSeqActor),
      (this.Model.CurLevelSeqActor = void 0),
      (this.Model.TalkNpcList = void 0),
      this.Bto();
  }
  AllStop() {}
  End() {
    this.vto !== ResourceSystem_1.ResourceSystem.InvalidId &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.vto),
      (this.vto = ResourceSystem_1.ResourceSystem.InvalidId)),
      this.Sto &&
        (this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Clear(),
        this.Model.CurLevelSeqActor.SequencePlayer.GoToEndAndStop(0),
        this.Model.CurLevelSeqActor.ResetBindings(),
        ActorSystem_1.ActorSystem.Put(this.Model.CurLevelSeqActor),
        (this.Model.CurLevelSeqActor = void 0)),
      this.Mto && this.Mto.Remove(),
      (this.Model.RelativeTransform = void 0),
      (this.Sto = !1),
      this.Bto();
  }
  Uto() {
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
      var r = t.Get(e);
      if (r instanceof UE.MovieSceneSubTrack) {
        var s = r.Sections,
          o = s?.Num() || 0;
        for (let e = 0; e < o; e++) {
          var a = s.Get(e);
          a instanceof UE.MovieSceneSubSection &&
            UE.KuroSequenceRuntimeFunctionLibrary.ResetMovieSceneCompiledData(
              a.SubSequence,
            );
        }
      }
    }
  }
  Ato() {
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
  Ito() {
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
  Pto() {
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
  Bto() {
    (this.Model.CurSubtitleStartFrames.length = 0),
      (this.Model.CurSubtitleEndFrames.length = 0),
      (this.Model.CurShotStartFrames.length = 0),
      (this.Model.CurShotEndFrames.length = 0),
      (this.Model.CurStartFrame = void 0),
      (this.Model.CurEndFrame = void 0);
  }
  wto() {
    var e = this.Model.GetCurrentKeyFramesInfo(),
      t = e.SubtitleStartFrames,
      i = t.Num();
    for (let e = 0; e < i; e++)
      this.Model.CurSubtitleStartFrames.push(t.Get(e));
    var r = e.SubtitleEndFrames,
      s = r.Num();
    for (let e = 0; e < s; e++) this.Model.CurSubtitleEndFrames.push(r.Get(e));
    var o = e.ShotStartFrames,
      a = o.Num();
    for (let e = 0; e < a; e++) this.Model.CurShotStartFrames.push(o.Get(e));
    var n = e.ShotEndFrames,
      h = n.Num();
    for (let e = 0; e < h; e++) this.Model.CurShotEndFrames.push(n.Get(e));
  }
  Tto() {
    this.Model.IsFadeEnd.length = 0;
    var i = this.Model.SequenceData;
    for (let t = 0; t < i.剧情资源.Num(); t++) {
      var a = i.剧情资源.Get(t),
        n = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackEnd(a) - 1;
      let e = 0;
      e = this.GetFadeAmountAt(a, n);
      (a = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(
        a,
        UE.MovieSceneCinematicShotTrack.StaticClass(),
      )),
        (a = a && 0 < a.Num() ? a.Get(0) : void 0);
      if (ObjectUtils_1.ObjectUtils.IsValid(a)) {
        var h = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(a);
        if (0 < h.Num()) {
          let i = void 0,
            r = 0,
            s = 0,
            o = 0;
          for (let t = h.Num() - 1; 0 <= t; t--) {
            var l = h.Get(t);
            let e = UE.KuroSequenceRuntimeFunctionLibrary.GetEndFrame(l);
            (e = e > n ? n : e) > r &&
              ((i = l),
              (o = i.Parameters.StartFrameOffset.Value),
              (s = UE.KuroSequenceRuntimeFunctionLibrary.GetStartFrame(i)),
              (r = e));
          }
          var _,
            a = i?.GetSequence();
          ObjectUtils_1.ObjectUtils.IsValid(a) &&
            ((_ = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(a)),
            (_ = n - s + o + _),
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
    var r = [];
    for (let e = 0; e < i.Num(); e++) {
      var s = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(i.Get(e));
      for (let e = 0; e < s.Num(); e++) r.push(s.Get(e));
    }
    if (0 === r.length) return -1;
    let o = 0;
    var a = new UE.FrameTime(new UE.FrameNumber(t), 0);
    for (const h of r) {
      var n = h;
      if (UE.KuroSequenceRuntimeFunctionLibrary.SectionContains(n, a)) {
        o =
          0 !== n.FloatCurve.Times.Num() || n.FloatCurve.bHasDefaultValue
            ? UE.KuroSequenceRuntimeFunctionLibrary.GetFadeAmountAt(n, a)
            : -1;
        break;
      }
    }
    return o;
  }
  Lto() {
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
  Rto() {
    if (this.Model.SequenceData.GeneratedData) {
      var t = this.Model.SequenceData.GeneratedData.FinalPos,
        i = t.Num();
      for (let e = 0; e < i; e++) {
        var r = t.Get(e),
          s = Rotator_1.Rotator.Create(r.Rotator()),
          r = Vector_1.Vector.Create(r.GetLocation());
        (0 !== this.Model.Type && 2 !== this.Model.Type) || (s.Yaw += 90),
          this.Model.AddFinalPos(
            Transform_1.Transform.Create(
              s.Quaternion(),
              r,
              Vector_1.Vector.OneVectorProxy,
            ),
          );
      }
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 39, "使用了最终位置，但是没有后处理位置。");
  }
  JumpToNextSubtitleOrChildSeq() {
    if (this.Model.HasSubtitle()) {
      const s = this.Model.CurLevelSeqActor.SequencePlayer,
        o = s.GetCurrentTime().Time.FrameNumber.Value;
      let e = SequenceDefine_1.MAX_FRAME;
      for (const a of this.Model.CurSubtitleStartFrames) {
        if (a === o) return;
        if (a > o) {
          e = a;
          break;
        }
      }
      let t = SequenceDefine_1.MAX_FRAME;
      for (const n of this.Model.CurShotStartFrames)
        if (n > o) {
          t = n;
          break;
        }
      let i = 0;
      var r = this.Model.GetType();
      0 === (i = 1 === r ? e : Math.min(e, t)) ||
      i === SequenceDefine_1.MAX_FRAME
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
              (this.Mto = TimerSystem_1.TimerSystem.Delay(() => {
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    27,
                    "Sequence最后一句话淡出跳至结束",
                    ["curFrame", o],
                    ["targetFrame", i],
                  ),
                  (this.Mto = void 0),
                  s.GoToEndAndStop(0);
              }, this.Model.EndLeastTime * TimeUtil_1.TimeUtil.InverseMillisecond)))
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Plot",
                  27,
                  "Sequence跳至结束",
                  ["curFrame", o],
                  ["targetFrame", i],
                ),
              s.OnStop.Clear(),
              s.GoToEndAndStop(0),
              this.yto &&
                (SequenceController_1.SequenceController.FlushDialogueState(),
                this.yto())))
        : i > o &&
          i <= this.Model.CurEndFrame &&
          ((o < t && t < i) ||
            ((r = (0, puerts_1.$ref)(void 0)),
            UE.GameplayStatics.GetAllActorsOfClass(
              GlobalData_1.GlobalData.World,
              UE.BP_BaseRole_Seq_V2_C.StaticClass(),
              r,
            ),
            (this.Eto = (0, puerts_1.$unref)(r)),
            (this.Model.BeginBlendFrame = 1),
            this.bto(o, i),
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
          this.qto(i));
    }
  }
  qto(e, t = 0) {
    3 === this.Model.State &&
      ((e = new UE.FrameNumber(e)),
      (e = new UE.FrameTime(e, 0)),
      (e = new UE.MovieSceneSequencePlaybackParams(e, 0, "", 0, t)),
      this.Model.CurLevelSeqActor.SequencePlayer.SetPlaybackPositionWithNoEval(
        e,
      ));
  }
  bto(e, t) {
    if (this.Eto && 0 !== this.Eto.Num()) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Plot",
          27,
          "SequenceAssistant:开始混合",
          ["curFrame", e],
          ["targetFrame", t],
        );
      for (let e = 0; e < this.Eto.Num(); ++e) {
        var i = this.Eto.Get(e);
        i.BeginSwitchPose(i, i, 0.5, !1);
      }
    }
  }
  EndSwitchPose() {
    if (this.Eto && 0 !== this.Eto.Num()) {
      var e =
        this.Model.CurLevelSeqActor.SequencePlayer.GetCurrentTime()?.Time
          .FrameNumber.Value;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "SequenceAssistant:结束混合", [
          "curFrame",
          e,
        ]);
      for (let e = 0; e < this.Eto.Num(); ++e) {
        var t = this.Eto.Get(e);
        t?.EndSwitchPose(t, !1);
      }
    }
  }
  PauseSequence() {
    3 !== this.Model.State
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "剧情Sequence未开始播放")
      : (this.Model.CurLevelSeqActor.SequencePlayer.IsPlaying() &&
          this.Model.CurLevelSeqActor.SequencePlayer.PauseOnNextFrame(),
        (this.Model.IsPaused = !0));
  }
  ResumeSequence() {
    3 !== this.Model.State
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Plot", 27, "剧情Sequence未开始播放")
      : (this.Model.CurLevelSeqActor.SequencePlayer.IsPaused() &&
          this.Model.CurLevelSeqActor.SequencePlayer.Play(),
        (this.Model.IsPaused = !1));
  }
  xto() {
    var e = this.Model.SequenceData.剧情资源.Get(this.Model.SubSeqIndex),
      t = e.MovieScene.MasterTracks,
      i = t?.Num() || 0,
      r = e.MovieScene.TickResolution,
      s = e.MovieScene.DisplayRate,
      o = (s.Denominator * r.Numerator) / (s.Numerator * r.Denominator);
    for (let e = 0; e < i; e++) {
      var a = t.Get(e);
      if (!a.bIsEvalDisabled)
        if (a instanceof UE.MovieSceneDialogueTrack) {
          var n = a.Sections,
            h = n?.Num() || 0;
          for (let e = 0; e < h; e++) {
            var l = n.Get(e);
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
            U = f?.Num() || 0;
          for (let e = 0; e < U; e++) {
            var v = f.Get(e);
            v instanceof UE.MovieSceneSubSection &&
              (this.Model.CurShotStartFrames.push(
                v.GetStartFrame().Value.Value / o,
              ),
              this.Model.CurShotEndFrames.push(
                v.GetEndFrame().Value.Value / o,
              ));
          }
        }
    }
    1 === this.Model.Type &&
      ((this.Model.CurShotStartFrames.length = 0),
      (this.Model.CurShotEndFrames.length = 0),
      (s = this.Gto(e)),
      this.Model.CurShotStartFrames.push(0),
      s?.forEach((e) => {
        this.Model.CurShotStartFrames.push(e);
      }),
      this.Model.CurShotStartFrames.pop(),
      s?.forEach((e) => {
        this.Model.CurShotEndFrames.push(e);
      })),
      this.Model.CurSubtitleStartFrames.sort((e, t) => e - t),
      this.Model.CurSubtitleEndFrames.sort((e, t) => e - t),
      this.Model.CurShotStartFrames.sort((e, t) => e - t),
      this.Model.CurShotEndFrames.sort((e, t) => e - t);
  }
  Gto(e) {
    var i = new Array();
    if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
      let t = void 0;
      const f = UE.KuroSequenceRuntimeFunctionLibrary.GetMasterTracks(e);
      for (let e = 0; e < f.Num(); e++) {
        var r = f.Get(e);
        if (r instanceof UE.MovieSceneSubTrack) {
          t = r;
          break;
        }
      }
      if (t) {
        const U = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(t);
        for (let e = 0; e < U.Num(); e++) {
          var s = U.Get(e),
            o = s.GetSequence(),
            a = s.GetStartFrame().Value.Value,
            n = s.GetEndFrame().Value.Value,
            h = s.Parameters.StartFrameOffset.Value,
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
                  const U =
                    UE.KuroSequenceRuntimeFunctionLibrary.GetSections(u);
                  for (let e = 0; e < U.Num(); e++) {
                    var c =
                      U.Get(e).GetEndFrame().Value.Value -
                      h +
                      a -
                      UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(o);
                    a < c && c <= n ? i.push(c) : n < c && i.push(n);
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
  Dto() {
    var t = this.Model.SequenceData;
    for (let e = 0; e < t.剧情资源.Num(); e++) {
      var i,
        r = t.剧情资源.Get(e),
        r = this.Nto(r);
      r
        ? ((i = Rotator_1.Rotator.Create(r.Rotator())),
          (r = Vector_1.Vector.Create(r.GetLocation())),
          (0 !== t.类型 && 2 !== t.类型) || (i.Yaw += 90),
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
  Nto(e) {
    let o = this.Model.SequenceData.GeneratedData?.BlendOutTag,
      a =
        (FNameUtil_1.FNameUtil.IsNothing(o) && (o = SequenceDefine_1.HERO_TAG),
        this.Oto(e, o)),
      n = e,
      h = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackEnd(e) - 1;
    if (!a?.Guid?.IsValid()) {
      const c = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(
        e,
        UE.MovieSceneCinematicShotTrack.StaticClass(),
      );
      if (0 === c.Num()) return;
      e = c?.Get(0);
      if (!ObjectUtils_1.ObjectUtils.IsValid(e)) return;
      var l = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(e);
      let t = void 0,
        i = 0,
        r = 0,
        s = 0;
      for (let e = l.Num() - 1; 0 <= e; e--) {
        var _ = l.Get(e),
          u = UE.KuroSequenceRuntimeFunctionLibrary.GetEndFrame(_);
        u > i &&
          ((t = _),
          (s = t.Parameters.StartFrameOffset.Value),
          (r = UE.KuroSequenceRuntimeFunctionLibrary.GetStartFrame(t)),
          (i = u));
      }
      if (((n = t?.GetSequence()), !ObjectUtils_1.ObjectUtils.IsValid(n)))
        return;
      if (!(a = this.Oto(n, o))?.Guid?.IsValid()) return;
      h =
        i -
        r +
        s -
        1 +
        UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(n);
    }
    var e = UE.KuroSequenceRuntimeFunctionLibrary.FindBindingById(n, a.Guid);
    const c = UE.KuroSequenceRuntimeFunctionLibrary.FindTracksByType(
      e,
      UE.MovieScene3DTransformTrack.StaticClass(),
    );
    if (1 === c.Num())
      return (
        (e = c.Get(0)),
        UE.KuroSequenceRuntimeFunctionLibrary.GetFrameTransform(
          e,
          new UE.FrameTime(new UE.FrameNumber(h), 0),
        )
      );
  }
  Oto(t, e) {
    var i = t.FindBindingsByTag(e),
      r = i.Num();
    for (let e = 0; e < r; e++) {
      var s = i.Get(e);
      if (
        UE.KuroSequenceRuntimeFunctionLibrary.FindBindingById(
          t,
          s.Guid,
        ).BindingID?.IsValid()
      )
        return s;
    }
  }
}
exports.SequenceAssistant = SequenceAssistant;
//# sourceMappingURL=SequenceAssistant.js.map
