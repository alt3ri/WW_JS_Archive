"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadSkillButtonPanel = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputController_1 = require("../../../../Input/InputController");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BattleSkillCombineItem_1 = require("../BattleSkillCombineItem");
const BattleSkillGamepadItem_1 = require("../BattleSkillGamepadItem");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
const MAIN_KEY_NUM = 4;
class GamepadSkillButtonPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.YJe = void 0),
      (this.JJe = []),
      (this.zJe = void 0),
      (this.ZJe = (t) => {
        this.eze();
      }),
      (this.tze = () => {
        this.ize();
      }),
      (this.oze = () => {
        this.zJe.RefreshButtonData(), this.eze();
      }),
      (this.rze = (t, e) => {
        this.Visible &&
          (t = this.nze(t)) &&
          t.GetSkillButtonData() &&
          t.RefreshEnable();
      }),
      (this.sze = (t) => {
        t = this.nze(t);
        t
          ? (t.RefreshVisible(), t.RefreshKey())
          : (this.zJe.RefreshButtonData(), this.eze());
      }),
      (this.aze = (t) => {
        const e = this.nze(t);
        e ? e.GetSkillButtonData() && e.RefreshDynamicEffect() : this.hze(t);
      }),
      (this.lze = (t) => {
        let e;
        const i =
          ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
            t,
          );
        i && ((e = this.nze(t)) ? e.Refresh(i) : this._ze(t));
      }),
      (this.uze = (t) => {
        t = this.nze(t);
        t && t.RefreshAttribute(!0);
      }),
      (this.cze = (t) => {
        t = this.nze(t);
        t && (t.RefreshSkillIcon(), t.RefreshSkillName());
      }),
      (this.mze = (t) => {
        const e = this.nze(t);
        e ? e.RefreshSkillCoolDown() : this._ze(t);
      }),
      (this.dze = (t) => {
        for (const e of this.JJe) e.PauseGame(t);
      }),
      (this.Cze = (t) => {
        t === 101 &&
          (this.zJe.RefreshButtonData(),
          this.zJe.RefreshAimButtonVisible(),
          this.eze());
      }),
      (this.kJe = () => {
        for (const t of this.JJe) t.RefreshTimeDilation();
      }),
      (this.dKe = (t, e, i) => {
        this.SetVisible(
          5,
          ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
        ),
          this.eze();
      }),
      (this.gze = (t) => {
        this.eze(), this.fze(), this.pze(t), this.vze();
      }),
      (this.bMe = (i, t) => {
        if (t === 0 && i !== InputMappingsDefine_1.actionMappings.攻击) {
          let t = void 0;
          let e = !1;
          if (i === InputMappingsDefine_1.actionMappings.手柄主攻击) t = 4;
          else if (i === InputMappingsDefine_1.actionMappings.手柄副攻击) {
            if (!this.zJe.IsAim()) return;
            (t = 11), (e = !0);
          } else t = this.zJe.GetButtonTypeByActionName(i);
          this.nze(t)?.OnInputAction(e);
        }
      }),
      (this.Mze = (t, e) => {
        this.Sze() &&
          InputController_1.InputController.InputAxis(
            InputEnums_1.EInputAxis.LookUp,
            -e,
          );
      }),
      (this.Eze = (t, e) => {
        this.Sze() &&
          InputController_1.InputController.InputAxis(
            InputEnums_1.EInputAxis.Turn,
            e,
          );
      }),
      (this.yze = (t) => {
        t === "InteractionHintView" && this.Ize();
      }),
      (this.$Ge = (t) => {
        t === "InteractionHintView" && this.Ize();
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
    this.zJe = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
  }
  async InitializeAsync() {
    await this.Tze(),
      await this.NewAllBattleSkillItems(),
      this.Lze(),
      this.eze(),
      this.fze(),
      this.Ize();
  }
  Reset() {
    (this.JJe.length = 0), super.Reset();
  }
  OnAfterShow() {
    for (const t of this.JJe) t.RefreshEnable(!0);
  }
  OnShowBattleChildViewPanel() {
    for (const t of this.JJe) t.RefreshSkillCoolDownOnShow();
    this.vze();
  }
  OnTickBattleChildViewPanel(t) {
    if (this.Visible) for (const e of this.JJe) e.Tick(t);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSkillButtonDataRefresh,
      this.ZJe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonDataClear,
        this.tze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
        this.oze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonEnableRefresh,
        this.rze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonVisibleRefresh,
        this.sze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh,
        this.aze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
        this.lze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonAttributeRefresh,
        this.uze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonIconPathRefresh,
        this.cze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillButtonCdRefresh,
        this.mze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh,
        this.Cze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PauseGame,
        this.dze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.kJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharSkillCdPauseStateChanged,
        this.kJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnViewDone,
        this.yze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiPressCombineButtonChanged,
        this.gze,
      ),
      InputDistributeController_1.InputDistributeController.BindActions(
        this.zJe.GetAllActionNameList(),
        this.bMe,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.MoveForward,
        this.Mze,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.MoveRight,
        this.Eze,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSkillButtonDataRefresh,
      this.ZJe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonDataClear,
        this.tze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
        this.oze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonEnableRefresh,
        this.rze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonVisibleRefresh,
        this.sze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonDynamicEffectRefresh,
        this.aze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
        this.lze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonAttributeRefresh,
        this.uze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonIconPathRefresh,
        this.cze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillButtonCdRefresh,
        this.mze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBehaviorButtonVisibleRefresh,
        this.Cze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PauseGame,
        this.dze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.kJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharSkillCdPauseStateChanged,
        this.kJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnViewDone,
        this.yze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiPressCombineButtonChanged,
        this.gze,
      ),
      InputDistributeController_1.InputDistributeController.UnBindActions(
        this.zJe.GetAllActionNameList(),
        this.bMe,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.MoveForward,
        this.Mze,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.MoveRight,
        this.Eze,
      );
  }
  Lze() {
    this.SetVisible(5, ModelManager_1.ModelManager.PlatformModel.IsGamepad()),
      this.zJe.RefreshInteractBehaviorData(),
      this.zJe.RefreshAimState();
  }
  eze() {
    this.Dze(), this.Rze(), this.vze(), this.hze(7);
  }
  Dze() {
    const e = ModelManager_1.ModelManager.SkillButtonUiModel;
    const i = this.zJe.CurButtonTypeList;
    for (let t = 0; t < MAIN_KEY_NUM; t++) {
      var s;
      const n = i[t];
      const h = this.JJe[t];
      n
        ? (s = e.GetSkillButtonDataByButton(n))
          ? s.GetSkillId() && s.IsVisible()
            ? h.Refresh(s)
            : h.Refresh(void 0)
          : (s = this.zJe.GetBehaviorButtonDataByButtonType(n))?.IsVisible
            ? h.RefreshByBehaviorButtonData(s)
            : h.Refresh(void 0)
        : h.Refresh(void 0);
    }
  }
  Rze() {
    const e = ModelManager_1.ModelManager.SkillButtonUiModel;
    const i = this.zJe.CurButtonTypeList;
    for (let t = MAIN_KEY_NUM; t < this.JJe.length; t++) {
      var s;
      const n = i[t];
      const h = this.JJe[t];
      n
        ? (s = e.GetSkillButtonDataByButton(n))
          ? s.GetSkillId()
            ? h.Refresh(s)
            : h.Deactivate()
          : ((s = this.zJe.GetBehaviorButtonDataByButtonType(n)),
            h.RefreshByBehaviorButtonData(s))
        : h.Deactivate();
    }
  }
  vze() {
    const e = ModelManager_1.ModelManager.SkillButtonUiModel;
    const i = this.zJe.CurButtonTypeList;
    const s = this.zJe.MainSkillCombineButtonTypeList;
    for (let t = 0; t < MAIN_KEY_NUM; t++) {
      let n = i[t];
      const h = s[t];
      const _ = this.JJe[t];
      h && n !== h
        ? (n = e.GetSkillButtonDataByButton(h))
          ? _.RefreshSecondCd(n)
          : _.RefreshSecondCd(void 0)
        : _.RefreshSecondCd(void 0);
    }
  }
  ize() {
    for (const t of this.JJe) t.Deactivate();
  }
  async NewAllBattleSkillItems() {
    var t = void 0;
    var t = [
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
        t = await this.Uze(t, e);
        t.IsMainButton || t.SetKeyName(this.zJe.ButtonKeyList[e]);
      }),
    );
  }
  async Tze() {
    const t = this.GetItem(8)?.GetOwner();
    t &&
      ((this.YJe = new BattleSkillCombineItem_1.BattleSkillCombineItem()),
      await this.YJe.CreateByActorAsync(t));
  }
  async Uze(t, e) {
    t = await this.NewStaticChildViewAsync(
      t,
      BattleSkillGamepadItem_1.BattleSkillGamepadItem,
      e,
    );
    return (t.GamepadData = this.zJe), (this.JJe[e] = t);
  }
  Aze(t) {
    return this.JJe[t];
  }
  nze(t) {
    t =
      ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData.CurButtonTypeList.indexOf(
        t,
      );
    if (!(t < 0)) return this.Aze(t);
  }
  _ze(t) {
    let e;
    this.zJe.GetIsPressCombineButton() ||
      ((e = this.zJe.MainSkillCombineButtonTypeList.indexOf(t)) >= 0 &&
        ((e = this.Aze(e)),
        (t =
          ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
            t,
          )),
        e?.RefreshSecondCd(t)));
  }
  hze(t) {
    t === 7 &&
      (!(this.zJe.MainSkillButtonTypeList.indexOf(t) > 0) &&
      this.zJe.MainSkillCombineButtonTypeList.indexOf(t) >= 0
        ? ((t =
            ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
              t,
            )),
          this.YJe?.RefreshDynamicEffect(t))
        : this.YJe?.RefreshDynamicEffect(void 0));
  }
  fze() {
    this.YJe?.SetVisible(!this.zJe.GetIsPressCombineButton());
  }
  pze(t) {
    if (t)
      for (let t = 0; t < MAIN_KEY_NUM; t++)
        this.zJe.MainSkillCombineButtonTypeList[t] !==
          this.zJe.MainSkillButtonTypeList[t] &&
          this.JJe[t].PlayPressCombineButtonSeq();
    else
      for (let t = 0; t < MAIN_KEY_NUM; t++)
        this.JJe[t].PlayReleaseCombineButtonSeq();
  }
  Sze() {
    return (
      ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
      this.zJe.ControlCameraByMoveAxis
    );
  }
  Ize() {
    this.zJe.RefreshInteractBehaviorData();
    const t = this.nze(104);
    t && (t.IsMainButton || t.RefreshVisible(), t.RefreshEnable());
  }
}
exports.GamepadSkillButtonPanel = GamepadSkillButtonPanel;
// # sourceMappingURL=GamepadSkillButtonPanel.js.map
