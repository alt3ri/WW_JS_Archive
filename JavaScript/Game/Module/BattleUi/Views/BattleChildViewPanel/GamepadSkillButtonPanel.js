"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadSkillButtonPanel = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  BattleSkillCombineItem_1 = require("../BattleSkillCombineItem"),
  BattleSkillDpadItem_1 = require("../BattleSkillDpadItem"),
  BattleSkillGamepadItem_1 = require("../BattleSkillGamepadItem"),
  BattleSkillRouletteItem_1 = require("../BattleSkillRouletteItem"),
  BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
  MAIN_KEY_NUM = 8,
  MAIN_HALF_NUM = 4,
  LEFT_KEY_NUM = 4,
  SUB_KEY_NUM = 4,
  LEFT_KEY_START_INDEX = MAIN_KEY_NUM,
  SUB_KEY_START_INDEX = MAIN_KEY_NUM + LEFT_KEY_NUM,
  SUB_KEY_END_INDEX = SUB_KEY_START_INDEX + SUB_KEY_NUM;
class GamepadSkillButtonPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.Let = Stats_1.Stat.Create(
        "[GamepadSkillButton]RefreshAllBattleSkillItem",
      )),
      (this.nza = Stats_1.Stat.Create(
        "[GamepadSkillButton]OnInputCombineButton",
      )),
      (this.hZe = void 0),
      (this.NWa = void 0),
      (this.lZe = []),
      (this.Mah = void 0),
      (this.Eah = void 0),
      (this.VWa = void 0),
      (this.HWa = !1),
      (this._Ze = void 0),
      (this.uZe = (t) => {
        this.cZe();
      }),
      (this.mZe = () => {
        this.dZe();
      }),
      (this.CZe = () => {
        this._Ze.RefreshButtonData(), this.cZe();
      }),
      (this.gZe = (t, e) => {
        var i;
        this.Visible &&
          ((i = this.fZe(t))?.GetSkillButtonData() && i.RefreshEnable(),
          (i = this.Iah(t))?.GetSkillButtonData()) &&
          i.RefreshEnable();
      }),
      (this.pZe = (t) => {
        var e = this.fZe(t);
        e
          ? (e.RefreshVisible(),
            e.RefreshKey(),
            (e = this.Iah(t))?.GetSkillButtonData() &&
              (e.RefreshVisible(), e.RefreshKey()))
          : (this._Ze.RefreshButtonData(), this.cZe());
      }),
      (this.vZe = (t) => {
        var e = this.fZe(t),
          e =
            (e?.GetSkillButtonData() && e.RefreshDynamicEffect(), this.Iah(t));
        e?.GetSkillButtonData() && e.RefreshDynamicEffect();
      }),
      (this.EZe = (t) => {
        var e,
          i =
            ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
              t,
            );
        i &&
          ((e = this.fZe(t)) && e.Refresh(i),
          (e = this.Iah(t))?.SrcBehaviorButtonData
            ? e.RefreshByBehaviorButtonData(e.SrcBehaviorButtonData)
            : e?.BehaviorButtonData &&
              e.RefreshByBehaviorButtonData(e.BehaviorButtonData));
      }),
      (this.yZe = (t) => {
        var e = this.fZe(t),
          e = (e && e.RefreshAttribute(!0), this.Iah(t));
        e?.GetSkillButtonData() && e.RefreshAttribute(!0);
      }),
      (this.IZe = (t) => {
        var e = this.fZe(t),
          e = (e && (e.RefreshSkillIcon(), e.RefreshSkillName()), this.Iah(t));
        e?.GetSkillButtonData() && (e.RefreshSkillIcon(), e.RefreshSkillName());
      }),
      (this.TZe = (t) => {
        var e = this.fZe(t),
          e = (e && e.RefreshSkillCoolDown(), this.Iah(t));
        e?.GetSkillButtonData() && e.RefreshSkillCoolDown();
      }),
      (this.LZe = (t) => {
        for (const e of this.lZe) e.PauseGame(t);
      }),
      (this.DZe = (t) => {
        101 === t &&
          (this._Ze.RefreshButtonData(),
          this._Ze.RefreshAimButtonVisible(),
          this.cZe());
      }),
      (this.zze = () => {
        for (const t of this.lZe) t.RefreshTimeDilation();
      }),
      (this.XBo = () => {
        Info_1.Info.IsInGamepad()
          ? (this.SetVisible(5, !0), this.cZe())
          : (this.SetVisible(5, !1), this._Ze?.ClearInputAxis());
      }),
      (this.RZe = (t) => {
        this.nza.Start(),
          this.cZe(),
          this.UZe(),
          this.AZe(t),
          this.Tah(),
          this.nza.Stop();
      }),
      (this.HKa = () => {
        this.jKa();
      }),
      (this.Lah = () => {
        var t,
          e = this._Ze.SwitchInteractData.State;
        2 === e
          ? ((t = this.fZe(104)) &&
              t.BehaviorButtonData &&
              t.RefreshByBehaviorButtonData(t.BehaviorButtonData),
            this.Xlh())
          : 0 === e
            ? ((t = this.fZe(104)) &&
                t.SrcBehaviorButtonData &&
                t.RefreshByBehaviorButtonData(t.SrcBehaviorButtonData),
              this.Xlh())
            : 1 === e && this.fZe(104)?.PlaySwitchCd();
      }),
      (this.bMe = (i, t) => {
        if (0 === t && i !== InputMappingsDefine_1.actionMappings.攻击) {
          let t = void 0,
            e = !1;
          if (i === InputMappingsDefine_1.actionMappings.手柄主攻击) t = 4;
          else if (i === InputMappingsDefine_1.actionMappings.手柄副攻击) {
            if (!this._Ze.IsAim()) return;
            (t = 11), (e = !0);
          } else t = this._Ze.GetButtonTypeByActionName(i);
          this.fZe(t)?.OnInputAction(e);
        }
      }),
      (this.xZe = (t, e) => {
        Info_1.Info.IsInGamepad() &&
          this._Ze.CacheInputAxis(InputEnums_1.EInputAxis.MoveForward, e);
      }),
      (this.BZe = (t, e) => {
        Info_1.Info.IsInGamepad() &&
          this._Ze.CacheInputAxis(InputEnums_1.EInputAxis.MoveRight, e);
      }),
      (this.bZe = (t) => {
        "InteractionHintView" === t && this.qZe();
      }),
      (this.$Ge = (t) => {
        "InteractionHintView" === t && this.qZe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
    ];
  }
  InitializeTemp() {
    this._Ze = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
  }
  async InitializeAsync() {
    await this.GZe(),
      await this.jWa(),
      await this.yah(),
      await this.NewAllBattleSkillItems(),
      this.WWa(),
      this.NZe(),
      this.cZe(),
      this.UZe(),
      this.Tah(),
      this.qZe(),
      this.nit(),
      this.jKa();
  }
  Reset() {
    (this.lZe.length = 0),
      this.Eah?.Clear(),
      (this.Eah = void 0),
      this.VWa?.Clear(),
      (this.VWa = void 0),
      this._Ze?.ClearInputAxis(),
      super.Reset();
  }
  OnAfterShow() {
    for (const t of this.lZe) t.RefreshEnable(!0);
  }
  OnShowBattleChildViewPanel() {
    for (const t of this.lZe) t.RefreshSkillCoolDownOnShow();
  }
  OnTickBattleChildViewPanel(t) {
    if (this.Visible) for (const e of this.lZe) e.Tick(t);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSkillButtonDataRefresh,
      this.uZe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonDataClear,
        this.mZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
        this.CZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonEnableRefresh,
        this.gZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonVisibleRefresh,
        this.pZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh,
        this.vZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
        this.EZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonAttributeRefresh,
        this.yZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonIconPathRefresh,
        this.IZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonCdRefresh,
        this.TZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh,
        this.DZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PauseGame,
        this.LZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.zze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharSkillCdPauseStateChanged,
        this.zze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnViewDone,
        this.bZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiPressCombineButtonChanged,
        this.RZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiChatScrollViewVisibleChanged,
        this.HKa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiSwitchInteractStateChanged,
        this.Lah,
      ),
      InputDistributeController_1.InputDistributeController.BindActions(
        this._Ze.GetAllActionNameList(),
        this.bMe,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.MoveForward,
        this.xZe,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.MoveRight,
        this.BZe,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSkillButtonDataRefresh,
      this.uZe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonDataClear,
        this.mZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
        this.CZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonEnableRefresh,
        this.gZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonVisibleRefresh,
        this.pZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh,
        this.vZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
        this.EZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonAttributeRefresh,
        this.yZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonIconPathRefresh,
        this.IZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonCdRefresh,
        this.TZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh,
        this.DZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PauseGame,
        this.LZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.zze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharSkillCdPauseStateChanged,
        this.zze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnViewDone,
        this.bZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiPressCombineButtonChanged,
        this.RZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiChatScrollViewVisibleChanged,
        this.HKa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiSwitchInteractStateChanged,
        this.Lah,
      ),
      InputDistributeController_1.InputDistributeController.UnBindActions(
        this._Ze.GetAllActionNameList(),
        this.bMe,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.MoveForward,
        this.xZe,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.MoveRight,
        this.BZe,
      );
  }
  NZe() {
    this.SetVisible(5, Info_1.Info.IsInGamepad()),
      this._Ze.RefreshInteractBehaviorData(),
      this._Ze.RefreshAimState();
  }
  WWa() {
    for (const e of this.lZe) {
      var t;
      e.IsSubButton &&
        ((t = e.GetInputIndex() - MAIN_HALF_NUM),
        e.SetKeyName(this._Ze.ButtonKeyList[t]));
    }
  }
  cZe() {
    Info_1.Info.IsInGamepad() &&
      (this.Let.Start(), this.OZe(), this.QWa(), this.kZe(), this.Let.Stop());
  }
  OZe() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel,
      i = this._Ze.CurButtonTypeList;
    for (let t = 0; t < SUB_KEY_START_INDEX; t++) {
      var s = i[t],
        n = this.lZe[t];
      if (s) {
        var h = e.GetSkillButtonDataByButton(s);
        if (!h) {
          s = this._Ze.GetBehaviorButtonDataByButtonType(s);
          if (s?.IsVisible) {
            n.RefreshByBehaviorButtonData(s);
            continue;
          }
        }
        this.Ylh(n, h);
      } else n.Refresh(void 0);
    }
  }
  Ylh(t, e) {
    e && e.GetSkillId() && e.IsVisible() ? t.Refresh(e) : t.Refresh(void 0);
  }
  QWa() {
    var t = this.HWa;
    this.HWa = !1;
    for (let t = 0; t < LEFT_KEY_NUM; t++)
      this.lZe[t + LEFT_KEY_START_INDEX].IsVisible()
        ? (this.NWa.SetArrowVisible(t, !0), (this.HWa = !0))
        : this.NWa.SetArrowVisible(t, !1);
    this.NWa?.SetBgVisible(this.HWa),
      t !== this.HWa &&
        this.VWa &&
        (this.VWa.StopCurrentSequence(),
        this.VWa.PlaySequencePurely(this.HWa ? "Show" : "Hide"));
  }
  kZe() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel,
      i = this._Ze.CurButtonTypeList;
    for (let t = SUB_KEY_START_INDEX; t < SUB_KEY_END_INDEX; t++) {
      var s,
        n = i[t],
        h = this.lZe[t];
      n
        ? (s = e.GetSkillButtonDataByButton(n))
          ? s.GetSkillId()
            ? h.Refresh(s)
            : h.Deactivate()
          : ((s = this._Ze.GetBehaviorButtonDataByButtonType(n)),
            h.RefreshByBehaviorButtonData(s))
        : h.Deactivate();
    }
  }
  dZe() {
    for (const t of this.lZe) t.Deactivate();
  }
  async NewAllBattleSkillItems() {
    var t = void 0,
      t = [
        this.GetItem(0).GetOwner(),
        this.GetItem(1).GetOwner(),
        this.GetItem(2).GetOwner(),
        this.GetItem(3).GetOwner(),
        this.GetItem(5).GetOwner(),
        this.GetItem(6).GetOwner(),
        this.GetItem(7).GetOwner(),
        this.GetItem(8).GetOwner(),
        this.GetItem(11).GetOwner(),
        this.GetItem(12).GetOwner(),
        this.GetItem(13).GetOwner(),
        this.GetItem(14).GetOwner(),
        this.GetItem(16).GetOwner(),
        this.GetItem(17).GetOwner(),
        this.GetItem(18).GetOwner(),
        this.GetItem(19).GetOwner(),
      ];
    await Promise.all(
      t.map(async (t, e) => {
        await this.FZe(t, e);
      }),
    );
  }
  async GZe() {
    var t = this.GetItem(9)?.GetOwner();
    t &&
      ((this.hZe = new BattleSkillCombineItem_1.BattleSkillCombineItem()),
      await this.hZe.CreateByActorAsync(t));
  }
  async jWa() {
    var t = this.GetItem(15)?.GetOwner();
    t &&
      ((this.NWa = new BattleSkillDpadItem_1.BattleSkillDpadItem()),
      await this.NWa.CreateThenShowByActorAsync(t));
  }
  async yah() {
    var t = this.GetItem(20)?.GetOwner();
    t &&
      ((this.Mah = new BattleSkillRouletteItem_1.BattleSkillRouletteItem()),
      await this.Mah.CreateThenShowByActorAsync(t));
  }
  async FZe(t, e) {
    t = await this.NewStaticChildViewAsync(
      t,
      BattleSkillGamepadItem_1.BattleSkillGamepadItem,
      e,
    );
    return (t.GamepadData = this._Ze), (this.lZe[e] = t);
  }
  VZe(t) {
    return this.lZe[t];
  }
  fZe(t) {
    t =
      ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData.CurButtonTypeList.indexOf(
        t,
      );
    if (!(t < 0)) return this.VZe(t);
  }
  Iah(t) {
    if (7 === t && this._Ze?.SwitchInteractData.IsSwitchInteractOpen)
      return this.fZe(104);
  }
  UZe() {
    this.hZe?.SetVisible(!this._Ze.GetIsPressCombineButton());
  }
  Tah() {
    this.Mah?.RefreshVisible();
  }
  AZe(t) {
    if (t) {
      for (let t = 0; t < MAIN_HALF_NUM; t++)
        0 !== this._Ze.MainSkillCombineButtonTypeList[t] &&
          this.lZe[t].PlayPressCombineButtonSeq();
      for (let t = LEFT_KEY_START_INDEX; t < SUB_KEY_START_INDEX; t++)
        this._Ze.DpadSkillCombineButtonTypeList[t] !==
          this._Ze.DpadSkillButtonTypeList[t] &&
          this.lZe[t].PlayPressCombineButtonSeq();
      this.Eah.StopTweenAnim(21), this.Eah.PlayTweenAnim(22);
    } else {
      for (let t = 0; t < MAIN_HALF_NUM; t++)
        this.lZe[t].PlayReleaseCombineButtonSeq();
      this.Eah.StopTweenAnim(22), this.Eah.PlayTweenAnim(21);
    }
  }
  jKa() {
    ModelManager_1.ModelManager.BattleUiModel?.ChatScrollViewVisible
      ? this.GetItem(10)?.SetAnchorOffsetX(593)
      : this.GetItem(10)?.SetAnchorOffsetX(393);
  }
  Xlh() {
    var t,
      e = this.fZe(7);
    e?.IsSecondButton &&
      ((t =
        ModelManager_1.ModelManager.SkillButtonUiModel?.GetSkillButtonDataByButton(
          7,
        )),
      this.Ylh(e, t));
  }
  qZe() {
    this._Ze.RefreshInteractBehaviorData();
    var t = this.fZe(104);
    t && (t.IsMainButton || t.RefreshVisible(), t.RefreshEnable());
  }
  nit() {
    (this.Eah = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer()),
      this.Eah.InitTweenAnim(21, this.GetItem(21)),
      this.Eah.InitTweenAnim(22, this.GetItem(22)),
      (this.VWa = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(10),
      ));
  }
}
exports.GamepadSkillButtonPanel = GamepadSkillButtonPanel;
//# sourceMappingURL=GamepadSkillButtonPanel.js.map
