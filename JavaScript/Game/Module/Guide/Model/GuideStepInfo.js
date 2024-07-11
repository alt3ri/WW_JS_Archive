"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideStepInfo = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StateBase_1 = require("../../../../Core/Utils/StateMachine/StateBase"),
  StateMachine_1 = require("../../../../Core/Utils/StateMachine/StateMachine"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiBehaviorBase_1 = require("../../../Ui/Base/UiBehaviorBase"),
  UiTimeDilation_1 = require("../../../Ui/Base/UiTimeDilation"),
  UiConfig_1 = require("../../../Ui/Define/UiConfig"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  UiModel_1 = require("../../../Ui/UiModel"),
  TutorialController_1 = require("../../Tutorial/TutorialController"),
  UiBehaviorGuideFocus_1 = require("../Views/UiBehaviorGuideFocus"),
  GuideViewData_1 = require("./GuideViewData"),
  TutorialListInfo_1 = require("./TutorialListInfo"),
  stateDesc = ["Init", "Executing", "Pending", "Break", "Finish", "End"],
  GUARANTEED_TIME = 3e4,
  OFFSET_TIME = 2e3;
class InitState extends StateBase_1.StateBase {}
class ExecutingState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.QYt = !0),
      (this.XYt = !1),
      (this.$Yt = void 0),
      (this.YYt = void 0);
  }
  JYt() {
    const e = this.Owner;
    if (e.GuideView)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Guide", 17, "重复打开引导界面", ["步骤Id", e.Id]);
    else
      switch (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Guide", 17, "引导界面打开", ["步骤Id", e.Id]),
        e.Config.ContentType)
      ) {
        case 3: {
          var i = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(
            this.Owner.Id,
          );
          const t = this.Owner.OwnerGroup.GetIfPreExecute();
          TutorialController_1.TutorialController.TryUnlockAndOpenTutorialTip(
            i.Id,
            (i) => {
              i
                ? this.QYt
                  ? t || this.zYt(e)
                  : Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Guide",
                      17,
                      "打开教学引导失败, 当前已退出执行状态, 步骤ID: " + e.Id,
                    )
                : (Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Guide",
                      17,
                      "打开教学引导失败, 教学目录请求解锁协议返回失败, 触发打断, 步骤ID: " +
                        e.Id,
                    ),
                  this.Owner.SwitchState(3));
            },
          ),
            t && this.zYt(e);
          break;
        }
        default:
          ModelManager_1.ModelManager.GuideModel.OpenGuideView(e);
      }
  }
  zYt(i) {
    i = new TutorialListInfo_1.TutorialListInfo(i);
    i.Init(), ModelManager_1.ModelManager.GuideModel.AddTutorialInfo(i);
  }
  ZYt() {
    void 0 !== this.YYt &&
      (TimerSystem_1.TimerSystem.Remove(this.YYt), (this.YYt = void 0));
  }
  eJt() {
    void 0 !== this.$Yt &&
      (TimerSystem_1.TimerSystem.Remove(this.$Yt), (this.$Yt = void 0));
  }
  tJt() {
    var e = this.Owner.Config.Duration;
    if (0 !== e && void 0 === this.$Yt) {
      let i = GUARANTEED_TIME;
      e > GUARANTEED_TIME &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Guide",
            17,
            "引导保底时间被配置修改",
            ["步骤Id", this.Owner.Id],
            ["组Id", this.Owner.OwnerGroup.Id],
            ["新保底时间", e],
          ),
        (i = e + OFFSET_TIME)),
        (this.$Yt = TimerSystem_1.TimerSystem.Delay((i) => {
          (this.$Yt = void 0),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Guide",
                17,
                "[引导步骤][时停设置超过保底时长(30秒)未清除, 触发保底机制恢复时停, 请检查引导配置触发流程是否合理！]",
                ["步骤Id", this.Owner.Id],
              ),
            this.Owner.SwitchState(3);
        }, i));
    }
  }
  OnEnter() {
    this.QYt = !0;
    var i = this.Owner.Config,
      e = i.TimeScale,
      e =
        (e < 1 &&
          !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          (InputDistributeController_1.InputDistributeController.RefreshInputTag(),
          UiTimeDilation_1.UiTimeDilation.SetTimeDilationHighLevel(
            e,
            "GuideStep",
          ),
          this.tJt()),
        i.ShowDelay);
    0 < e
      ? (this.ZYt(),
        (this.YYt = TimerSystem_1.TimerSystem.Delay((i) => {
          (this.YYt = void 0), this.iJt();
        }, e)))
      : this.iJt();
  }
  iJt() {
    this.JYt(),
      (this.Owner.ViewData.IsAttachToBattleView =
        UiManager_1.UiManager.IsViewOpen("BattleView")),
      (this.XYt = this.Owner.SetLimitInputDistribute());
  }
  OnExit() {
    this.QYt = !1;
    var i,
      e = this.Owner,
      t = ((e.IsExitingFromExecuting = !0), this.Owner.Config.TimeScale),
      t =
        (t < 1 &&
          !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          (this.eJt(),
          UiTimeDilation_1.UiTimeDilation.ResetTimeDilationHighLevel(
            "GuideStep",
          ),
          InputDistributeController_1.InputDistributeController.RefreshInputTag()),
        this.ZYt(),
        e.GuideView);
    t &&
      ((i = t.GetViewId()),
      t.IsDestroyOrDestroying ||
        ((t.IgnoreState = !0), UiManager_1.UiManager.CloseViewById(i)),
      (e.GuideView = void 0)),
      ModelManager_1.ModelManager.GuideModel.RemoveStepViewSingletonMap(e),
      e.ClearGuideFocusBehavior(),
      e.ViewData.Clear(),
      this.XYt &&
        ModelManager_1.ModelManager.InputDistributeModel.ClearLimitInputDistributeActions(),
      (e.IsExitingFromExecuting = !1);
  }
}
class PendingState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments), (this.xYt = void 0);
  }
  jm() {
    void 0 !== this.xYt &&
      (TimerSystem_1.TimerSystem.Remove(this.xYt), (this.xYt = void 0));
  }
  OnEnter() {
    this.jm(),
      (this.xYt = TimerSystem_1.TimerSystem.Forever(() => {
        this.Owner.CanEnterExecuting() &&
          (this.jm(), this.Owner.SwitchState(1));
      }, 1e3));
  }
  OnExit() {
    this.Owner.StopLockInput(), this.jm();
  }
}
class BreakState extends StateBase_1.StateBase {
  OnEnter() {
    this.Owner.OwnerGroup.Break();
  }
}
class FinishState extends StateBase_1.StateBase {
  OnEnter() {
    this.Owner.OwnerGroup.PumpStep();
  }
}
class EndState extends StateBase_1.StateBase {}
class GuideStepInfo {
  constructor(i, e) {
    (this.Id = 0),
      (this.OwnerGroup = void 0),
      (this.StateMachine = void 0),
      (this.ViewData = void 0),
      (this.GuideView = void 0),
      (this.GuideFocusBehaviorProxy = void 0),
      (this.oJt = void 0),
      (this.rJt = void 0),
      (this.nJt = void 0),
      (this.IsExitingFromExecuting = !1),
      (this.Id = i),
      (this.OwnerGroup = e),
      (this.ViewData = new GuideViewData_1.GuideStepViewData(this)),
      (this.StateMachine = new StateMachine_1.StateMachine(this)),
      this.StateMachine.AddState(0, InitState),
      this.StateMachine.AddState(1, ExecutingState),
      this.StateMachine.AddState(2, PendingState),
      this.StateMachine.AddState(3, BreakState),
      this.StateMachine.AddState(4, FinishState),
      this.StateMachine.AddState(5, EndState),
      this.StateMachine.Start(0);
  }
  get Config() {
    return (
      this.rJt ||
        (this.rJt = ConfigManager_1.ConfigManager.GuideConfig.GetStep(this.Id)),
      this.rJt
    );
  }
  TryEnterExecuting() {
    this.CanEnterExecuting() ? this.SwitchState(1) : this.SwitchState(2);
  }
  AssignGuideView(i) {
    var e, t;
    i &&
      ((e = i.Info.Name),
      (t = i.GetViewId()),
      1 !== this.StateMachine.CurrentState
        ? (UiManager_1.UiManager.CloseViewById(t),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Guide",
              17,
              "引导界面赋值失败, 当前步骤已经终止, 清理已打开的引导界面",
              ["步骤Id", this.Id],
              ["viewName", e],
              ["viewId", t],
            ))
        : ((this.GuideView = i),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Guide",
              17,
              "引导界面赋值",
              ["步骤Id", this.Id],
              ["viewName", e],
              ["viewId", t],
            )));
  }
  SwitchState(i) {
    5 === this.StateMachine.CurrentState && 0 !== i
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Guide",
          17,
          "[引导状态切换:步骤]失败, 当前步骤已被外部终止",
          ["步骤Id", this.Id],
          ["当前状态", stateDesc[this.StateMachine.CurrentState]],
          ["切换到的状态", stateDesc[i]],
        )
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            "[引导状态切换:步骤] 成功",
            ["步骤Id", this.Id],
            ["当前状态", stateDesc[this.StateMachine.CurrentState]],
            ["切换到的状态", stateDesc[i]],
          ),
        this.StateMachine.Switch(i));
  }
  sJt() {
    return (
      !!UiLayer_1.UiLayer.IsUiActive() &&
      !ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.GameplayTagComponent?.HasTag(
        1733479717,
      ) &&
      !UiManager_1.UiManager.IsViewShow("PhantomExploreView")
    );
  }
  aJt() {
    if (
      4 === this.Config.ContentType &&
      ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocus(this.Id).UseMask
    )
      return !0;
    return !1;
  }
  hJt() {
    var i,
      e = ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocus(this.Id),
      t = e.ViewName;
    return t
      ? !(
          !(i = UiConfig_1.UiConfig.TryGetViewInfo(t)) ||
          !(i = UiModel_1.UiModel.GetTopView(i.Type)) ||
          (i.Info.Name !== t
            ? (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Guide",
                  17,
                  "当前打开的界面与聚焦步骤的目标界面不一致",
                  ["当前打开界面", i.Info.Name],
                  ["聚焦引导目标界面", t],
                  ["步骤Id", e.GuideId],
                ),
              1)
            : (e.DynamicTabName
                ? EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.GuideFocusNeedUiTabView,
                    this,
                    e,
                  )
                : (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Guide",
                      54,
                      "设置引导attachedview",
                      ["当前打开界面", i.Info.Name],
                      ["界面id", i.ComponentId],
                      ["步骤Id", e.GuideId],
                    ),
                  this.ViewData.SetAttachedView(i)),
              0))
        )
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Guide", 17, "聚焦引导步骤未配置界面名称", [
            "步骤Id",
            e.GuideId,
          ]),
        !1);
  }
  lJt() {
    this.nJt ||
      (ModelManager_1.ModelManager.GuideModel.AddGuideLockInput(),
      (this.nJt = TimerSystem_1.TimerSystem.Delay((i) => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            54,
            "[Guide][引导触发后5秒没打开对应界面,触发保底]",
            ["步骤Id", this.Id],
          ),
          this.SwitchState(3);
      }, 4e3)));
  }
  StopLockInput() {
    void 0 !== this.nJt &&
      (ModelManager_1.ModelManager.GuideModel.RemoveGuideLockInput(),
      TimerSystem_1.TimerSystem.Remove(this.nJt),
      (this.nJt = void 0));
  }
  CanEnterExecuting() {
    if (!this.sJt()) return !1;
    switch (this.Config.ContentType) {
      case 4: {
        if (!this.hJt()) return this.StopLockInput(), !1;
        this.aJt() && this.lJt();
        const e = this.ViewData.GetAttachedView();
        var i;
        return e
          ? (this.oJt ||
              ((this.oJt = new UiBehaviorGuideFocus_1.UiBehaviorGuideFocus(e)),
              this.oJt.SetParam(this)),
            this.oJt.SetOwner(e),
            !!this.oJt.PrepareForOpenGuideFocus() &&
              (!(i = UiManager_1.UiManager.GetViewByName("GuideFocusView")) ||
              i.WaitToDestroy ||
              i.IsDestroyOrDestroying
                ? (this.GuideFocusBehaviorProxy ||
                    ((this.GuideFocusBehaviorProxy =
                      new UiBehaviorBase_1.UiBehaviorBaseProxy(this.oJt)),
                    this.GuideFocusBehaviorProxy.CreateAsync().then(
                      () => {
                        this.GuideFocusBehaviorProxy.StartAsync(),
                          e.AddUiBehaviorProxy(this.GuideFocusBehaviorProxy);
                      },
                      () => {},
                    )),
                  this.StopLockInput(),
                  !0)
                : (ModelManager_1.ModelManager.GuideModel.BreakTypeViewStep(
                    this.Config.ContentType,
                  ),
                  !1)))
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "聚焦引导  依附的页签界面不存在或未打开",
                ["this.Id", this.Id],
              ),
            !1);
      }
      case 1:
        return !(
          !UiManager_1.UiManager.IsViewShow("BattleView") ||
          (UiManager_1.UiManager.IsViewOpen("GuideTipsView") &&
            (ModelManager_1.ModelManager.GuideModel.BreakTypeViewStep(
              this.Config.ContentType,
            ),
            1))
        );
      default:
        return !0;
    }
  }
  ClearGuideFocusBehavior() {
    this.oJt?.CleanGuideStep(),
      (this.oJt = void 0),
      (this.GuideFocusBehaviorProxy = void 0);
  }
  SetLimitInputDistribute() {
    let i = !1;
    switch (this.Config.ContentType) {
      case 4:
        var e = ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocus(
          this.Id,
        );
        e.LimitInputEnums.forEach((i) => {
          ModelManager_1.ModelManager.InputDistributeModel.AddToLimitInputDistributeActions(
            i,
          );
        }),
          ModelManager_1.ModelManager.InputDistributeModel.HasActionLimitSet() &&
            ((e.UseClick || e.UseMask || this.Config.TimeScale < 1) &&
              (ModelManager_1.ModelManager.InputDistributeModel.AddToLimitInputDistributeActions(
                InputMappingsDefine_1.actionMappings.Ui左键点击,
              ),
              ModelManager_1.ModelManager.InputDistributeModel.AddToLimitInputDistributeActions(
                InputMappingsDefine_1.actionMappings.显示鼠标,
              )),
            (i = !0));
        break;
      case 1:
        ConfigManager_1.ConfigManager.GuideConfig.GetGuideTips(
          this.Id,
        ).LimitInputEnums.forEach((i) => {
          ModelManager_1.ModelManager.InputDistributeModel.AddToLimitInputDistributeActions(
            i,
          );
        }),
          ModelManager_1.ModelManager.InputDistributeModel.HasActionLimitSet() &&
            (i = !0);
    }
    return i;
  }
}
exports.GuideStepInfo = GuideStepInfo;
//# sourceMappingURL=GuideStepInfo.js.map
