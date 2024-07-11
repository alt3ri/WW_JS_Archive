"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SequenceController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerWithAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase");
const ActorAssistant_1 = require("./Assistant/ActorAssistant");
const CameraAssistant_1 = require("./Assistant/CameraAssistant");
const FlowAssistant_1 = require("./Assistant/FlowAssistant");
const FunctionAssistant_1 = require("./Assistant/FunctionAssistant");
const RenderAssistant_1 = require("./Assistant/RenderAssistant");
const SequenceAssistant_1 = require("./Assistant/SequenceAssistant");
const UiAssistant_1 = require("./Assistant/UiAssistant");
class SequenceController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnInit() {
    const t = super.OnInit();
    return (this.Xto = ModelManager_1.ModelManager.SequenceModel), t;
  }
  static OnClear() {
    return (this.Xto = void 0), super.OnClear();
  }
  static OnTick(t) {
    this.Xto.DisableMotionBlurFrame > 0 &&
      (this.Xto.DisableMotionBlurFrame--,
      this.Xto.DisableMotionBlurFrame === 0) &&
      this.$to.SetMotionBlurState(!0),
      this.Xto.BeginSwitchFrame > 0 &&
        (this.Xto.BeginSwitchFrame--, this.Xto.BeginSwitchFrame === 0) &&
        (this.Yto
          ? this.Yto.EndSwitchPose()
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 39, "SwitchPose 失败!"),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Plot", 39, "SwitchPose 结束"),
      this.Xto.BeginBlendFrame > 0 &&
        (this.Xto.BeginBlendFrame--, this.Xto.BeginBlendFrame === 0) &&
        (this.Jto
          ? this.Jto.EndSwitchPose()
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 39, "BlendPose 失败!"),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Plot", 39, "BlendPose 结束"),
      this.FlushDialogueState(),
      this.zto && this.CheckSeqStreamingData();
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
  static get Jto() {
    return this.Assistants.get(0);
  }
  static get Yto() {
    return this.Assistants.get(1);
  }
  static get Zto() {
    return this.Assistants.get(2);
  }
  static get eio() {
    return this.Assistants.get(3);
  }
  static get $to() {
    return this.Assistants.get(4);
  }
  static get tio() {
    return this.Assistants.get(5);
  }
  static get iio() {
    return this.Assistants.get(6);
  }
  static Play(t, s, i, e = !0, r = !0, h = !1, a = 1) {
    this.Xto.IsPlaying
      ? (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "重复播放剧情Sequence，当前一次只能播放一段",
        ),
        i(!1))
      : t
        ? (s && s.length > 0
            ? (this.Yto.PreLoadMouthAssetName = s)
            : (this.Yto.PreLoadMouthAssetName.length = 0),
          (this.Xto.Config = t),
          (this.Xto.IsViewTargetControl = e),
          (this.Xto.IsSubtitleUiUse = r),
          (this.Xto.IsWaitRenderData = h),
          (this.Xto.PlayRate = a),
          (this.Xto.FinishCallback = i),
          this.un((t) => {
            this.Xto.IsEnding ||
              (t
                ? this.oio((t) => {
                    this.Xto.IsEnding ||
                      (t
                        ? this.rio((t) => {
                            this.Xto.IsEnding ||
                              (t
                                ? this.nio((t) => {
                                    this.Xto.IsEnding ||
                                      (t || this.sio(),
                                      this.Xto.Reset(),
                                      this.Neo(t));
                                  })
                                : (this.sio(), this.Neo(!1)));
                          })
                        : (this.sio(), this.Neo(!1)));
                  })
                : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
                    "资源加载失败，不播放Sequence",
                  ),
                  this.sio(),
                  this.Neo(!1)));
          }))
        : (ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "播放剧情Sequence配置为空",
          ),
          i(!1));
  }
  static ManualFinish() {
    this.Xto.State === 0 || this.Xto.State === 4 || this.Xto.State === 5
      ? (this.Xto.FinishCallback = void 0)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "剧情Sequence强制停止"),
        this.sio(),
        this.Xto.Reset());
  }
  static un(s) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 27, "[剧情加载等待] Sequence加载-开始");
    var t = this.Xto.Config.Path;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      this.Xto.State = 1;
      var t = this.iio.LoadPromise();
      const i = this.Yto.BeginLoadMouthAssetPromise();
      const e = new CustomPromise_1.CustomPromise();
      this.Jto.Load((t) => {
        t
          ? this.Yto.Load((t) => {
              t
                ? this.Zto.Load((t) => {
                    t
                      ? this.Xto.IsWaitRenderData
                        ? ((this.zto = e),
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
  static oio(s) {
    (this.Xto.State = 2),
      this.$to.PreAllPlay(),
      this.tio.PreAllPlay(),
      this.Jto.PreAllPlay(),
      this.iio.PreAllPlay(),
      this.Yto.PreAllPlay((t) => {
        t ? (this.eio.PreAllPlay(), this.Zto.PreAllPlay(), s(t)) : s(!1);
      });
  }
  static rio(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 39, "准备开始演出，延迟到帧头执行"),
      TimerSystem_1.TimerSystem.Next(() => {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 39, "开始演出"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotSequencePlay,
          ),
          (this.Xto.State = 3),
          this.aio(t);
      });
  }
  static aio(t) {
    this.tio.PreEachPlay(),
      this.Jto.PreEachPlay(),
      this.Yto.PreEachPlay(),
      this.$to.PreEachPlay(),
      this.eio.PreEachPlay(),
      this.Jto.Play(() => {
        this.$to.EachStop(),
          this.Jto.EachStop(),
          this.iio.EachStop(),
          this.tio.EachStop(),
          this.eio.EachStop(),
          this.Xto.IsFinish() ? t(!0) : this.aio(t);
      });
  }
  static nio(s) {
    (this.Xto.State = 4),
      this.Zto.AllStop(),
      this.$to.AllStop(),
      this.tio.AllStop(),
      this.iio.AllStop();
    const t = this.Yto.AllStopPromise();
    this.eio.AllStop(),
      t.then((t) => {
        t ? (this.Jto.AllStop(), this.sio(), s(!0)) : s(!1);
      });
  }
  static sio() {
    if (!this.Xto.IsEnding) {
      (this.Xto.State = 5),
        this.$to.End(),
        this.Jto.End(),
        this.Yto.End(),
        this.iio.End(),
        this.Zto.End(),
        this.tio.End(),
        this.eio.End();
      const t = (0, puerts_1.$ref)(UE.NewArray(UE.KuroPostProcessVolume));
      const s =
        (UE.GameplayStatics.GetAllActorsOfClass(
          GlobalData_1.GlobalData.World,
          UE.KuroPostProcessVolume.StaticClass(),
          t,
        ),
        (0, puerts_1.$unref)(t));
      const i = s.Num();
      const e = new UE.FName("SequencePostProcess");
      for (let t = 0; t < i; t++) {
        const r = s.Get(t);
        r.ActorHasTag(e) && (r.Settings = new UE.PostProcessSettings());
      }
      this.Xto.State = 0;
    }
  }
  static Neo(t) {
    let s;
    this.Xto.FinishCallback &&
      ((s = this.Xto.FinishCallback), (this.Xto.FinishCallback = void 0), s(t));
  }
  static get Event() {
    return this.iio.Event;
  }
  static SelectOption(t) {
    this.iio.HandleSelectedOption(t);
  }
  static JumpToNextSubtitleOrChildSeq() {
    (this.Xto.TwiceAnimFlag = !0),
      this.Jto.JumpToNextSubtitleOrChildSeq(),
      (this.Xto.TwiceAnimFlag = !1);
  }
  static PauseSequence() {
    this.Jto.PauseSequence();
  }
  static ResumeSequence() {
    this.Jto.ResumeSequence();
  }
  static SetNextSequenceIndex(t) {
    this.tio.SetNextSequenceIndex(t);
  }
  static CheckSeqStreamingData() {
    this.$to.CheckSeqStreamingData() &&
      this.zto &&
      (this.zto.SetResult(!0), (this.zto = void 0));
  }
  static FlushDialogueState() {
    this.iio.TriggerAllSubtitle();
  }
  static TryApplyMouthAnim(t, s) {
    this.Yto.TryApplyMouthAnim(t, s);
  }
  static StopMouthAnim() {
    this.Yto.StopMouthAnim();
  }
  static RunSequenceFrameEvents(t) {
    this.Zto.RunSequenceFrameEvents(t);
  }
  static TriggerCutChange() {
    (this.Xto.DisableMotionBlurFrame = 2),
      this.$to.SetMotionBlurState(!1),
      this.Yto.TriggerCutChange(),
      this.eio.CalcPreloadLocation(),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.InvalidSeveralFrameOcculusion 5",
      );
  }
  static ShowLogo(t) {
    this.Zto.ShowLogo(t);
  }
}
((exports.SequenceController = SequenceController).IsTickEvenPausedInternal =
  !0),
  (SequenceController.zto = void 0),
  (SequenceController.Xto = void 0);
// # sourceMappingURL=SequenceController.js.map
