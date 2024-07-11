"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CenterPanel = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const AlterMarksView_1 = require("../AlterMarksView");
const ExecutionPanel_1 = require("../Execution/ExecutionPanel");
const GrapplingHookPoint_1 = require("../GrapplingHookPoint/GrapplingHookPoint");
const Joystick_1 = require("../Joystick");
const ScanTrackedMarksView_1 = require("../ScanTrackedMarksView");
const TrackedMarksView_1 = require("../TrackedMarksView");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
const MoveSkillPanel_1 = require("./MoveSkillPanel");
const GRAPPING_HOOK_SKILL_ID = 100020;
const HOOK_PHANTOM_ID = 1001;
const forbidMoveTagId = 1616400338;
class CenterPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.hYe = void 0),
      (this.lYe = void 0),
      (this._Ye = void 0),
      (this.uYe = []),
      (this.cYe = 0),
      (this.mYe = void 0),
      (this.dYe = void 0),
      (this.CYe = void 0),
      (this.gYe = !1),
      (this.fYe = void 0),
      (this.B8e = void 0),
      (this.pYe = void 0),
      (this.vYe = (t, i) => {
        const e =
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
        e &&
          e === HOOK_PHANTOM_ID &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Test",
              8,
              "[HookPoint]角色发现钩锁点",
              ["Found", t],
              ["IsUsingHook", this.gYe],
            ),
          this.gYe ||
            (t
              ? (this.CYe && this.CYe.GetIsInterrupting()) || this.MYe(i)
              : this.SYe()));
      }),
      (this.EYe = (t, i, e) => {
        const s = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        s.Valid &&
          t === s.Id &&
          i === GRAPPING_HOOK_SKILL_ID &&
          (this.gYe = !0);
      }),
      (this.yYe = (t, i) => {
        !this.B8e?.Valid ||
          t !== this.B8e.Id ||
          i !== GRAPPING_HOOK_SKILL_ID ||
          ((this.gYe = !1), this.CYe?.GetIsInterrupting()) ||
          this.IYe() ||
          this.SYe();
      }),
      (this.TYe = (t, i) => {
        const e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        e.Valid &&
          t === e.Id &&
          i === GRAPPING_HOOK_SKILL_ID &&
          this.CYe?.Interrupt();
      }),
      (this.LYe = () => {
        this.B8e?.Valid &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Test",
              8,
              "[HookPoint]定点钩锁被打断后尝试激活定点钩锁Ui",
            ),
          this.IYe() ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Test",
                8,
                "[HookPoint]定点钩锁被打断后找不到定点钩锁点",
              ),
            this.SYe()));
      }),
      (this.DYe = () => {
        this.IYe() || this.SYe();
      }),
      (this.RYe = () => {
        const t = this.ChildViewData.GetChildVisible(17);
        this.GetItem(0).SetUIActive(t), this._Ye?.OnBattleHudVisibleChanged(t);
      }),
      (this.UYe = (t) => {
        this.GetItem(2).SetUIActive(t),
          this.GetItem(2).SetRaycastTarget(t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "BattleUiSet",
              38,
              "轮盘界面显隐，设置CenterPanel遮罩",
              ["bVisible", t],
            );
      }),
      (this.AYe = (t, i) => {
        t
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 18, "进入处决范围"),
            this.fYe ||
              ((this.fYe = new ExecutionPanel_1.ExecutionPanel()),
              this.fYe.Init(this.RootItem)),
            this.fYe.ShowByEntity(i))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 18, "离开处决范围"),
            this.fYe?.HideByEntity(i));
      }),
      (this.PYe = (t) => {
        this.GetItem(0).SetUIActive(t),
          this.GetItem(1).SetUIActive(t),
          this.GetItem(2).SetUIActive(t);
      }),
      (this.o7e = () => {
        const t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        (this.B8e = t.EntityHandle),
          (this.pYe = this.B8e.Entity.GetComponent(87)),
          this.xYe();
      });
  }
  OnRegisterComponent() {
    const t = this.GetOperationType();
    t === 2
      ? (this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIItem],
        ])
      : t === 1 &&
        (this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIItem],
          [3, UE.UIItem],
        ]);
  }
  InitializeTemp() {
    this.RYe(),
      (this.B8e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
      this.B8e?.Valid && (this.pYe = this.B8e.Entity.GetComponent(87));
  }
  async InitializeAsync() {
    await Promise.all([this.wYe(), this.BYe(), this.bYe(), this.qYe()]),
      this.GetItem(2).SetUIActive(!1),
      this.IYe();
  }
  OnShowBattleChildViewPanel() {
    this.mYe?.ShowBattleVisibleChildView(),
      this.hYe?.OnShowBattleChildViewPanel();
  }
  OnHideBattleChildViewPanel() {
    this.mYe?.HideBattleVisibleChildView(),
      this.hYe?.OnHideBattleChildViewPanel();
  }
  SetEventVisible(t) {}
  Reset() {
    (this.hYe = void 0),
      (this._Ye = void 0),
      (this.mYe = void 0),
      this.CYe?.Destroy(),
      (this.CYe = void 0),
      this.fYe?.Destroy(),
      (this.fYe = void 0),
      (this.uYe.length = 0),
      super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
      this.o7e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleFindFixHook,
        this.vYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharUseSkill,
        this.EYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillEnd,
        this.yYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharInterruptSkill,
        this.TYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
        this.DYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
        this.UYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
        this.AYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GmOnlyShowJoyStick,
        this.PYe,
      ),
      this.ChildViewData.AddCallback(17, this.RYe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
      this.o7e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleFindFixHook,
        this.vYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharUseSkill,
        this.EYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillEnd,
        this.yYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharInterruptSkill,
        this.TYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
        this.DYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
        this.UYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
        this.AYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GmOnlyShowJoyStick,
        this.PYe,
      ),
      this.ChildViewData.RemoveCallback(17, this.RYe);
  }
  OnTickBattleChildViewPanel(t) {
    this.mYe?.Tick(t), this.dYe?.Tick(t), this._Ye.Update(t);
  }
  OnAfterTickBattleChildViewPanel(t) {
    this.hYe?.Update(t), this.lYe.Update(), this.VYe();
  }
  MYe(t) {
    this.CYe && (this.CYe.Destroy(), (this.CYe = void 0));
    const i = UiLayer_1.UiLayer.GetBattleViewUnit(1);
    (this.CYe = new GrapplingHookPoint_1.GrapplingHookPoint(t, i)),
      this.CYe.BindOnInterruptCompleted(this.LYe);
  }
  IYe() {
    let t;
    return !(
      !this.pYe?.Valid ||
      !this.HYe() ||
      !this.jYe(this.pYe) ||
      ((t = this.pYe.GetNextTargetVector()), this.MYe(t), 0)
    );
  }
  GetExecutionItem() {
    return this.fYe?.GetExecutionItem();
  }
  jYe(t) {
    let i = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    return !(
      !i ||
      i !== HOOK_PHANTOM_ID ||
      !t.Valid ||
      !(i = t.GetNextTarget()) ||
      (i && !t.CanActivateFixHook()) ||
      !t.GetNextTargetVector()
    );
  }
  SYe() {
    this.CYe &&
      this.CYe.GetIsActivateHook() &&
      (this.CYe.Destroy(), (this.CYe = void 0));
  }
  HYe() {
    const t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    return !(!t || t !== HOOK_PHANTOM_ID);
  }
  VYe() {
    this.CYe &&
      this.pYe?.Valid &&
      (this.HYe() && this.jYe(this.pYe) ? this.CYe?.AfterTick() : this.SYe());
  }
  async wYe() {
    const t = this.GetItem(0);
    this.hYe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      TrackedMarksView_1.TrackedMarksView,
    );
  }
  async BYe() {
    const t = this.GetItem(0);
    this.lYe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      ScanTrackedMarksView_1.ScanTrackedMarksView,
    );
  }
  async bYe() {
    const t = this.GetItem(1);
    this._Ye = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      AlterMarksView_1.AlterMarksView,
    );
  }
  async qYe() {
    let t;
    this.GetOperationType() === 1 &&
      ((t = this.GetItem(3)),
      (this.mYe = await this.NewStaticChildViewAsync(
        t.GetOwner(),
        Joystick_1.Joystick,
      ))),
      this.xYe();
  }
  xYe() {
    this.mYe &&
      (this.ClearAllTagSignificantChangedCallback(),
      this.ListenForTagSignificantChanged(this.B8e, forbidMoveTagId, (t, i) => {
        this.mYe.SetForbidMove(i);
      }),
      this.mYe.SetForbidMove(this.ContainsTag(this.B8e, forbidMoveTagId)));
    const t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    let i = 0;
    t?.RoleBattleViewInfo && (i = t.RoleBattleViewInfo.JoystickType),
      this.cYe !== i &&
        ((this.cYe = i),
        this.mYe?.SetVisible(3, i === 0),
        this.dYe && this.dYe.Destroy(),
        i === 1) &&
        ((this.dYe = new MoveSkillPanel_1.MoveSkillPanel()),
        this.dYe.CreateDynamic(this.GetRootItem()));
  }
}
((exports.CenterPanel = CenterPanel).OYe = void 0),
  (CenterPanel.kYe = void 0),
  (CenterPanel.GYe = void 0),
  (CenterPanel.FYe = void 0),
  (CenterPanel.NYe = void 0);
// # sourceMappingURL=CenterPanel.js.map
