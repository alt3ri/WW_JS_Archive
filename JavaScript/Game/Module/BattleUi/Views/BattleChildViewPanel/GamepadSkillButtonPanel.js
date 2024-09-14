"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadSkillButtonPanel = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputController_1 = require("../../../../Input/InputController"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  BattleSkillCombineItem_1 = require("../BattleSkillCombineItem"),
  BattleSkillDpadItem_1 = require("../BattleSkillDpadItem"),
  BattleSkillGamepadItem_1 = require("../BattleSkillGamepadItem"),
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
      (this.kKa = Stats_1.Stat.Create(
        "[GamepadSkillButton]OnInputCombineButton",
      )),
      (this.hZe = void 0),
      (this.G7a = void 0),
      (this.lZe = []),
      (this.k7a = void 0),
      (this.N7a = void 0),
      (this.F7a = !1),
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
        this.Visible &&
          (t = this.fZe(t)) &&
          t.GetSkillButtonData() &&
          t.RefreshEnable();
      }),
      (this.pZe = (t) => {
        t = this.fZe(t);
        t
          ? (t.RefreshVisible(), t.RefreshKey())
          : (this._Ze.RefreshButtonData(), this.cZe());
      }),
      (this.vZe = (t) => {
        t = this.fZe(t);
        t && t.GetSkillButtonData() && t.RefreshDynamicEffect();
      }),
      (this.EZe = (t) => {
        var e =
          ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
            t,
          );
        e && (t = this.fZe(t)) && t.Refresh(e);
      }),
      (this.yZe = (t) => {
        t = this.fZe(t);
        t && t.RefreshAttribute(!0);
      }),
      (this.IZe = (t) => {
        t = this.fZe(t);
        t && (t.RefreshSkillIcon(), t.RefreshSkillName());
      }),
      (this.TZe = (t) => {
        t = this.fZe(t);
        t && t.RefreshSkillCoolDown();
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
          : this.SetVisible(5, !1);
      }),
      (this.RZe = (t) => {
        this.kKa.Start();
        var e = this.F7a;
        this.cZe(),
          this.UZe(),
          this.AZe(t),
          e !== this.F7a &&
            (this.N7a.StopCurrentSequence(),
            this.N7a.PlaySequencePurely(this.F7a ? "Show" : "Hide")),
          this.kKa.Stop();
      }),
      (this.Rja = () => {
        this.Uja();
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
        this.wZe() &&
          InputController_1.InputController.InputAxis(
            InputEnums_1.EInputAxis.LookUp,
            -e,
          );
      }),
      (this.BZe = (t, e) => {
        this.wZe() &&
          InputController_1.InputController.InputAxis(
            InputEnums_1.EInputAxis.Turn,
            e,
          );
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
    ];
  }
  InitializeTemp() {
    this._Ze = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
  }
  async InitializeAsync() {
    await this.GZe(),
      await this.V7a(),
      await this.NewAllBattleSkillItems(),
      this.H7a(),
      this.NZe(),
      this.cZe(),
      this.UZe(),
      this.qZe(),
      this.nit(),
      this.Uja();
  }
  Reset() {
    (this.lZe.length = 0),
      this.k7a?.Clear(),
      (this.k7a = void 0),
      this.N7a?.Clear(),
      (this.N7a = void 0),
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
        this.Rja,
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
        this.Rja,
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
  H7a() {
    for (const e of this.lZe) {
      var t;
      e.IsSubButton &&
        ((t = e.GetInputIndex() - MAIN_HALF_NUM),
        e.SetKeyName(this._Ze.ButtonKeyList[t]));
    }
  }
  cZe() {
    Info_1.Info.IsInGamepad() &&
      (this.Let.Start(), this.OZe(), this.j7a(), this.kZe(), this.Let.Stop());
  }
  OZe() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel,
      i = this._Ze.CurButtonTypeList;
    for (let t = 0; t < SUB_KEY_START_INDEX; t++) {
      var s,
        n = i[t],
        h = this.lZe[t];
      n
        ? (s = e.GetSkillButtonDataByButton(n))
          ? s.GetSkillId() && s.IsVisible()
            ? h.Refresh(s)
            : h.Refresh(void 0)
          : (s = this._Ze.GetBehaviorButtonDataByButtonType(n))?.IsVisible
            ? h.RefreshByBehaviorButtonData(s)
            : h.Refresh(void 0)
        : h.Refresh(void 0);
    }
  }
  j7a() {
    this.F7a = !1;
    for (let t = 0; t < LEFT_KEY_NUM; t++)
      this.lZe[t + LEFT_KEY_START_INDEX].IsVisible()
        ? (this.G7a.SetArrowVisible(t, !0), (this.F7a = !0))
        : this.G7a.SetArrowVisible(t, !1);
    this.G7a?.SetBgVisible(this.F7a);
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
  async V7a() {
    var t = this.GetItem(15)?.GetOwner();
    t &&
      ((this.G7a = new BattleSkillDpadItem_1.BattleSkillDpadItem()),
      await this.G7a.CreateThenShowByActorAsync(t));
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
  UZe() {
    this.hZe?.SetVisible(!this._Ze.GetIsPressCombineButton());
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
      this.k7a.StopCurrentSequence(),
        this.k7a.PlaySequencePurely("SkillASHide");
    } else {
      for (let t = 0; t < MAIN_HALF_NUM; t++)
        this.lZe[t].PlayReleaseCombineButtonSeq();
      this.k7a.StopCurrentSequence(),
        this.k7a.PlaySequencePurely("SkillASShow");
    }
  }
  Uja() {
    ModelManager_1.ModelManager.BattleUiModel?.ChatScrollViewVisible
      ? this.GetItem(10)?.SetAnchorOffsetX(593)
      : this.GetItem(10)?.SetAnchorOffsetX(393);
  }
  wZe() {
    return Info_1.Info.IsInGamepad() && this._Ze.ControlCameraByMoveAxis;
  }
  qZe() {
    this._Ze.RefreshInteractBehaviorData();
    var t = this.fZe(104);
    t && (t.IsMainButton || t.RefreshVisible(), t.RefreshEnable());
  }
  nit() {
    (this.k7a = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(4))),
      (this.N7a = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(10),
      ));
  }
}
exports.GamepadSkillButtonPanel = GamepadSkillButtonPanel;
//# sourceMappingURL=GamepadSkillButtonPanel.js.map
