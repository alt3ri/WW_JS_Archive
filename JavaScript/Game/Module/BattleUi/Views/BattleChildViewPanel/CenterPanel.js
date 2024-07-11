"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CenterPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  AlterMarksView_1 = require("../AlterMarksView"),
  ExecutionPanel_1 = require("../Execution/ExecutionPanel"),
  GrapplingHookPoint_1 = require("../GrapplingHookPoint/GrapplingHookPoint"),
  Joystick_1 = require("../Joystick"),
  ScanTrackedMarksView_1 = require("../ScanTrackedMarksView"),
  TrackedMarksView_1 = require("../TrackedMarksView"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
  MoveSkillPanel_1 = require("./MoveSkillPanel"),
  GRAPPING_HOOK_SKILL_ID = 100020,
  HOOK_PHANTOM_ID = 1001,
  forbidMoveTagId = 1616400338;
class CenterPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.MJe = void 0),
      (this.EJe = void 0),
      (this.SJe = void 0),
      (this.yJe = []),
      (this.IJe = 0),
      (this.TJe = void 0),
      (this.LJe = void 0),
      (this.DJe = void 0),
      (this.RJe = !1),
      (this.UJe = void 0),
      (this.X9e = void 0),
      (this.AJe = void 0),
      (this.PJe = (t, i) => {
        var e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
        e &&
          e === HOOK_PHANTOM_ID &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              18,
              "[HookPoint]角色发现钩锁点",
              ["Found", t],
              ["IsUsingHook", this.RJe],
            ),
          this.RJe ||
            (t
              ? (this.DJe && this.DJe.GetIsInterrupting()) || this.xJe(i)
              : this.wJe()));
      }),
      (this.BJe = (t, i, e) => {
        var s = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        s?.Valid &&
          t === s.Id &&
          i === GRAPPING_HOOK_SKILL_ID &&
          (this.RJe = !0);
      }),
      (this.bJe = (t, i) => {
        !this.X9e?.Valid ||
          t !== this.X9e.Id ||
          i !== GRAPPING_HOOK_SKILL_ID ||
          ((this.RJe = !1), this.DJe?.GetIsInterrupting()) ||
          this.qJe() ||
          this.wJe();
      }),
      (this.GJe = (t, i) => {
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        e.Valid &&
          t === e.Id &&
          i === GRAPPING_HOOK_SKILL_ID &&
          this.DJe?.Interrupt();
      }),
      (this.NJe = () => {
        this.X9e?.Valid &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Test",
              8,
              "[HookPoint]定点钩锁被打断后尝试激活定点钩锁Ui",
            ),
          this.qJe() ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Test",
                8,
                "[HookPoint]定点钩锁被打断后找不到定点钩锁点",
              ),
            this.wJe()));
      }),
      (this.OJe = () => {
        this.qJe() || this.wJe();
      }),
      (this.kJe = () => {
        var t = this.ChildViewData.GetChildVisible(17);
        this.GetItem(0).SetUIActive(t), this.SJe?.OnBattleHudVisibleChanged(t);
      }),
      (this.FJe = (t) => {
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
      (this.VJe = (t, i) => {
        t
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 18, "进入处决范围"),
            this.UJe ||
              ((this.UJe = new ExecutionPanel_1.ExecutionPanel()),
              this.UJe.Init(this.RootItem)),
            this.UJe.ShowByEntity(i))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 18, "离开处决范围"),
            this.UJe?.HideByEntity(i));
      }),
      (this.HJe = (t) => {
        this.GetItem(0).SetUIActive(t),
          this.GetItem(1).SetUIActive(t),
          this.GetItem(2).SetUIActive(t);
      }),
      (this.fHe = () => {
        var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        (this.X9e = t.EntityHandle),
          (this.AJe = this.X9e.Entity.GetComponent(89)),
          this.jJe();
      });
  }
  OnRegisterComponent() {
    var t = this.GetOperationType();
    2 === t
      ? (this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIItem],
        ])
      : 1 === t &&
        (this.ComponentRegisterInfos = [
          [0, UE.UIItem],
          [1, UE.UIItem],
          [2, UE.UIItem],
          [3, UE.UIItem],
        ]);
  }
  InitializeTemp() {
    this.kJe(),
      (this.X9e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
      this.X9e?.Valid && (this.AJe = this.X9e.Entity.GetComponent(89));
  }
  async InitializeAsync() {
    await Promise.all([this.WJe(), this.KJe(), this.QJe(), this.XJe()]),
      this.GetItem(2).SetUIActive(!1),
      this.qJe();
  }
  OnShowBattleChildViewPanel() {
    this.TJe?.ShowBattleVisibleChildView(),
      this.MJe?.OnShowBattleChildViewPanel();
  }
  OnHideBattleChildViewPanel() {
    this.TJe?.HideBattleVisibleChildView(),
      this.MJe?.OnHideBattleChildViewPanel();
  }
  SetEventVisible(t) {}
  Reset() {
    (this.MJe = void 0),
      (this.SJe = void 0),
      (this.TJe = void 0),
      this.DJe?.Destroy(),
      (this.DJe = void 0),
      this.UJe?.Destroy(),
      (this.UJe = void 0),
      (this.yJe.length = 0),
      super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleFindFixHook,
        this.PJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharUseSkill,
        this.BJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSkillEnd,
        this.bJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharInterruptSkill,
        this.GJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
        this.OJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
        this.FJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
        this.VJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GmOnlyShowJoyStick,
        this.HJe,
      ),
      this.ChildViewData.AddCallback(17, this.kJe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleFindFixHook,
        this.PJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharUseSkill,
        this.BJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSkillEnd,
        this.bJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharInterruptSkill,
        this.GJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
        this.OJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
        this.FJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOrExitExecutionRange,
        this.VJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GmOnlyShowJoyStick,
        this.HJe,
      ),
      this.ChildViewData.RemoveCallback(17, this.kJe);
  }
  OnTickBattleChildViewPanel(t) {
    this.TJe?.Tick(t), this.LJe?.Tick(t), this.SJe.Update(t);
  }
  OnAfterTickBattleChildViewPanel(t) {
    this.MJe?.Update(t), this.EJe.Update(), this.eze();
  }
  xJe(t) {
    this.DJe && (this.DJe.Destroy(), (this.DJe = void 0));
    var i = UiLayer_1.UiLayer.GetBattleViewUnit(1);
    (this.DJe = new GrapplingHookPoint_1.GrapplingHookPoint(t, i)),
      this.DJe.BindOnInterruptCompleted(this.NJe);
  }
  qJe() {
    var t;
    return !(
      !this.AJe?.Valid ||
      !this.tze() ||
      !this.ize(this.AJe) ||
      ((t = this.AJe.GetNextTargetVector()), this.xJe(t), 0)
    );
  }
  GetExecutionItem() {
    return this.UJe?.GetExecutionItem();
  }
  ize(t) {
    var i = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    return !(
      !i ||
      i !== HOOK_PHANTOM_ID ||
      !t.Valid ||
      !(i = t.GetNextTarget()) ||
      (i && !t.CanActivateFixHook()) ||
      !t.GetNextTargetVector()
    );
  }
  wJe() {
    this.DJe &&
      this.DJe.GetIsActivateHook() &&
      (this.DJe.Destroy(), (this.DJe = void 0));
  }
  tze() {
    var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    return !(!t || t !== HOOK_PHANTOM_ID);
  }
  eze() {
    this.DJe &&
      this.AJe?.Valid &&
      (this.tze() && this.ize(this.AJe) ? this.DJe?.AfterTick() : this.wJe());
  }
  async WJe() {
    var t = this.GetItem(0);
    this.MJe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      TrackedMarksView_1.TrackedMarksView,
    );
  }
  async KJe() {
    var t = this.GetItem(0);
    this.EJe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      ScanTrackedMarksView_1.ScanTrackedMarksView,
    );
  }
  async QJe() {
    var t = this.GetItem(1);
    this.SJe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      AlterMarksView_1.AlterMarksView,
    );
  }
  async XJe() {
    var t;
    1 === this.GetOperationType() &&
      ((t = this.GetItem(3)),
      (this.TJe = await this.NewStaticChildViewAsync(
        t.GetOwner(),
        Joystick_1.Joystick,
        this.RootItem,
      ))),
      this.jJe();
  }
  jJe() {
    this.TJe &&
      (this.ClearAllTagSignificantChangedCallback(),
      this.ListenForTagSignificantChanged(this.X9e, forbidMoveTagId, (t, i) => {
        this.TJe.SetForbidMove(i);
      }),
      this.TJe.SetForbidMove(this.ContainsTag(this.X9e, forbidMoveTagId)));
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    let i = 0;
    t?.RoleBattleViewInfo && (i = t.RoleBattleViewInfo.JoystickType),
      this.IJe !== i &&
        ((this.IJe = i),
        this.TJe?.SetVisible(3, 0 === i),
        this.LJe && this.LJe.Destroy(),
        1 === i) &&
        ((this.LJe = new MoveSkillPanel_1.MoveSkillPanel()),
        this.LJe.CreateDynamic(this.GetRootItem()));
  }
}
((exports.CenterPanel = CenterPanel).JJe = void 0),
  (CenterPanel.zJe = void 0),
  (CenterPanel.$Je = void 0),
  (CenterPanel.ZJe = void 0),
  (CenterPanel.YJe = void 0);
//# sourceMappingURL=CenterPanel.js.map
