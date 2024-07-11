"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonPanel = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  BattleSkillExploreItem_1 = require("../BattleSkillExploreItem"),
  BattleSkillItem_1 = require("../BattleSkillItem"),
  BehaviorButton_1 = require("../BehaviorButton"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
  INIT_OFFSET_X = -86,
  ITEM_WIDTH = 144,
  MOBILE_INDEX_EXPLORE_ITEM = 3,
  actionNameList = [
    InputMappingsDefine_1.actionMappings.大招,
    InputMappingsDefine_1.actionMappings.幻象1,
    InputMappingsDefine_1.actionMappings.幻象2,
    InputMappingsDefine_1.actionMappings.技能1,
    InputMappingsDefine_1.actionMappings.闪避,
    InputMappingsDefine_1.actionMappings.瞄准,
    InputMappingsDefine_1.actionMappings.锁定目标,
  ];
class SkillButtonPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.JJe = []),
      (this._Ze = new Map()),
      (this.uZe = void 0),
      (this.cZe = void 0),
      (this.GKe = !1),
      (this.mZe = (t) => {
        if (t) for (const e of this.JJe) e.RefreshEnable(!0);
      }),
      (this.gKe = (t, e) => {
        10031 === t && this.dZe(102)?.SetActive(e);
      }),
      (this.ZJe = (t) => {
        3 !== t && 2 !== t && (this.eze(), this.CZe());
      }),
      (this.tze = () => {
        this.ize();
      }),
      (this.oze = () => {
        this.eze(), this.CZe();
      }),
      (this.rze = (t, e) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t && t.GetSkillButtonData() && t.RefreshEnable();
      }),
      (this.sze = (t) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t &&
          t.GetSkillButtonData() &&
          (t.RefreshVisible(),
          t.RefreshKey(),
          ModelManager_1.ModelManager.PlatformModel.IsMobile() || this.CZe());
      }),
      (this.aze = (t) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t && t.GetSkillButtonData() && t.RefreshDynamicEffect();
      }),
      (this.lze = (t) => {
        var e =
          ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
            t,
          );
        e &&
          (t = this.GetBattleSkillItemByButtonType(t)) &&
          (e.GetSkillId() ? t.Refresh(e) : t.Deactivate(),
          ModelManager_1.ModelManager.PlatformModel.IsMobile() || this.CZe());
      }),
      (this.uze = (t) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t && t.RefreshAttribute(!0);
      }),
      (this.cze = (t) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t && (t.RefreshSkillIcon(), t.RefreshSkillName());
      }),
      (this.mze = (t) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t && t.RefreshSkillCoolDown();
      }),
      (this.Cze = (t) => {
        t = this.dZe(t);
        t && t.RefreshVisible();
      }),
      (this.gZe = () => {
        this.fZe();
      }),
      (this.xie = (t, e) => {
        this.pZe(), this.fZe();
      }),
      (this.dze = (t) => {
        for (const e of this.JJe) e.PauseGame(t);
      }),
      (this.kJe = () => {
        for (const t of this.JJe) t.RefreshTimeDilation();
      }),
      (this.dKe = (t, e, i) => {
        this.SetVisible(
          5,
          !ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
        ),
          this.eze(),
          this.CZe();
      }),
      (this.vZe = (t) => {
        if (t) for (const e of this.JJe) e.RefreshEnable(!0);
        else for (const i of this.JJe) i.DisableButton();
      }),
      (this.MZe = (t) => {
        ModelManager_1.ModelManager.SkillButtonUiModel.IsNormalButtonTypeList &&
          !ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.IsPhantom() &&
          this.GKe !== t &&
          this.SZe(t, !0);
      }),
      (this.bMe = (t, e) => {
        if (0 === e)
          if (t === InputMappingsDefine_1.actionMappings.瞄准)
            this._Ze.get(101)?.OnInputAction();
          else if (t === InputMappingsDefine_1.actionMappings.锁定目标)
            this._Ze.get(102)?.OnInputAction();
          else
            for (const s of this.JJe) {
              var i = s.GetSkillButtonData();
              if (i && i.GetActionName() === t) return void s.OnInputAction();
            }
      });
  }
  OnRegisterComponent() {
    switch (this.GetOperationType()) {
      case 2:
        this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIItem],
          [3, UE.UIItem],
          [4, UE.UIItem],
          [5, UE.UIItem],
          [6, UE.UIItem],
          [7, UE.UIItem],
        ];
        break;
      case 1:
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
        ];
    }
  }
  async InitializeAsync() {
    await Promise.all([this.NewAllBattleSkillItems(), this.EZe()]),
      this.SetVisible(
        5,
        !ModelManager_1.ModelManager.PlatformModel.IsGamepad(),
      ),
      this.eze(),
      this.pZe(),
      this.fZe(),
      this.CZe();
  }
  Reset() {
    (this.JJe.length = 0), super.Reset(), (this.cZe = void 0);
  }
  OnAfterShow() {
    for (const t of this.JJe) t.RefreshEnable(!0), t.UpdateAlpha();
    for (const e of this._Ze.values()) e.UpdateAlpha();
  }
  OnHideBattleChildViewPanel() {
    for (const t of this.JJe) t.IsShowOrShowing && t.TryReleaseButton();
  }
  OnShowBattleChildViewPanel() {
    for (const t of this.JJe) t.RefreshSkillCoolDownOnShow();
  }
  OnTickBattleChildViewPanel(t) {
    if (this.Visible) for (const e of this.JJe) e.Tick(t);
  }
  eze() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel,
      i = e.GetButtonTypeList();
    for (let t = 0; t < this.JJe.length; t++) {
      var s = i[t],
        n = this.JJe[t],
        h = e.GetSkillButtonDataByButton(s);
      h
        ? s && !(s < 0) && h.GetSkillId()
          ? n.Refresh(h)
          : n.Deactivate()
        : n.Deactivate();
    }
  }
  ize() {
    for (const t of this.JJe) t.Deactivate();
  }
  async NewAllBattleSkillItems() {
    let t = void 0;
    var e = this.GetOperationType();
    2 === e
      ? (t = [
          this.GetItem(0).GetOwner(),
          this.GetItem(1).GetOwner(),
          this.GetItem(2).GetOwner(),
          this.GetItem(3).GetOwner(),
          this.GetItem(4).GetOwner(),
          this.GetItem(5).GetOwner(),
        ])
      : 1 === e &&
        (t = [
          this.GetItem(0).GetOwner(),
          this.GetItem(1).GetOwner(),
          this.GetItem(2).GetOwner(),
          this.GetItem(3).GetOwner(),
          this.GetItem(4).GetOwner(),
          this.GetItem(5).GetOwner(),
          this.GetItem(6).GetOwner(),
          this.GetItem(9).GetOwner(),
          this.GetItem(10).GetOwner(),
        ]);
    const i = 1 === e;
    await Promise.all(t.map(async (t, e) => this.Uze(t, e, i)));
  }
  async Uze(t, e, i) {
    let s = void 0;
    return (
      (s =
        i && e === MOBILE_INDEX_EXPLORE_ITEM
          ? await this.NewStaticChildViewAsync(
              t,
              BattleSkillExploreItem_1.BattleSkillExploreItem,
              e,
            )
          : await this.NewStaticChildViewAsync(
              t,
              BattleSkillItem_1.BattleSkillItem,
              e,
            )),
      this.JJe.push(s),
      s
    );
  }
  Aze(t) {
    return this.JJe[t];
  }
  GetBattleSkillItemByButtonType(t) {
    t =
      ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonIndexByButton(
        t,
      );
    if (!(t < 0)) return this.Aze(t);
  }
  async EZe() {
    var t,
      e,
      i = this.GetOperationType();
    2 === i
      ? ((t = this.GetItem(6)),
        (e = this.GetItem(7)),
        await Promise.all([
          this.yZe(
            t.GetOwner(),
            101,
            InputEnums_1.EInputAction[InputEnums_1.EInputAction.瞄准],
            !0,
          ),
          this.yZe(
            e.GetOwner(),
            102,
            InputEnums_1.EInputAction[InputEnums_1.EInputAction.锁定目标],
          ),
        ]))
      : 1 === i &&
        ((t = this.GetItem(8)),
        (e = this.GetItem(7)),
        await Promise.all([
          this.yZe(t.GetOwner(), 101, void 0, !0),
          this.yZe(e.GetOwner(), 102),
        ]));
  }
  async yZe(t, e, i, s = !1) {
    (i = { InputActionType: e, ActionName: i, IsToggle: s }),
      (s = await this.NewStaticChildViewAsync(
        t,
        BehaviorButton_1.BehaviorButton,
        i,
      ));
    return this._Ze.set(e, s), s;
  }
  pZe() {
    var t = ModelManager_1.ModelManager.SkillButtonUiModel;
    for (const i of this._Ze.values()) {
      var e = t.GetBehaviorButtonDataByButton(i.BehaviorType);
      i.Refresh(e);
    }
  }
  fZe() {
    var t,
      e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    e?.Valid &&
      ((e = e.Entity.GetComponent(158).DirectionState),
      (t = this.dZe(101)) &&
        (e === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
          ? t.SetBehaviorToggleState(1)
          : t.SetBehaviorToggleState(0)),
      (t = this.dZe(102))) &&
      (e === CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection
        ? t.SetBehaviorToggleState(1)
        : t.SetBehaviorToggleState(0));
  }
  dZe(t) {
    return this._Ze.get(t);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
      this.mZe,
    ),
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
        EventDefine_1.EEventName.OnAimStateChanged,
        this.gZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
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
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
        this.vZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiExploreModeChanged,
        this.MZe,
      ),
      2 === this.GetOperationType() &&
        InputDistributeController_1.InputDistributeController.BindActions(
          actionNameList,
          this.bMe,
        );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
      this.mZe,
    ),
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
        EventDefine_1.EEventName.OnAimStateChanged,
        this.gZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
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
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
        this.vZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiExploreModeChanged,
        this.MZe,
      ),
      2 === this.GetOperationType() &&
        InputDistributeController_1.InputDistributeController.UnBindActions(
          actionNameList,
          this.bMe,
        );
  }
  CZe() {
    var t =
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetIsInExploreMode();
    if (
      ModelManager_1.ModelManager.SkillButtonUiModel.IsNormalButtonTypeList ||
      ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.IsPhantom()
    )
      return this.GKe === t &&
        ModelManager_1.ModelManager.PlatformModel.IsMobile()
        ? void 0
        : void this.SZe(t);
    this.GKe && this.SZe(!1);
  }
  SZe(t, e = !1) {
    var i = !(this.GKe = t);
    this._Ze.get(101)?.SetVisibleByExploreMode(i, e),
      this._Ze.get(102)?.SetVisibleByExploreMode(i, e),
      this.JJe[1]?.SetVisibleByExploreMode(i, e),
      this.JJe[2]?.SetVisibleByExploreMode(i, e),
      ModelManager_1.ModelManager.PlatformModel.IsMobile()
        ? this.JJe[4]?.SetVisibleByExploreMode(i, e)
        : (this.JJe[3]?.SetVisibleByExploreMode(i, e), this.IZe(t, e));
  }
  IZe(t, e = !1) {
    let i = INIT_OFFSET_X;
    if (t) {
      let e = 0;
      for (let t = 1; t < 4; t++) this.JJe[t].IsShowOrShowing && e++;
      i += e * ITEM_WIDTH;
    }
    e
      ? (this.cZe
          ? this.cZe.Stop()
          : (this.cZe = this.RootActor.GetComponentByClass(
              UE.LGUIPlayTweenComponent.StaticClass(),
            )),
        ((t = this.cZe.GetPlayTween()).from = this.RootItem.GetAnchorOffsetX()),
        (t.to = i),
        this.cZe.Play())
      : (this.cZe && this.cZe.Stop(), this.RootItem?.SetAnchorOffsetX(i));
  }
}
(exports.SkillButtonPanel = SkillButtonPanel).RKe = void 0;
//# sourceMappingURL=SkillButtonPanel.js.map
