"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadSkillButtonPanel = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputController_1 = require("../../../../Input/InputController"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  BattleSkillCombineItem_1 = require("../BattleSkillCombineItem"),
  BattleSkillGamepadItem_1 = require("../BattleSkillGamepadItem"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
  MAIN_KEY_NUM = 4;
class GamepadSkillButtonPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.hZe = void 0),
      (this.lZe = []),
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
        var e = this.fZe(t);
        e ? e.GetSkillButtonData() && e.RefreshDynamicEffect() : this.MZe(t);
      }),
      (this.EZe = (t) => {
        var e,
          i =
            ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
              t,
            );
        i && ((e = this.fZe(t)) ? e.Refresh(i) : this.SZe(t));
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
        var e = this.fZe(t);
        e ? e.RefreshSkillCoolDown() : this.SZe(t);
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
        this.SetVisible(5, Info_1.Info.IsInGamepad()), this.cZe();
      }),
      (this.RZe = (t) => {
        this.cZe(), this.UZe(), this.AZe(t), this.PZe();
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
    ];
  }
  InitializeTemp() {
    this._Ze = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
  }
  async InitializeAsync() {
    await this.GZe(),
      await this.NewAllBattleSkillItems(),
      this.NZe(),
      this.cZe(),
      this.UZe(),
      this.qZe();
  }
  Reset() {
    (this.lZe.length = 0), super.Reset();
  }
  OnAfterShow() {
    for (const t of this.lZe) t.RefreshEnable(!0);
  }
  OnShowBattleChildViewPanel() {
    for (const t of this.lZe) t.RefreshSkillCoolDownOnShow();
    this.PZe();
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
  cZe() {
    this.OZe(), this.kZe(), this.PZe(), this.MZe(7);
  }
  OZe() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel,
      i = this._Ze.CurButtonTypeList;
    for (let t = 0; t < MAIN_KEY_NUM; t++) {
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
  kZe() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel,
      i = this._Ze.CurButtonTypeList;
    for (let t = MAIN_KEY_NUM; t < this.lZe.length; t++) {
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
  PZe() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel,
      i = this._Ze.CurButtonTypeList,
      s = this._Ze.MainSkillCombineButtonTypeList;
    for (let t = 0; t < MAIN_KEY_NUM; t++) {
      var n = i[t],
        h = s[t],
        _ = this.lZe[t];
      h && n !== h
        ? (n = e.GetSkillButtonDataByButton(h))
          ? _.RefreshSecondCd(n)
          : _.RefreshSecondCd(void 0)
        : _.RefreshSecondCd(void 0);
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
        this.GetItem(4).GetOwner(),
        this.GetItem(5).GetOwner(),
        this.GetItem(6).GetOwner(),
        this.GetItem(7).GetOwner(),
      ];
    await Promise.all(
      t.map(async (t, e) => {
        t = await this.FZe(t, e);
        t.IsMainButton || t.SetKeyName(this._Ze.ButtonKeyList[e]);
      }),
    );
  }
  async GZe() {
    var t = this.GetItem(8)?.GetOwner();
    t &&
      ((this.hZe = new BattleSkillCombineItem_1.BattleSkillCombineItem()),
      await this.hZe.CreateByActorAsync(t));
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
  SZe(t) {
    var e;
    this._Ze.GetIsPressCombineButton() ||
      (0 <= (e = this._Ze.MainSkillCombineButtonTypeList.indexOf(t)) &&
        ((e = this.VZe(e)),
        (t =
          ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
            t,
          )),
        e?.RefreshSecondCd(t)));
  }
  MZe(t) {
    7 === t &&
      (!(0 < this._Ze.MainSkillButtonTypeList.indexOf(t)) &&
      0 <= this._Ze.MainSkillCombineButtonTypeList.indexOf(t)
        ? ((t =
            ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
              t,
            )),
          this.hZe?.RefreshDynamicEffect(t))
        : this.hZe?.RefreshDynamicEffect(void 0));
  }
  UZe() {
    this.hZe?.SetVisible(!this._Ze.GetIsPressCombineButton());
  }
  AZe(t) {
    if (t)
      for (let t = 0; t < MAIN_KEY_NUM; t++)
        this._Ze.MainSkillCombineButtonTypeList[t] !==
          this._Ze.MainSkillButtonTypeList[t] &&
          this.lZe[t].PlayPressCombineButtonSeq();
    else
      for (let t = 0; t < MAIN_KEY_NUM; t++)
        this.lZe[t].PlayReleaseCombineButtonSeq();
  }
  wZe() {
    return Info_1.Info.IsInGamepad() && this._Ze.ControlCameraByMoveAxis;
  }
  qZe() {
    this._Ze.RefreshInteractBehaviorData();
    var t = this.fZe(104);
    t && (t.IsMainButton || t.RefreshVisible(), t.RefreshEnable());
  }
}
exports.GamepadSkillButtonPanel = GamepadSkillButtonPanel;
//# sourceMappingURL=GamepadSkillButtonPanel.js.map
