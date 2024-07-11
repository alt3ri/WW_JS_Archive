"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiAssistant = exports.ESequenceEventName = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Queue_1 = require("../../../../../Core/Container/Queue");
const Event_1 = require("../../../../../Core/Event/Event");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const SequenceController_1 = require("../SequenceController");
const SequenceDefine_1 = require("../SequenceDefine");
const SeqBaseAssistant_1 = require("./SeqBaseAssistant");
let ESequenceEventName;
!(function (e) {
  (e[(e.UpdateSeqSubtitle = 0)] = "UpdateSeqSubtitle"),
    (e[(e.HandlePlotOptionSelected = 1)] = "HandlePlotOptionSelected"),
    (e[(e.HandleSeqSubtitleEnd = 2)] = "HandleSeqSubtitleEnd"),
    (e[(e.HandleSubSequenceStop = 3)] = "HandleSubSequenceStop"),
    (e[(e.HandleIndependentSeqAudio = 4)] = "HandleIndependentSeqAudio");
})(
  (ESequenceEventName =
    exports.ESequenceEventName || (exports.ESequenceEventName = {})),
);
class CacheDialogueData {
  constructor(e, t, i, r, n) {
    (this.Show = e),
      (this.DialogueId = t),
      (this.GuardTime = i),
      (this.AudioDelay = r),
      (this.AudioTransitionDuration = n);
  }
}
class UiAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments),
      (this.Event = new Event_1.Event(ESequenceEventName)),
      (this.kto = new Queue_1.Queue()),
      (this.Fto = !1),
      (this.yze = (e) => {
        this.Promise?.SetResult(e), (this.Promise = void 0);
      }),
      (this.OnShowDialogue = (e, t, i, r, n) => {
        this.Model.State === 3 &&
          ((i = i / SequenceDefine_1.FRAME_PER_MILLISECOND),
          this.kto.Push(new CacheDialogueData(e, t, i, r, n)));
      });
  }
  async LoadPromise() {
    return (
      (this.Promise = new CustomPromise_1.CustomPromise()),
      ControllerHolder_1.ControllerHolder.PlotController.WaitViewCallback(
        this.yze,
      ),
      this.Promise
        ? this.Promise.Promise
        : UiManager_1.UiManager.IsViewShow("PlotSubtitleView")
    );
  }
  PreAllPlay() {
    this.Model.IsSubtitleUiUse && this.Vto(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlotDoingTextShow,
        this.Model.SequenceData.标识为演出制作中,
      );
  }
  EachStop() {
    this.Event.Emit(ESequenceEventName.HandleSubSequenceStop);
  }
  AllStop() {
    this.Model.GetLastFadeEnd() &&
      ((ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
      ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
        0,
        3,
        void 0,
        0,
        ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.ColorSearch(),
      ));
  }
  End() {
    this.Model.IsSubtitleUiUse && this.Hto(),
      ControllerHolder_1.ControllerHolder.PlotController.RemoveViewCallback(
        this.yze,
      ),
      this.Promise && (this.Promise.SetResult(!1), (this.Promise = void 0));
  }
  Vto() {
    let e;
    !this.Fto &&
      ((this.Fto = !0),
      (e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
        GlobalData_1.GlobalData.World,
        UE.MovieSceneDialogueSubsystem.StaticClass(),
      ))) &&
      e.OnShowDialogue.Add(this.OnShowDialogue);
  }
  Hto() {
    let e;
    this.Fto &&
      ((this.Fto = !1),
      (e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
        GlobalData_1.GlobalData.World,
        UE.MovieSceneDialogueSubsystem.StaticClass(),
      ))) &&
      e.OnShowDialogue.Remove(this.OnShowDialogue);
  }
  TriggerAllSubtitle() {
    for (; this.kto.Size > 0; ) {
      const e = this.kto.Pop();
      e &&
        this.jto(
          e?.Show,
          e?.DialogueId,
          e?.GuardTime,
          e?.AudioDelay,
          e?.AudioTransitionDuration,
        );
    }
  }
  jto(e, t, i, r, n) {
    e ? this.Wto(t, i, r, n) : this.Kto(t);
  }
  Wto(e, t, i, r) {
    e !== "None" &&
      ((e = parseInt(e)),
      (e =
        ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.CreateSubtitleFromTalkItem(
          e,
        ))) &&
      (ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnUpdateSubtitle(
        e,
      ),
      this.HandlePlotSubtitle(e, t, i, r));
  }
  Kto(e) {
    e !== "None" &&
      ((e = parseInt(e)),
      ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnSubtitleEnd(
        e,
      ),
      ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnSubmitSubtitle(),
      this.HandlePlotSubtitleEnd(e));
  }
  Qto() {
    (this.Model.DefaultGuardTime =
      ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.GuardTime),
      (this.Model.DefaultAudioDelay =
        ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.AudioDelay),
      (this.Model.DefaultAudioTransitionDuration =
        ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.AudioTransitionDuration),
      (this.Model.IsSubtitleConfigInit = !0);
  }
  HandlePlotSubtitle(e, t, i, r) {
    this.Model.IsSubtitleConfigInit || this.Qto(),
      (this.Model.CurSubtitle.Subtitles = e),
      (this.Model.CurSubtitle.GuardTime =
        t < 0
          ? 0
          : t === 0
            ? this.Model.DefaultGuardTime *
              TimeUtil_1.TimeUtil.InverseMillisecond
            : t),
      (this.Model.CurSubtitle.AudioDelay =
        i < 0
          ? 0
          : i === 0
            ? this.Model.DefaultAudioDelay *
              TimeUtil_1.TimeUtil.InverseMillisecond
            : i),
      (this.Model.CurSubtitle.AudioTransitionDuration =
        r < 0
          ? 0
          : r === 0
            ? this.Model.DefaultAudioTransitionDuration *
              TimeUtil_1.TimeUtil.InverseMillisecond
            : r);
    e = this.Model.CurSubtitle;
    e &&
      (this.Event.Emit(ESequenceEventName.UpdateSeqSubtitle, e),
      e.Subtitles?.PlayVoice) &&
      e.Subtitles.Style?.Type !== "InnerVoice" &&
      SequenceController_1.SequenceController.TryApplyMouthAnim(
        e.Subtitles.PlotLineKey,
        e.Subtitles.WhoId,
      );
  }
  HandlePlotSubtitleEnd(e) {
    this.Event.Emit(ESequenceEventName.HandleSeqSubtitleEnd, e);
  }
  HandleSelectedOption(e) {
    ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnSelectOption(
      e,
    ),
      this.Event.Emit(ESequenceEventName.HandlePlotOptionSelected, e);
  }
}
exports.UiAssistant = UiAssistant;
// # sourceMappingURL=UiAssistant.js.map
