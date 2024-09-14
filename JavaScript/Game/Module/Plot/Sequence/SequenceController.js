"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SequenceController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase"),
  ActorAssistant_1 = require("./Assistant/ActorAssistant"),
  CameraAssistant_1 = require("./Assistant/CameraAssistant"),
  FlowAssistant_1 = require("./Assistant/FlowAssistant"),
  FunctionAssistant_1 = require("./Assistant/FunctionAssistant"),
  RenderAssistant_1 = require("./Assistant/RenderAssistant"),
  SequenceAssistant_1 = require("./Assistant/SequenceAssistant"),
  UiAssistant_1 = require("./Assistant/UiAssistant");
class SequenceController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnInit() {
    var t = super.OnInit();
    return (this.jio = ModelManager_1.ModelManager.SequenceModel), t;
  }
  static OnClear() {
    return (this.jio = void 0), super.OnClear();
  }
  static OnTick(t) {
    0 < this.jio.DisableMotionBlurFrame &&
      (this.jio.DisableMotionBlurFrame--,
      0 === this.jio.DisableMotionBlurFrame) &&
      this.Wio.SetMotionBlurState(!0),
      0 < this.jio.BeginSwitchFrame &&
        (this.jio.BeginSwitchFrame--, 0 === this.jio.BeginSwitchFrame) &&
        (this.Kio
          ? this.Kio.EndSwitchPose()
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 39, "SwitchPose 失败!"),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Plot", 39, "SwitchPose 结束"),
      this.FlushDialogueState(),
      this.Xio && this.CheckSeqStreamingData();
  }
  static RegisterAssistant() {
    this.AddAssistant(0, new SequenceAssistant_1.SequenceAssistant()),
      this.AddAssistant(1, new ActorAssistant_1.ActorAssistant()),
      this.AddAssistant(2, new FunctionAssistant_1.FunctionAssistant()),
      this.AddAssistant(3, new CameraAssistant_1.CameraAssistant()),
      this.AddAssistant(4, new RenderAssistant_1.RenderAssistant()),
      this.AddAssistant(5, new FlowAssistant_1.FlowAssistant()),
      this.AddAssistant(6, new UiAssistant_1.UiAssistant());
  }
  static get Qio() {
    return this.Assistants.get(0);
  }
  static get Kio() {
    return this.Assistants.get(1);
  }
  static get $io() {
    return this.Assistants.get(2);
  }
  static get Yio() {
    return this.Assistants.get(3);
  }
  static get Wio() {
    return this.Assistants.get(4);
  }
  static get Jio() {
    return this.Assistants.get(5);
  }
  static get zio() {
    return this.Assistants.get(6);
  }
  static Play(t, s, i, e = !0, r = !0, a = !1, h = 1) {
    this.jio.IsPlaying
      ? (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "重复播放剧情Sequence，当前一次只能播放一段",
        ),
        i(!1))
      : t
        ? (s && 0 < s.length
            ? (this.Kio.PreLoadMouthAssetName = s)
            : (this.Kio.PreLoadMouthAssetName.length = 0),
          (this.jio.Config = t),
          (this.jio.IsViewTargetControl = e),
          (this.jio.IsSubtitleUiUse = r),
          (this.jio.IsWaitRenderData = a),
          (this.jio.PlayRate = h),
          (this.jio.FinishCallback = i),
          this.un((t) => {
            this.jio.IsEnding ||
              (t
                ? this.Zio((t) => {
                    this.jio.IsEnding ||
                      (t
                        ? this.eoo((t) => {
                            this.jio.IsEnding ||
                              (t
                                ? this.too((t) => {
                                    this.jio.IsEnding ||
                                      (t || this.ioo(),
                                      this.jio.Reset(),
                                      this.Bto(t));
                                  })
                                : (this.ioo(), this.Bto(!1)));
                          })
                        : (this.ioo(), this.Bto(!1)));
                  })
                : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
                    "资源加载失败，不播放Sequence",
                  ),
                  this.ioo(),
                  this.Bto(!1)));
          }))
        : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "播放剧情Sequence配置为空",
          ),
          i(!1));
  }
  static ManualFinish() {
    0 === this.jio.State || 4 === this.jio.State || 5 === this.jio.State
      ? (this.jio.FinishCallback = void 0)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "剧情Sequence强制停止"),
        this.ioo(),
        this.jio.Reset());
  }
  static un(s) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 27, "[剧情加载等待] Sequence加载-开始");
    var t = this.jio.Config.Path;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      this.jio.State = 1;
      var t = this.zio.LoadPromise(),
        i = this.Kio.BeginLoadMouthAssetPromise();
      const e = new CustomPromise_1.CustomPromise();
      this.Qio.Load((t) => {
        t
          ? this.Kio.Load((t) => {
              t
                ? this.$io.Load((t) => {
                    t
                      ? this.jio.IsWaitRenderData
                        ? ((this.Xio = e),
                          Log_1.Log.CheckDebug() &&
                            Log_1.Log.Debug(
                              "Plot",
                              39,
                              "检查手动流送：开始检查完成",
                            ),
                          this.CheckSeqStreamingData())
                        : (Log_1.Log.CheckDebug() &&
                            Log_1.Log.Debug(
                              "Plot",
                              39,
                              "检查手动流送：不检查完成",
                            ),
                          this.CheckSeqStreamingData(),
                          e.SetResult(!0))
                      : e.SetResult(!1);
                  })
                : e.SetResult(!1);
            })
          : e.SetResult(!1);
      }),
        Promise.all([t, i, e.Promise]).then((t) => {
          t = t[0] && t[1] && t[2];
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Plot", 27, "[剧情加载等待] Sequence加载-完成", [
              "result",
              t,
            ]),
            s(t);
        });
    }
  }
  static Zio(s) {
    (this.jio.State = 2),
      this.Jio.PreAllPlay(),
      this.Qio.PreAllPlay(),
      this.zio.PreAllPlay(),
      this.Kio.PreAllPlay((t) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 39, "准备开始演出，延迟到帧头执行"),
          TimerSystem_1.TimerSystem.Next(() => {
            Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 39, "开始演出"),
              t
                ? (this.Wio.PreAllPlay(),
                  this.Yio.PreAllPlay(),
                  this.$io.PreAllPlay(),
                  s(t))
                : s(!1);
          });
      });
  }
  static eoo(t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotSequencePlay),
      this.Kio.CheckHideBattleCharacter(),
      (this.jio.State = 3),
      this.ooo(t);
  }
  static ooo(t) {
    this.Jio.PreEachPlay(),
      this.Qio.PreEachPlay(),
      this.Kio.PreEachPlay(),
      this.Wio.PreEachPlay(),
      this.Yio.PreEachPlay(),
      this.Qio.Play(() => {
        this.Wio.EachStop(),
          this.Qio.EachStop(),
          this.zio.EachStop(),
          this.Jio.EachStop(),
          this.Yio.EachStop(),
          this.jio.IsFinish() ? t(!0) : this.ooo(t);
      });
  }
  static too(s) {
    (this.jio.State = 4),
      this.$io.AllStop(),
      this.Wio.AllStop(),
      this.Jio.AllStop(),
      this.zio.AllStop();
    var t = this.Kio.AllStopPromise();
    this.Yio.AllStop(),
      t.then((t) => {
        t ? (this.Qio.AllStop(), this.ioo(), s(!0)) : s(!1);
      });
  }
  static ioo() {
    if (!this.jio.IsEnding) {
      (this.jio.State = 5),
        this.Wio.End(),
        this.Qio.End(),
        this.Kio.End(),
        this.zio.End(),
        this.$io.End(),
        this.Jio.End(),
        this.Yio.End();
      var t = (0, puerts_1.$ref)(UE.NewArray(UE.KuroPostProcessVolume)),
        s =
          (UE.GameplayStatics.GetAllActorsOfClass(
            GlobalData_1.GlobalData.World,
            UE.KuroPostProcessVolume.StaticClass(),
            t,
          ),
          (0, puerts_1.$unref)(t)),
        i = s.Num(),
        e = new UE.FName("SequencePostProcess");
      for (let t = 0; t < i; t++) {
        var r = s.Get(t);
        r.ActorHasTag(e) && (r.Settings = new UE.PostProcessSettings());
      }
      this.jio.State = 0;
    }
  }
  static Bto(t) {
    var s;
    this.jio.FinishCallback &&
      ((s = this.jio.FinishCallback), (this.jio.FinishCallback = void 0), s(t));
  }
  static get Event() {
    return this.zio.Event;
  }
  static SelectOption(t, s) {
    this.zio.HandleSelectedOption(t, s);
  }
  static FinishSubtitle(t) {
    this.zio.HandlePlotSubtitleEnd(t, !0);
  }
  static JumpToNextSubtitleOrChildSeq() {
    this.Qio.JumpToNextSubtitleOrChildSeq();
  }
  static PauseSequence(t) {
    this.Qio.PauseSequence(t);
  }
  static ResumeSequence(t) {
    this.Qio.ResumeSequence(t);
  }
  static SetNextSequenceIndex(t) {
    this.Jio.SetNextSequenceIndex(t);
  }
  static CheckSeqStreamingData() {
    this.Wio.CheckSeqStreamingData() &&
      this.Xio &&
      (this.Xio.SetResult(!0), (this.Xio = void 0));
  }
  static FlushDialogueState() {
    this.zio.TriggerAllSubtitle();
  }
  static TryApplyMouthAnim(t, s) {
    this.Kio.TryApplyMouthAnim(t, s);
  }
  static StopMouthAnim() {
    this.Kio.StopMouthAnim();
  }
  static RunSequenceFrameEvents(t) {
    this.$io.RunSequenceFrameEvents(t);
  }
  static TriggerCutChange() {
    (this.jio.DisableMotionBlurFrame = 2),
      this.Wio.SetMotionBlurState(!1),
      this.Kio.TriggerCutChange(),
      this.Yio.CalcPreloadLocation(),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.InvalidSeveralFrameOcculusion 5",
      );
  }
  static ShowLogo(t) {
    this.$io.ShowLogo(t);
  }
  static OpenUiView(t, s) {
    this.$io.OpenBackgroundImage(t, s);
  }
  static PlayUiLevelSequence(t) {
    this.$io.PlayUiLevelSequence(t);
  }
  static CloseUiView() {
    this.$io.CloseBackgroundImage();
  }
  static DisableMotionBlurAwhile() {
    (this.jio.DisableMotionBlurFrame = 2), this.Wio.SetMotionBlurState(!1);
  }
}
((exports.SequenceController = SequenceController).IsTickEvenPausedInternal =
  !0),
  (SequenceController.Xio = void 0),
  (SequenceController.jio = void 0);
//# sourceMappingURL=SequenceController.js.map
