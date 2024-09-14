"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonPanel = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
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
      (this.lZe = []),
      (this.Tet = new Map()),
      (this.Let = Stats_1.Stat.Create(
        "[SkillButton]RefreshAllBattleSkillItem",
      )),
      (this.Det = void 0),
      (this.$Qe = !1),
      (this.Ret = (t) => {
        if (t) for (const e of this.lZe) e.RefreshEnable(!0);
      }),
      (this.RQe = (t, e) => {
        10031 === t && this.Uet(102)?.SetActive(e);
      }),
      (this.uZe = (t) => {
        3 !== t && 2 !== t && (this.cZe(), this.Aet());
      }),
      (this.mZe = () => {
        this.dZe();
      }),
      (this.CZe = () => {
        this.cZe(), this.Aet();
      }),
      (this.gZe = (t, e) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t && t.GetSkillButtonData() && t.RefreshEnable();
      }),
      (this.pZe = (t) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t &&
          t.GetSkillButtonData() &&
          (t.RefreshVisible(),
          t.RefreshKey(),
          Info_1.Info.IsInTouch() || this.Aet());
      }),
      (this.vZe = (t) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t && t.GetSkillButtonData() && t.RefreshDynamicEffect();
      }),
      (this.EZe = (t) => {
        var e =
          ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonDataByButton(
            t,
          );
        e &&
          (t = this.GetBattleSkillItemByButtonType(t)) &&
          (e.GetSkillId() ? t.Refresh(e) : t.Deactivate(),
          Info_1.Info.IsInTouch() || this.Aet());
      }),
      (this.yZe = (t) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t && t.RefreshAttribute(!0);
      }),
      (this.IZe = (t) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t && (t.RefreshSkillIcon(), t.RefreshSkillName());
      }),
      (this.TZe = (t) => {
        t = this.GetBattleSkillItemByButtonType(t);
        t && t.RefreshSkillCoolDown();
      }),
      (this.DZe = (t) => {
        t = this.Uet(t);
        t && t.RefreshVisible();
      }),
      (this.Pet = () => {
        this.xet();
      }),
      (this.xie = (t, e) => {
        SkillButtonPanel.kQe.Start(),
          this.wet(),
          this.xet(),
          SkillButtonPanel.kQe.Stop();
      }),
      (this.LZe = (t) => {
        for (const e of this.lZe) e.PauseGame(t);
      }),
      (this.zze = () => {
        for (const t of this.lZe) t.RefreshTimeDilation();
      }),
      (this.XBo = () => {
        Info_1.Info.IsInGamepad()
          ? this.SetVisible(5, !1)
          : (this.SetVisible(5, !0), this.cZe(), this.Aet());
      }),
      (this.bet = (t) => {
        ModelManager_1.ModelManager.SkillButtonUiModel.IsNormalButtonTypeList &&
          !ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.IsPhantom() &&
          this.$Qe !== t &&
          this.qet(t, !0);
      }),
      (this.bMe = (t, e) => {
        if (0 === e)
          if (t === InputMappingsDefine_1.actionMappings.瞄准)
            this.Tet.get(101)?.OnInputAction();
          else if (t === InputMappingsDefine_1.actionMappings.锁定目标)
            this.Tet.get(102)?.OnInputAction();
          else
            for (const s of this.lZe) {
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
    await Promise.all([this.NewAllBattleSkillItems(), this.Oet()]),
      this.SetVisible(5, !Info_1.Info.IsInGamepad()),
      this.cZe(),
      this.wet(),
      this.xet(),
      this.Aet();
  }
  Reset() {
    (this.lZe.length = 0), super.Reset(), (this.Det = void 0);
  }
  OnAfterShow() {
    for (const t of this.lZe) t.RefreshEnable(!0);
    for (const e of this.Tet.values()) e.UpdateAlpha();
  }
  OnHideBattleChildViewPanel() {
    for (const t of this.lZe) t.IsShowOrShowing && t.TryReleaseButton();
  }
  OnShowBattleChildViewPanel() {
    for (const t of this.lZe) t.RefreshSkillCoolDownOnShow();
  }
  OnTickBattleChildViewPanel(t) {
    if (this.Visible) for (const e of this.lZe) e.Tick(t);
  }
  cZe() {
    if (!Info_1.Info.IsInGamepad()) {
      this.Let.Start();
      var e = ModelManager_1.ModelManager.SkillButtonUiModel,
        i = e.GetButtonTypeList();
      for (let t = 0; t < this.lZe.length; t++) {
        var s = i[t],
          n = this.lZe[t],
          h = e.GetSkillButtonDataByButton(s);
        h
          ? s && !(s < 0) && h.GetSkillId()
            ? n.Refresh(h)
            : n.Deactivate()
          : n.Deactivate();
      }
      this.Let.Stop();
    }
  }
  dZe() {
    for (const t of this.lZe) t.Deactivate();
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
    await Promise.all(t.map(async (t, e) => this.FZe(t, e, i)));
  }
  async FZe(t, e, i) {
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
      this.lZe.push(s),
      s
    );
  }
  VZe(t) {
    return this.lZe[t];
  }
  GetBattleSkillItemByButtonType(t) {
    t =
      ModelManager_1.ModelManager.SkillButtonUiModel.GetSkillButtonIndexByButton(
        t,
      );
    if (!(t < 0)) return this.VZe(t);
  }
  async Oet() {
    var t,
      e,
      i = this.GetOperationType();
    2 === i
      ? ((t = this.GetItem(6)),
        (e = this.GetItem(7)),
        await Promise.all([
          this.ket(
            t.GetOwner(),
            101,
            InputEnums_1.EInputAction[InputEnums_1.EInputAction.瞄准],
            !0,
          ),
          this.ket(
            e.GetOwner(),
            102,
            InputEnums_1.EInputAction[InputEnums_1.EInputAction.锁定目标],
          ),
        ]))
      : 1 === i &&
        ((t = this.GetItem(8)),
        (e = this.GetItem(7)),
        await Promise.all([
          this.ket(t.GetOwner(), 101, void 0, !0),
          this.ket(e.GetOwner(), 102),
        ]));
  }
  async ket(t, e, i, s = !1) {
    (i = { InputActionType: e, ActionName: i, IsToggle: s }),
      (s = await this.NewStaticChildViewAsync(
        t,
        BehaviorButton_1.BehaviorButton,
        i,
      ));
    return this.Tet.set(e, s), s;
  }
  wet() {
    var t = ModelManager_1.ModelManager.SkillButtonUiModel;
    for (const i of this.Tet.values()) {
      var e = t.GetBehaviorButtonDataByButton(i.BehaviorType);
      i.Refresh(e);
    }
  }
  xet() {
    var t,
      e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    e?.Valid &&
      ((e = e.Entity.GetComponent(161).DirectionState),
      (t = this.Uet(101)) &&
        (e === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
          ? t.SetBehaviorToggleState(1)
          : t.SetBehaviorToggleState(0)),
      (t = this.Uet(102))) &&
      (e === CharacterUnifiedStateTypes_1.ECharDirectionState.LockDirection
        ? t.SetBehaviorToggleState(1)
        : t.SetBehaviorToggleState(0));
  }
  Uet(t) {
    return this.Tet.get(t);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
      this.Ret,
    ),
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
        EventDefine_1.EEventName.OnAimStateChanged,
        this.Pet,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
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
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiExploreModeChanged,
        this.bet,
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
      this.Ret,
    ),
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
        EventDefine_1.EEventName.OnAimStateChanged,
        this.Pet,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
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
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiExploreModeChanged,
        this.bet,
      ),
      2 === this.GetOperationType() &&
        InputDistributeController_1.InputDistributeController.UnBindActions(
          actionNameList,
          this.bMe,
        );
  }
  Aet() {
    var t =
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetIsInExploreMode();
    if (
      ModelManager_1.ModelManager.SkillButtonUiModel.IsNormalButtonTypeList ||
      ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.IsPhantom()
    )
      return this.$Qe === t && Info_1.Info.IsInTouch()
        ? void 0
        : void this.qet(t);
    this.$Qe && this.qet(!1);
  }
  qet(t, e = !1) {
    var i = !(this.$Qe = t);
    this.Tet.get(101)?.SetVisibleByExploreMode(i, e),
      this.Tet.get(102)?.SetVisibleByExploreMode(i, e),
      this.lZe[1]?.SetVisibleByExploreMode(i, e),
      this.lZe[2]?.SetVisibleByExploreMode(i, e),
      Info_1.Info.IsInTouch()
        ? this.lZe[4]?.SetVisibleByExploreMode(i, e)
        : (this.lZe[3]?.SetVisibleByExploreMode(i, e), this.Fet(t, e));
  }
  Fet(t, e = !1) {
    let i = INIT_OFFSET_X;
    if (t) {
      let e = 0;
      for (let t = 1; t < 4; t++) this.lZe[t].IsShowOrShowing && e++;
      i += e * ITEM_WIDTH;
    }
    e
      ? (this.Det
          ? this.Det.Stop()
          : (this.Det = this.RootActor.GetComponentByClass(
              UE.LGUIPlayTweenComponent.StaticClass(),
            )),
        ((t = this.Det.GetPlayTween()).from = this.RootItem.GetAnchorOffsetX()),
        (t.to = i),
        this.Det.Play())
      : (this.Det && this.Det.Stop(), this.RootItem?.SetAnchorOffsetX(i));
  }
}
(exports.SkillButtonPanel = SkillButtonPanel).kQe = Stats_1.Stat.Create(
  "[ChangeRole]SkillButtonPanel",
);
//# sourceMappingURL=SkillButtonPanel.js.map
