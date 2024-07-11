"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotModel =
    exports.PlotConfig =
    exports.INTERLUDE_FADE_OUT =
    exports.INTERLUDE_FADE_IN =
      void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioDefine_1 = require("../../../Core/Audio/AudioDefine");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../Ui/UiManager");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const PlotCleanRange_1 = require("./PlotCleanRange");
const PlotController_1 = require("./PlotController");
const PlotData_1 = require("./PlotData");
const PlotGlobalConfig_1 = require("./PlotGlobalConfig");
const PlotMontage_1 = require("./PlotMontage");
const PlotTemplate_1 = require("./PlotTemplate");
const PlotTextReplacer_1 = require("./PlotTextReplacer");
const PlotTimeOfDay_1 = require("./PlotTimeOfDay");
const PlotWeather_1 = require("./PlotWeather");
const AUDIO_STATE_PLOT_LEVEL_GROUP =
  ((exports.INTERLUDE_FADE_IN = 1),
  (exports.INTERLUDE_FADE_OUT = 1),
  "plot_perform_level");
const AUDIO_STATE_NOT_PLOT = "not_plot";
const PLOT_END_AUDIO_EVENT = "plot_controller_end_plot";
const CAN_SKIP = !0;
const audioStatePlotLevel = {
  LevelA: "level_a",
  LevelB: "level_b",
  LevelC: "level_c",
  LevelD: "level_d",
  Prompt: "level_d",
};
class PlotConfig {
  constructor() {
    (this.DisableInput = !1),
      (this.CanSkip = !1),
      (this.CanSkipDebug = !1),
      (this.CanInteractive = !1),
      (this.CanPause = !1),
      (this.CameraMode = void 0),
      (this.IsAutoPlay = !1),
      (this.IsAutoPlayCache = !1),
      (this.PlotLevel = void 0),
      (this.ShouldSwitchMainRole = !1),
      (this.PauseTime = !1),
      (this.SkipTalkWhenFighting = !1),
      (this.SkipHiddenBlackScreenAtEnd = !1),
      (this.IsGmPlayPlotOnce = !1),
      (this.IsPreStreaming = !1),
      (this.IsSkipConfirmBoxShow = !0);
  }
  SetMode(t, e = !1) {
    switch (
      ((this.SkipHiddenBlackScreenAtEnd = t.DisableAutoFadeOut),
      this.IsGmPlayPlotOnce &&
        ((this.IsGmPlayPlotOnce = !1), (this.SkipHiddenBlackScreenAtEnd = !1)),
      t.Mode)
    ) {
      case "LevelA":
        (this.CameraMode = 0),
          (this.CanInteractive = !1),
          (this.CanSkip = (CAN_SKIP && !t.NoSkip) || this.CanSkipDebug),
          (this.DisableInput = !0),
          (this.CanPause = !1),
          (this.PlotLevel = "LevelA"),
          (this.IsAutoPlay = !0),
          (this.ShouldSwitchMainRole = !1),
          (this.PauseTime = !0),
          (this.SkipTalkWhenFighting = !1),
          PlotController_1.PlotController.TogglePlotProtect(!0);
        break;
      case "LevelB":
        (this.CameraMode = 0),
          (this.CanInteractive = !0),
          (this.CanSkip = (CAN_SKIP && !t.NoSkip) || this.CanSkipDebug),
          (this.DisableInput = !0),
          (this.CanPause = !0),
          (this.IsAutoPlay = this.IsAutoPlayCache),
          (this.PlotLevel = "LevelB"),
          (this.ShouldSwitchMainRole = !1),
          (this.PauseTime = !0),
          (this.SkipTalkWhenFighting = !1),
          PlotController_1.PlotController.TogglePlotProtect(!0);
        break;
      case "LevelC":
        void 0 === t.UseFlowCamera
          ? (this.CameraMode = 2)
          : (this.CameraMode = t.UseFlowCamera ? 2 : 1),
          (this.CanInteractive = !0),
          (this.CanSkip = (CAN_SKIP && !t.NoSkip) || this.CanSkipDebug),
          (this.DisableInput = !0),
          (this.CanPause = !e),
          (this.IsAutoPlay = this.IsAutoPlayCache),
          (this.PlotLevel = "LevelC"),
          (this.ShouldSwitchMainRole = t.IsSwitchMainRole),
          (this.PauseTime = !e),
          (this.SkipTalkWhenFighting = !1),
          PlotController_1.PlotController.TogglePlotProtect(!0);
        break;
      case "LevelD":
        (this.CameraMode = 1),
          (this.CanInteractive = !1),
          (this.CanSkip = !1),
          (this.DisableInput = !1),
          (this.CanPause = !1),
          (this.IsAutoPlay = !0),
          (this.ShouldSwitchMainRole = !1),
          (this.PlotLevel = "LevelD"),
          (this.PauseTime = !1),
          (this.SkipTalkWhenFighting = t.Interruptible),
          (this.SkipHiddenBlackScreenAtEnd = !0);
        break;
      case "Prompt":
        (this.CameraMode = 1),
          (this.CanInteractive = !1),
          (this.CanSkip = !1),
          (this.DisableInput = !1),
          (this.CanPause = !1),
          (this.IsAutoPlay = this.IsAutoPlayCache),
          (this.PlotLevel = "Prompt"),
          (this.PauseTime = !1),
          (this.SkipTalkWhenFighting = t.Interruptible),
          (this.SkipHiddenBlackScreenAtEnd = !0);
    }
  }
}
exports.PlotConfig = PlotConfig;
class PlotModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.IsInPlot = !1),
      (this.IsInInteraction = !1),
      (this.IsBackInteractionAfterFlow = !1),
      (this.CurrentInteractEntity = void 0),
      (this.PlotStartFrame = 0),
      (this.FlowListName = ""),
      (this.IsServerNotify = !1),
      (this.IsAsync = !1),
      (this.PlotConfig = new PlotConfig()),
      (this.PlotResult = new PlotData_1.PlotResultInfo()),
      (this.TmpPlotResult = new PlotData_1.PlotResultInfo()),
      (this.N$i = void 0),
      (this.PlotPendingList = new Array()),
      (this.GrayOptionMap = new Map()),
      (this.CurContext = void 0),
      (this.O$i = !1),
      (this.k$i = void 0),
      (this.jZ = void 0),
      (this.WZ = void 0),
      (this.F$i = void 0),
      (this.PlotTemplate = new PlotTemplate_1.PlotTemplate()),
      (this.KeepBgAudio = !1),
      (this.V$i = !1),
      (this.CenterText = new PlotData_1.PlotCenterText()),
      (this.H$i = !1),
      (this.PlotGlobalConfig = new PlotGlobalConfig_1.PlotGlobalConfig()),
      (this.PlotTextReplacer = new PlotTextReplacer_1.PlotTextReplacer()),
      (this.PlotWeather = new PlotWeather_1.PlotWeather()),
      (this.PlotTimeOfDay = new PlotTimeOfDay_1.PlotTimeOfDay()),
      (this.PlotCleanRange = new PlotCleanRange_1.PlotCleanRange()),
      (this.InteractController = void 0),
      (this.IsGmCanSkip = !1),
      (this.IsMuteAllPlot = !1),
      (this.IsChangeLevelCToLevelB = !1),
      (this.IsFadeIn = !1),
      (this.BlackScreenType = void 0),
      (this.IsShowingHeadIcon = !1),
      (this.PlayFlow = void 0),
      (this.HangViewHud = !1),
      (this.HasSetRender = !1),
      (this.HasSetGameBudget = !1),
      (this.CurTalkItem = void 0),
      (this.CurShowTalk = void 0),
      (this.GoBattleMaterial = void 0),
      (this.InSeamlessFormation = !1),
      (this.IsTipsViewShowed = !1),
      (this.OptionEnable = !1),
      (this.OnShowCenterTextFinished = () => {
        (this.PlayFlow = void 0),
          ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted &&
            (ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted.SetResult(
              !0,
            ),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "Teleport",
              46,
              "ModelManager.TeleportModel!.CgTeleportCompleted!.SetResult(true)",
            );
      });
  }
  OnInit() {
    return (
      (this.PlotConfig.IsAutoPlay = !0),
      (this.IsInPlot = !1),
      (this.IsInInteraction = !1),
      (this.IsBackInteractionAfterFlow = !1),
      (this.V$i = !1),
      this.PlotGlobalConfig.Init(),
      this.PlotWeather.Init(),
      !0
    );
  }
  OnClear() {
    return this.PlotTextReplacer.Clear(), this.PlotWeather.Clear(), !0;
  }
  CheckCanPlayNow(t) {
    if (t.StateActions) {
      if (!this.IsInPlot) return !0;
      this.PendingPlot(t),
        (this.PlotConfig.PlotLevel === "LevelD" ||
          (this.PlotConfig.PlotLevel === "Prompt" &&
            t.PlotLevel !== "LevelD" &&
            t.PlotLevel !== "Prompt")) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Plot",
              27,
              "打断当前DE级剧情",
              ["Level", this.PlotConfig.PlotLevel],
              ["FlowIncId", this.PlotResult.FlowIncId],
              ["FlowListName", this.PlotResult.FlowListName],
              ["FlowId", this.PlotResult.FlowId],
              ["PlotState", this.PlotResult.StateId],
            ),
          this.IsServerNotify
            ? ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
                "被别的剧情打断当前的D级剧情",
                !1,
              )
            : ControllerHolder_1.ControllerHolder.FlowController.FinishFlow(
                "客户端剧情被新的剧情中断",
              ));
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Plot",
          7,
          "[PlotModel.PlotSetupHandle] 无法找到对应剧情状态",
          ["PlotStateId", t.StateId],
        );
    return !1;
  }
  IsInHighLevelPlot() {
    return (
      this.IsInPlot &&
      this.PlotConfig.PlotLevel !== "LevelD" &&
      this.PlotConfig.PlotLevel !== "Prompt"
    );
  }
  IsInSequencePlot() {
    return (
      this.IsInPlot &&
      (this.PlotConfig.PlotLevel === "LevelA" ||
        this.PlotConfig.PlotLevel === "LevelB")
    );
  }
  PendingPlot(e) {
    for (let t = this.PlotPendingList.length - 1; t >= 0; t--) {
      const i = this.PlotPendingList[t];
      if (i.PlotLevel === "LevelD")
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Plot",
            27,
            "缓存队列中的D级剧情被中断/后台播放",
            ["FlowIncId", i.FlowIncId],
            ["FlowListName", i.FlowListName],
            ["FlowId", i.FlowId],
            ["PlotState", i.StateId],
            ["IsServer", i.IsServerNotify],
          );
      else {
        if (
          i.PlotLevel !== "Prompt" ||
          (e.PlotLevel !== "LevelA" &&
            e.PlotLevel !== "LevelB" &&
            e.PlotLevel !== "LevelC")
        )
          break;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Plot",
            27,
            "缓存队列中的E级剧情被中断/后台播放",
            ["FlowIncId", i.FlowIncId],
            ["FlowListName", i.FlowListName],
            ["FlowId", i.FlowId],
            ["PlotState", i.StateId],
            ["IsServer", i.IsServerNotify],
          );
      }
      i.IsServerNotify ? (i.IsBackground = !0) : this.PlotPendingList.pop();
    }
    this.PlotPendingList.push(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Plot",
          27,
          "剧情被缓存",
          ["FlowIncId", e.FlowIncId],
          ["FlowListName", e.FlowListName],
          ["FlowId", e.FlowId],
          ["PlotState", e.StateId],
        );
  }
  SetPendingPlotState(t, e, i, o) {
    for (const s of this.PlotPendingList)
      if (s.FlowIncId === t)
        return (
          (s.IsBackground = i), (s.IsBreakdown = e), (s.IsServerEnd = o), !0
        );
    return !1;
  }
  CenterTextTransition(t, e) {
    this.H$i === t
      ? e && e()
      : (this.H$i = t)
        ? LevelLoadingController_1.LevelLoadingController.OpenLoading(
            11,
            3,
            () => {
              PlotController_1.PlotController.ClearUi(),
                UiManager_1.UiManager.OpenView("PlotTransitionView", void 0, e);
            },
            0.5,
          )
        : UiManager_1.UiManager.CloseView("PlotTransitionView", () => {
            LevelLoadingController_1.LevelLoadingController.CloseLoading(
              11,
              e,
              0.5,
            );
          });
  }
  ShowTalkCenterText(t, e) {
    t
      ? ((this.CenterText.Text = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(
          t.TidTalk,
        )),
        (this.CenterText.AudioId = t.PlayVoice ? t.TidTalk : ""),
        (this.CenterText.Config = t.CenterTextConfig),
        (this.CenterText.AutoClose = !0),
        (this.CenterText.TalkAkEvent = t.TalkAkEvent),
        (this.CenterText.UniversalTone = t.UniversalTone),
        (this.CenterText.Callback = e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.UpdatePlotCenterText,
        ))
      : e();
  }
  ShowCenterText(t, e) {
    t &&
      ((this.CenterText.Text = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(
        t.TidCenterText,
      )),
      (this.CenterText.AudioId = ""),
      (this.CenterText.Config = t),
      (this.CenterText.AutoClose = !0),
      (this.CenterText.Callback = e),
      PlotController_1.PlotController.HandleShowCenterText(!1));
  }
  ShowCenterTextForTeleport(t) {
    let e;
    this.PlayFlow &&
      (e =
        PlotController_1.PlotController.GetTalkItemsOfCenterTextForTeleport()) &&
      ((this.CenterText.Text =
        PublicUtil_1.PublicUtil.GetFlowConfigLocalText(e)),
      (this.CenterText.Callback = t),
      PlotController_1.PlotController.HandleShowCenterText(!1));
  }
  ApplyPlotConfig(t = !1) {
    this.W$i(),
      this.K$i(),
      this.Q$i(t),
      this.X$i(),
      this.$$i(),
      this.Y$i(),
      this.J$i(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlotConfigChanged,
      );
  }
  Y$i() {
    this.PlotConfig.PlotLevel === "LevelC"
      ? this.SetRender(!0)
      : this.SetRender(!1);
  }
  SetRender(t) {
    this.HasSetRender !== t &&
      ((this.HasSetRender = t)
        ? GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
            .GetCurrentQualityInfo()
            .SetSequenceFrameRateLimit()
        : GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
            .GetCurrentQualityInfo()
            .CancleSequenceFrameRateLimit());
  }
  J$i() {
    this.PlotConfig.PlotLevel !== "LevelD" && this.SetInPlotGameBudget(!0);
  }
  SetInPlotGameBudget(t) {
    this.HasSetGameBudget !== t &&
      ((this.HasSetGameBudget = t),
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetPlotMode(
        t,
      ));
  }
  K$i() {
    this.PlotTimeOfDay.OnPlotStart(this.PlotConfig.PauseTime);
  }
  IsInTemplate() {
    return this.PlotTemplate.IsInTemplate;
  }
  FinishTemplate() {
    this.PlotTemplate.IsInTemplate &&
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Plot",
          27,
          "没有配置关闭模板，已做保底处理，请策划修改",
          ["FlowListName", this.PlotResult.FlowListName],
          ["FlowId", this.PlotResult.FlowId],
          ["PlotState", this.PlotResult.StateId],
        ),
      this.PlotTemplate.EndTemplateNew());
  }
  SetTemplatePlayerTransform(t) {
    this.PlotTemplate.IsInTemplate &&
      this.PlotTemplate.SetTemplatePlayerTransform(t);
  }
  StartPlotTemplate(t, e, i) {
    this.PlotTemplate.StartTemplateNew(t, e, i);
  }
  SetPlotTemplate(t, e) {
    this.PlotTemplate.SetTemplateNew(t).finally(e);
  }
  EndPlotTemplate(t, e) {
    this.PlotTemplate.EndTemplateNew(t).finally(e);
  }
  SetActorName(t) {
    this.PlotTemplate.IsInTemplate && this.PlotTemplate.SetActorName(t);
  }
  PlayCameraAnim(t) {
    this.PlotTemplate.IsInTemplate &&
      this.PlotConfig.CameraMode === 3 &&
      this.PlotTemplate.PlayCameraAnimCompatible(t);
  }
  W$i() {
    let t;
    this.PlotConfig.PlotLevel !== "LevelD" &&
      Global_1.Global.BaseCharacter &&
      (t =
        Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(
          33,
        ))?.Valid &&
      t.StopAllSkills("PlotModel.StopMainCharacterSkill");
  }
  X$i() {
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  SwitchCameraMode(t) {
    (this.PlotConfig.CameraMode = t), this.Q$i();
  }
  Q$i(t = !1) {
    if (GlobalData_1.GlobalData.World)
      switch (this.PlotConfig.CameraMode) {
        case 0:
          var e =
            CameraController_1.CameraController.SequenceCamera.GetComponent(10);
          e?.GetIsInCinematic() && e.StopSequence(),
            e?.ResetCameraRatioSetting();
          break;
        case 1:
          CameraController_1.CameraController.ExitDialogMode(),
            CameraController_1.CameraController.ExitCameraMode(1, 0, 0, 0);
          break;
        case 2:
          CameraController_1.CameraController.EnterDialogueMode(
            ControllerHolder_1.ControllerHolder.FlowController.GetInteractPoint(),
            t,
          ),
            CameraController_1.CameraController.ExitCameraMode(1, 0, 0, 0);
          break;
        case 3:
          CameraController_1.CameraController.ExitDialogMode(),
            CameraController_1.CameraController.EnterCameraMode(1, 0, 0, 0);
      }
  }
  $$i() {
    this.PlotConfig.PlotLevel === "LevelD"
      ? this.ResetAudioState()
      : ((this.V$i = !0),
        AudioSystem_1.AudioSystem.SetState(
          AudioDefine_1.STATEGROUP,
          AudioDefine_1.STATEINCUTSCENE,
        )),
      this.PlotConfig.PlotLevel &&
        AudioSystem_1.AudioSystem.SetState(
          AUDIO_STATE_PLOT_LEVEL_GROUP,
          audioStatePlotLevel[this.PlotConfig.PlotLevel],
        );
  }
  ResetAudioState() {
    this.V$i &&
      ((this.V$i = !1),
      AudioSystem_1.AudioSystem.SetState(
        AudioDefine_1.STATEGROUP,
        AudioDefine_1.STATENORMAL,
      )),
      AudioSystem_1.AudioSystem.SetState(
        AUDIO_STATE_PLOT_LEVEL_GROUP,
        AUDIO_STATE_NOT_PLOT,
      ),
      AudioSystem_1.AudioSystem.PostEvent(PLOT_END_AUDIO_EVENT);
  }
  MarkGrayOption(t, e) {
    this.GrayOptionMap.has(t) || this.GrayOptionMap.set(t, new Set());
    t = this.GrayOptionMap.get(t);
    t.has(e) || t.add(e);
  }
  IsOptionGray(t, e) {
    return !!this.GrayOptionMap.has(t) && !!this.GrayOptionMap.get(t).has(e);
  }
  CheckOptionCondition(t, e) {
    if (!t.PreCondition) return !0;
    let i = !1;
    return (i = t.PreCondition.Type === "PreOption" ? this.z$i(t, e) : i);
  }
  z$i(t, e) {
    let i = !0;
    for (const s of t.PreCondition.PreOptions) {
      const o = this.GrayOptionMap.get(e.Id);
      i = i && !!o && o.has(s);
    }
    return i;
  }
  GetOptionIndex(t, e) {
    return (
      this.CurShowTalk?.TalkItems.find((t) => t.Id === e)?.Options?.indexOf(
        t,
      ) ?? -1
    );
  }
  SaveCharacterLockOn() {
    let t;
    this.Z$i() &&
      ((t = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
      EntitySystem_1.EntitySystem.Get(t)
        ?.GetComponent(185)
        ?.HasTag(-1150819426)) &&
      (this.O$i = !0);
  }
  RevertCharacterLockOn() {
    this.O$i && ((this.O$i = !1), this.Z$i()?.EnterLockDirection());
  }
  Z$i() {
    let t = Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint();
    if (t) {
      t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(29);
      if (t?.Valid) return t;
    }
  }
  ClearContext() {
    this.CurContext?.Release(), (this.CurContext = void 0);
  }
  HandlePlayMontage(t) {
    this.N$i || (this.N$i = new PlotMontage_1.PlotMontage()),
      this.N$i.StopAllMontage(!1),
      this.N$i.StartPlayMontage(t);
  }
  FinishMontage() {
    this.N$i && this.N$i.StopAllMontage();
  }
  InitPlotTemplate() {
    this.k$i = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(
      IGlobal_1.globalConfig.FlowTemplateCameraConfigPath,
    );
    PublicUtil_1.PublicUtil.IsUseTempData() ||
      (t = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfigTemp.FlowTemplateCameraConfigPath,
      ));
    let e = (0, puerts_1.$ref)("");
    if (
      (UE.KuroStaticLibrary.LoadFileToString(e, t),
      (e = (0, puerts_1.$unref)(e)))
    )
      for (const i of JSON.parse(e).List) this.k$i.set(i.Id, i);
  }
  InitMontageConfig() {
    this.jZ = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(
      IGlobal_1.globalConfig.MontageConfigPath,
    );
    PublicUtil_1.PublicUtil.IsUseTempData() ||
      (t = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfigTemp.MontageConfigPath,
      ));
    let e = (0, puerts_1.$ref)("");
    if (
      (UE.KuroStaticLibrary.LoadFileToString(e, t),
      (e = (0, puerts_1.$unref)(e)))
    )
      for (const i of JSON.parse(e).Montages) this.jZ.set(i.Id, i);
  }
  GetMontageConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if ((this.jZ || (this.jZ = new Map()), !this.jZ.get(t))) {
        let e =
          ConfigManager_1.ConfigManager.PlotMontageConfig.GetPlotMontageConfig(
            t,
          );
        if (!e) return;
        e = {
          Id: e.Id,
          ActionMontage: e.ActionMontage,
          ExpressionMontage: e.ExpressionMontage,
          MouthSequence: e.MouthSequence,
        };
        this.jZ.set(t, e);
      }
    } else this.jZ || this.InitMontageConfig();
    return this.jZ.get(t);
  }
  QZ() {
    this.WZ = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(
      IGlobal_1.globalConfig.AbpMontageConfigPath,
    );
    PublicUtil_1.PublicUtil.IsUseTempData() ||
      (t = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfigTemp.AbpMontageConfigPath,
      ));
    let e = (0, puerts_1.$ref)("");
    if (
      (UE.KuroStaticLibrary.LoadFileToString(e, t),
      (e = (0, puerts_1.$unref)(e)))
    )
      for (const i of JSON.parse(e).Montages) this.WZ.set(i.Id, i);
  }
  GetAbpMontageConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if ((this.WZ || (this.WZ = new Map()), !this.WZ.get(t))) {
        let e =
          ConfigManager_1.ConfigManager.PlotMontageConfig.GetPlotAbpMontageConfig(
            t,
          );
        if (!e) return;
        e = {
          Id: e.Id,
          ActionMontage: e.Montage,
          ExpressionMontage: "",
          MouthSequence: "",
        };
        this.WZ.set(t, e);
      }
    } else this.WZ || this.QZ();
    return this.WZ.get(t);
  }
  eYi() {
    this.F$i = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(
      IGlobal_1.globalConfig.AbpOverlayMontageConfigPath,
    );
    PublicUtil_1.PublicUtil.IsUseTempData() ||
      (t = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfigTemp.AbpOverlayMontageConfigPath,
      ));
    let e = (0, puerts_1.$ref)("");
    if (
      (UE.KuroStaticLibrary.LoadFileToString(e, t),
      (e = (0, puerts_1.$unref)(e)))
    )
      for (const i of JSON.parse(e).Montages) this.F$i.set(i.Id, i);
  }
  GetOverlayAbpMontageConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if ((this.F$i || (this.F$i = new Map()), !this.F$i.get(t))) {
        let e =
          ConfigManager_1.ConfigManager.PlotMontageConfig.GetOverlayAbpMontageConfig(
            t,
          );
        if (!e) return;
        e = {
          Id: e.Id,
          ActionMontage: e.Montage,
          ExpressionMontage: "",
          MouthSequence: "",
        };
        this.F$i.set(t, e);
      }
    } else this.F$i || this.eYi();
    return this.F$i.get(t);
  }
  GetPlotTemplateConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if ((this.k$i || (this.k$i = new Map()), !this.k$i.get(t))) {
        let e =
          ConfigManager_1.ConfigManager.CameraTemplateConfig.GetCameraTemplateConfig(
            t,
          );
        if (!e) return;
        e = {
          Id: e.Id,
          Name: e.Name,
          Amount: e.Amount,
          Enable: e.Enable,
          Template: e.Template,
          CameraType: e.CameraType,
          ActorDataArray: JSON.parse(e.ActorDataArray),
          CameraData: JSON.parse(e.CameraData),
        };
        this.k$i.set(t, e);
      }
    } else this.k$i || this.InitPlotTemplate();
    return this.k$i.get(t);
  }
}
exports.PlotModel = PlotModel;
// # sourceMappingURL=PlotModel.js.map
