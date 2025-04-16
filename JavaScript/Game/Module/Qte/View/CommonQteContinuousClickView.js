"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonQteContinuousClickView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../Ui/UiManager"),
  InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CommonQteContinuousClickContext_1 = require("../CommonQte/CommonQteContinuousClickContext"),
  CommonQteViewBase_1 = require("./CommonQteViewBase");
class CommonQteContinuousClickView extends CommonQteViewBase_1.CommonQteViewBase {
  constructor() {
    super(...arguments),
      (this.OOi = void 0),
      (this.d5l = void 0),
      (this.DOt = void 0),
      (this.NUi = void 0),
      (this.wOi = void 0),
      (this.kC1 = void 0),
      (this.qT1 = void 0),
      (this.SPe = void 0),
      (this.Upc = void 0),
      (this.OC1 = !1),
      (this.NTe = 0),
      (this.qC1 = !1),
      (this.GC1 = 0),
      (this.FC1 = 0),
      (this.NC1 = -1),
      (this.VC1 = !1),
      (this.jC1 = ""),
      (this.NQa = !1),
      (this.FQa = ""),
      (this.iIl = -1),
      (this.HC1 = void 0),
      (this.kpc = !1),
      (this.$xt = (t) => {
        "Start" === t
          ? this.IsQteEnd ||
            (this.OC1 &&
              (this.SPe?.PlayLevelSequenceByName("Loop"),
              !this.IsQtePause && 0 < this.NTe
                ? this.FOi("Loop", 1 / this.NTe)
                : this.FOi("Loop", 0)),
            this.qC1 &&
              (this.SPe?.PlayLevelSequenceByName("Charge"),
              this.$C1("Charge", !1),
              this.HC1) &&
              ((this.FC1 = this.HC1.CurrentEnergyPercent / 100),
              (this.GC1 = this.FC1),
              this.WC1("Charge", this.GC1)),
            (this.IsQteStart = !0),
            (this.IsQteInteractive = !0))
          : ("Success" !== t && "Fail" !== t) ||
            UiManager_1.UiManager.CloseView("CommonQteContinuousClickView");
      }),
      (this.BOi = (t, i) => {
        this.IsValidInput()
          ? 0 === i && this.bOi()
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效");
      }),
      (this.jj_ = (t, i) => {
        Info_1.Info.IsInGamepad() &&
          ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData
            ?.SwitchInteractData.IsSwitchInteractOpen &&
          2 ===
            ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData
              ?.SwitchInteractData.State &&
          this.FQa === InputMappingsDefine_1.actionMappings.幻象1 &&
          (this.IsValidInput()
            ? 0 === i && this.bOi()
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效"));
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.IsMobile
        ? (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIButtonComponent],
            [2, UE.UISprite],
            [3, UE.UIItem],
            [4, UE.UIItem],
            [5, UE.UIText],
          ])
        : (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIButtonComponent],
            [2, UE.UISprite],
            [3, UE.UIItem],
            [4, UE.UIItem],
            [5, UE.UIText],
            [6, UE.UIItem],
          ]);
  }
  async OnBeforeStartAsync() {
    var t;
    !this.IsMobile &&
      ((this.qT1 = new InputMultiKeyItem_1.InputMultiKeyItem()),
      (t = this.GetItem(6))) &&
      (await this.qT1?.CreateByActorAsync(t.GetOwner()));
  }
  OnStart() {
    super.OnStart(),
      this.IsMobile,
      (this.OOi = this.GetItem(0)),
      (this.d5l = this.GetButton(1)),
      (this.DOt = this.GetSprite(2)),
      (this.NUi = this.GetItem(3)),
      (this.wOi = this.GetItem(4)),
      (this.kC1 = this.GetText(5)),
      this.d5l?.OnPointDownCallBack.Bind(() => {
        this.qOi();
      }),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi)),
      this.SPe.BindSequenceCloseEvent(this.$xt),
      (this.Upc = new LevelSequencePlayer_1.LevelSequencePlayer(this.NUi)),
      this.OOi?.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(),
      !this.IsQteEnd &&
        this.HC1?.IsActive() &&
        ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(
          this.HC1.HandleId,
        ),
      this.jQa(),
      this.d5l?.OnPointDownCallBack.Unbind(),
      this.SPe?.Clear(),
      this.Upc?.Clear(),
      (this.HC1 = void 0),
      (this.iIl = -1),
      (this.FQa = "");
  }
  SetQteContext(t) {
    var i;
    t instanceof
      CommonQteContinuousClickContext_1.CommonQteContinuousClickContext &&
      ((this.iIl = t.HandleId),
      (i = (this.HC1 = t).GetAction()) &&
        ((this.FQa = i),
        this.IsMobile ||
          ((i = { ActionOrAxisName: this.FQa }),
          this.qT1?.RefreshByActionOrAxis(i),
          this.qT1?.Show())),
      (this.NTe = Math.max(0, t.Duration * TimeUtil_1.TimeUtil.Millisecond)),
      (this.OC1 = !1),
      (this.qC1 = !0),
      (this.IsQteInteractive = !1),
      (this.kpc = !1),
      (i = t.GetUiConfig()) &&
        ((this.IsQteInteractive = 0 === i.InteractiveTiming),
        (this.kpc = i.IsShowBorder),
        (this.VC1 = i.IsShowTip),
        (this.jC1 = i.TipTextId),
        0 < i.PerformInterpSpeedForEnergyPercent
          ? (this.NC1 =
              i.PerformInterpSpeedForEnergyPercent /
              100 /
              TimeUtil_1.TimeUtil.InverseMillisecond)
          : (this.NC1 = -1)),
      (i = ModelManager_1.ModelManager.CommonQteModel?.GetQteIcon(t.QteId))
        ? (this.DOt?.SetSprite(i, !1), this.DOt?.SetUIActive(!0))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("CommonQte", 67, "获取Qte图标失败", [
            "QteId",
            t.QteId,
          ]),
      this.qpc(),
      this.SetQteActive(t));
  }
  PlayQteStart() {
    this.IsQteActive &&
      !this.IsQteEnd &&
      !this.IsQtePause &&
      this.HC1 &&
      ((this.IsQtePlayStart = !0),
      this.OOi?.SetUIActive(!0),
      this.QC1("Start"),
      this.kpc &&
        (this.NUi?.SetUIActive(!0), this.Upc?.PlayLevelSequenceByName("Start")),
      this.VC1
        ? (LguiUtil_1.LguiUtil.SetLocalTextNew(this.kC1, this.jC1),
          this.wOi?.SetUIActive(!0))
        : this.wOi?.SetUIActive(!1),
      this.HQa(),
      ControllerHolder_1.ControllerHolder.CommonQteController.SetExpiredTimer(
        this.HC1,
      ));
  }
  QC1(t) {
    var i =
      this.SPe?.GetSequencePlayContext(t)?.PlayInfo?.LevelSequence
        .AssetPathName;
    i && !FNameUtil_1.FNameUtil.IsNothing(i) && i.toString().length
      ? this.SPe?.PlayLevelSequenceByName(t)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "CommonQte",
            39,
            "Qte缺少生命周期Sequence",
            ["SequenceName", t],
            ["QteId", this.HC1?.QteId],
          ),
        TimerSystem_1.TimerSystem.Next(() => {
          this.SPe && this.$xt?.(t);
        }));
  }
  CommonQteEnd(t) {
    this.iIl === t && this.HandleQteEnd();
  }
  RefreshOnBattleUiVisibleChanged() {
    var t;
    2 !== this.HC1?.Source &&
      3 !== this.HC1?.Source &&
      ((t =
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
          20,
        )),
      this.SetActive(t));
  }
  HQa() {
    this.NQa ||
      ((this.NQa = !0), this.IsMobile) ||
      (InputDistributeController_1.InputDistributeController.BindActionIgnoreLimit(
        this.FQa,
        this.BOi,
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CommonQte", 67, "通用QTE绑定Action", [
          "Action",
          this.FQa,
        ]),
      this.FQa === InputMappingsDefine_1.actionMappings.幻象1 &&
        InputDistributeController_1.InputDistributeController.BindActionIgnoreLimit(
          InputMappingsDefine_1.actionMappings.通用交互,
          this.jj_,
        ));
  }
  jQa() {
    this.NQa &&
      ((this.NQa = !1),
      this.IsMobile ||
        (InputDistributeController_1.InputDistributeController.UnBindActionIgnoreLimit(
          this.FQa,
          this.BOi,
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("CommonQte", 67, "通用QTE解绑Action", [
            "Action",
            this.FQa,
          ]),
        this.FQa === InputMappingsDefine_1.actionMappings.幻象1 &&
          InputDistributeController_1.InputDistributeController.UnBindActionIgnoreLimit(
            InputMappingsDefine_1.actionMappings.通用交互,
            this.jj_,
          )));
  }
  qOi() {
    this.IsValidInput()
      ? this.bOi()
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效");
  }
  bOi() {
    this.HC1 &&
      this.HC1.IsActive() &&
      this.HC1.IsPending() &&
      (this.HC1.Response(),
      this.qC1 && ((this.GC1 = this.FC1), this.WC1("Charge", this.GC1)),
      this.SPe?.PlayLevelSequenceByName("Press")),
      this.VC1 && this.wOi?.SetUIActive(!1);
  }
  HandleQteEnd() {
    this.IsQteEnd ||
      ((this.IsQteEnd = !0),
      this.SPe?.StopCurrentSequence(),
      this.HC1?.IsSuccess() ? this.QC1("Success") : this.QC1("Fail"),
      this.kpc &&
        (this.Upc?.StopCurrentSequence(),
        this.Upc?.PlayLevelSequenceByName("Close")),
      this.jQa());
  }
  FOi(t, i) {
    this.OOi.GetOwner()
      .GetSequencePlayerByKey(t)
      ?.SequencePlayer?.SetPlayRate(i);
  }
  $C1(t, i) {
    t = this.OOi.GetOwner().GetSequencePlayerByKey(t)?.SequencePlayer;
    i ? t?.Play() : t?.Pause();
  }
  WC1(t, i) {
    var s,
      e,
      t = this.OOi.GetOwner().GetSequencePlayerByKey(t)?.SequencePlayer;
    t &&
      ((i =
        (e = (e = t.GetDuration().Time).FrameNumber.Value + e.SubFrame) *
        MathUtils_1.MathUtils.Clamp(i, 0, 1)),
      e < 1 ||
        e < i ||
        ((e = t.GetStartTime().Time),
        (s = t.GetEndTime().Time),
        (e = e.FrameNumber.Value + e.SubFrame),
        (s = s.FrameNumber.Value + s.SubFrame),
        (s =
          (i = MathUtils_1.MathUtils.Clamp(e + i, e, s)) - (e = Math.floor(i))),
        (i = new UE.FrameTime(new UE.FrameNumber(e), s)),
        (e = new UE.MovieSceneSequencePlaybackParams(i, 0, "", 0, 0)),
        t.SetPlaybackPosition(e)));
  }
  OnQtePause() {
    this.jQa(),
      this.OC1 && this.FOi("Loop", 0),
      this.HC1 &&
        ControllerHolder_1.ControllerHolder.CommonQteController.PauseQte(
          this.HC1.HandleId,
        );
  }
  OnQteResume() {
    this.IsQtePlayStart && this.HQa(),
      this.OC1 &&
        (0 < this.NTe ? this.FOi("Loop", 1 / this.NTe) : this.FOi("Loop", 0)),
      this.HC1 &&
        ControllerHolder_1.ControllerHolder.CommonQteController.ResumeQte(
          this.HC1.HandleId,
        );
  }
  OnTick(t) {
    !this.IsQteStart ||
      this.IsQteEnd ||
      this.IsQtePause ||
      (!this.HC1 || this.HC1.IsInvalid()
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "CommonQte",
              67,
              "Qte界面Context已无效, 强制关闭界面",
              ["State", this.HC1?.State],
            ),
          this.HandleQteEnd())
        : (this.HC1.UpdateTime(t),
          this.qC1 &&
            ((this.FC1 = this.HC1.CurrentEnergyPercent / 100),
            0 < this.NC1
              ? (this.GC1 = MathUtils_1.MathUtils.InterpConstantTo(
                  this.GC1,
                  this.FC1,
                  t,
                  this.NC1,
                ))
              : (this.GC1 = this.FC1),
            this.WC1("Charge", this.GC1)),
          ModelManager_1.ModelManager.CommonQteModel?.IsRefreshMode &&
            this.qpc()));
  }
  qpc() {
    var t;
    this.HC1 &&
      (t = this.HC1.GetUiConfig()?.UIConfig) &&
      (this.OOi.SetAnchorAlign(t.AnchorHAlign, t.AnchorVAlign),
      this.OOi.SetAnchorOffset(t.AnchorOffset));
  }
}
exports.CommonQteContinuousClickView = CommonQteContinuousClickView;
//# sourceMappingURL=CommonQteContinuousClickView.js.map
