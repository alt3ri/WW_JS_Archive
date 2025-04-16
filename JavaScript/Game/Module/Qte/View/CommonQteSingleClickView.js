"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonQteSingleClickView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  CommonQteSingleClickContext_1 = require("../CommonQte/CommonQteSingleClickContext"),
  CommonQteViewBase_1 = require("./CommonQteViewBase");
class CommonQteSingleClickView extends CommonQteViewBase_1.CommonQteViewBase {
  constructor() {
    super(...arguments),
      (this.Qtt = void 0),
      (this.xpc = void 0),
      (this.OOi = void 0),
      (this.d5l = void 0),
      (this.DOt = void 0),
      (this.NUi = void 0),
      (this.SPe = void 0),
      (this.Upc = void 0),
      (this.NTe = 0),
      (this.NQa = !1),
      (this.FQa = ""),
      (this.iIl = -1),
      (this.HC1 = void 0),
      (this.kpc = !1),
      (this.$xt = (t) => {
        "Start" === t
          ? this.IsQteEnd ||
            (this.SPe?.PlayLevelSequenceByName("Loop"),
            !this.IsQtePause && 0 < this.NTe
              ? this.FOi("Loop", 1 / this.NTe)
              : this.FOi("Loop", 0),
            this.IsMobile || this.xpc?.SetUIActive(!0),
            (this.IsQteStart = !0),
            (this.IsQteInteractive = !0))
          : ("Success" !== t && "Fail" !== t) ||
            UiManager_1.UiManager.CloseView("CommonQteView");
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
          ])
        : (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIItem],
            [2, UE.UIItem],
            [3, UE.UISprite],
            [4, UE.UIButtonComponent],
            [5, UE.UIItem],
          ]);
  }
  async OnBeforeStartAsync() {
    var t;
    !this.IsMobile &&
      ((this.Qtt = new CombineKeyItem_1.CombineKeyItem()),
      (t = this.GetItem(2))) &&
      (await this.Qtt?.CreateByActorAsync(t.GetOwner()));
  }
  OnStart() {
    super.OnStart(),
      this.IsMobile
        ? ((this.OOi = this.GetItem(0)),
          (this.d5l = this.GetButton(1)),
          (this.DOt = this.GetSprite(2)),
          (this.NUi = this.GetItem(3)))
        : ((this.OOi = this.GetItem(0)),
          (this.d5l = this.GetButton(4)),
          (this.DOt = this.GetSprite(3)),
          (this.xpc = this.GetItem(1)),
          this.xpc?.SetUIActive(!1),
          (this.NUi = this.GetItem(5))),
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
    t instanceof CommonQteSingleClickContext_1.CommonQteSingleClickContext &&
      ((this.iIl = t.HandleId),
      (i = (this.HC1 = t).GetAction()) &&
        ((this.FQa = i), this.Qtt?.RefreshAction(i), this.Qtt?.Show()),
      (this.NTe = Math.max(0, t.Duration * TimeUtil_1.TimeUtil.Millisecond)),
      (this.IsQteInteractive = !1),
      (this.kpc = !1),
      (i = t.GetUiConfig()) &&
        ((this.IsQteInteractive = 0 === i.InteractiveTiming),
        (this.kpc = i.IsShowBorder)),
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
      this.SPe?.PlayLevelSequenceByName("Start"),
      this.kpc &&
        (this.NUi?.SetUIActive(!0), this.Upc?.PlayLevelSequenceByName("Start")),
      this.HQa(),
      ControllerHolder_1.ControllerHolder.CommonQteController.SetExpiredTimer(
        this.HC1,
      ));
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
      this.HC1.Response();
  }
  HandleQteEnd() {
    this.IsQteEnd ||
      ((this.IsQteEnd = !0),
      this.IsMobile || this.xpc?.SetUIActive(!1),
      this.SPe?.StopCurrentSequence(),
      this.HC1?.IsSuccess()
        ? this.SPe?.PlayLevelSequenceByName("Success")
        : this.SPe?.PlayLevelSequenceByName("Fail"),
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
  OnQtePause() {
    this.jQa(),
      this.IsQtePlayStart && !this.IsQteStart
        ? this.FOi("Start", 0)
        : this.IsQteStart && this.FOi("Loop", 0),
      this.HC1 &&
        ControllerHolder_1.ControllerHolder.CommonQteController.PauseQte(
          this.HC1.HandleId,
        );
  }
  OnQteResume() {
    this.IsQtePlayStart && this.HQa(),
      this.IsQtePlayStart
        ? this.IsQteStart
          ? 0 < this.NTe
            ? this.FOi("Loop", 1 / this.NTe)
            : this.FOi("Loop", 0)
          : this.FOi("Start", 1)
        : this.PlayQteStart(),
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
exports.CommonQteSingleClickView = CommonQteSingleClickView;
//# sourceMappingURL=CommonQteSingleClickView.js.map
