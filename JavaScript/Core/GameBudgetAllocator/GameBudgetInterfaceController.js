"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameBudgetInterfaceController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  EventDefine_1 = require("../../Game/Common/Event/EventDefine"),
  EventSystem_1 = require("../../Game/Common/Event/EventSystem"),
  Global_1 = require("../../Game/Global"),
  ModelManager_1 = require("../../Game/Manager/ModelManager"),
  GameBudgetAllocatorConfigCreator_1 = require("../../Game/World/Define/GameBudgetAllocatorConfigCreator"),
  Log_1 = require("../Common/Log"),
  ControllerBase_1 = require("../Framework/ControllerBase"),
  GameBudgetTimeEstimationFramesOffset_1 = require("./GameBudgetTimeEstimationFramesOffset");
class GameBudgetInterfaceController extends ControllerBase_1.ControllerBase {
  static get CenterRole() {
    return this.SK;
  }
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.EK,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.yK,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CameraModeChanged,
        this.IK,
      ),
      (this.TK = 0),
      super.OnInit()
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.EK,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.yK,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CameraModeChanged,
        this.IK,
      ),
      (this.LK = void 0),
      super.OnClear()
    );
  }
  static InitializeEnvironment(e) {
    cpp_1.FKuroGameBudgetAllocatorInterface.InitializeEnvironment(e),
      this.DK &&
        cpp_1.FKuroGameBudgetAllocatorInterface.UpdateMinUpdateFIFOBudgetTime(
          this.DK,
        ),
      this.RK.Initialize();
  }
  static IsEnvironmentValid() {
    return cpp_1.FKuroGameBudgetAllocatorInterface.IsEnvironmentValid();
  }
  static SetMaximumFrameRate(e) {
    cpp_1.FKuroGameBudgetAllocatorInterface.SetMaximumFrameRate(e),
      this.RK.SetMaximumFrameRate(e);
  }
  static UpdateMinUpdateFifoBudgetTime(e) {
    (this.DK = e),
      this.IsEnvironmentValid() &&
        cpp_1.FKuroGameBudgetAllocatorInterface.UpdateMinUpdateFIFOBudgetTime(
          e,
        );
  }
  static UpdateBudgetTime(e) {
    this.RK.UpdateBudgetTime(e);
  }
  static RegisterTick(e, t, r, a, i = !0) {
    return this.UK.has(r)
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Game", 25, "Object has already added!"),
        this.UK.get(r))
      : ((e = cpp_1.FKuroGameBudgetAllocatorInterface.RegisterFunction(
          e,
          t,
          a,
          r.ScheduledTick,
          r.ScheduledAfterTick,
          r.OnEnabledChange,
          i ? r.OnWasRecentlyRenderedOnScreenChange : void 0,
          r.LocationProxyFunction,
          r,
        )),
        this.UK.set(r, e),
        e);
  }
  static UnregisterTick(e) {
    var t = this.UK.get(e);
    t
      ? (this.UK.delete(e),
        cpp_1.FKuroGameBudgetAllocatorInterface.UnregisterFunction(t))
      : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Game", 25, "Not found error!");
  }
  static UpdateRegisterActor(e, t, r) {
    cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(e, t, r);
  }
  static ComputeDistanceScore(e, t, r, a) {
    var e = new UE.Vector(e[0], e[1], e[2]),
      t = new UE.Vector(t[0], t[1], t[2]),
      i =
        (GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
          .TsCharacterDtailConfig ||
          GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.CreateCharacterEntityConfigOnly(),
        GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
          .TsCharacterDtailConfig),
      a = a ? i.Normal_Render : i.Normal_NotRendered;
    return cpp_1.FKuroGameBudgetAllocatorInterface.ComputeDistanceScore(
      e,
      t,
      0.01 * a.TickReductionStartSize,
      0.01 * a.TickReductionIntervalSize,
      a.MaxInterval,
      r,
    );
  }
  static RegisterOnceTaskDefaultGroup(e, t, r) {
    cpp_1.FKuroGameBudgetAllocatorInterface.RegisterOnceTaskDefaultGroup(
      e,
      t,
      r,
    );
  }
  static ProduceOnceTaskOnDefaultGroup(e, t, r) {
    cpp_1.FKuroGameBudgetAllocatorInterface.ProduceOnceTask(e, t, r);
  }
  static RegisterOnceTaskCustomGroup(e) {
    cpp_1.FKuroGameBudgetAllocatorInterface.RegisterOnceTaskCustomGroup(
      e.GroupId,
      e.Priority,
      e.IsEmpty,
      e.Consume,
      e,
    );
  }
  static SetCenterRole(e) {
    e &&
      this.SK !== e &&
      (cpp_1.FKuroGameBudgetAllocatorInterface.SetCenterActor(e),
      (this.SK = e));
  }
  static SetUseBoundsCalculateDistance(e, t, r) {
    cpp_1.FKuroGameBudgetAllocatorInterface.SetUseBoundsCalculateDistance(
      e,
      t,
      r,
    );
  }
  static SetPerformanceLimitMode(e) {
    (this.AK = e), this.PK();
  }
  static SetPlotMode(e) {
    (this.xK = e), this.PK();
  }
  static PK() {
    var e = this.xK ? 2 : this.wK && !this.AK ? 1 : 0;
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalMode(e);
  }
  static BK(e) {
    this.TK !== e &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Game",
          37,
          "[GameBudget]时间预算管理模式更改",
          ["NewModel", e],
          ["OldModel", this.TK],
        ),
      this.bK(this.TK),
      (this.TK = e),
      this.qK(e));
  }
  static qK(e) {
    1 === e
      ? this.SetCenterRole(Global_1.Global.BaseCharacter)
      : 2 === e &&
        (this.SetCenterRole(Global_1.Global.BaseCharacter),
        (e =
          ModelManager_1.ModelManager.CameraModel?.SequenceCamera
            ?.DisplayComponent?.CineCamera)) &&
        ((this.LK = e),
        cpp_1.FKuroGameBudgetAllocatorInterface.AddAssistantActor(e));
  }
  static bK(e) {
    2 === e &&
      this.LK &&
      (cpp_1.FKuroGameBudgetAllocatorInterface.RemoveAssistantActor(this.LK),
      (this.LK = void 0));
  }
}
(exports.GameBudgetInterfaceController = GameBudgetInterfaceController),
  ((_a = GameBudgetInterfaceController).IsOpen = !0),
  (GameBudgetInterfaceController.UK = new Map()),
  (GameBudgetInterfaceController.TsGlobalFifoTaskGroupName = new UE.FName(
    "TsGlobalFifoTaskGroup",
  )),
  (GameBudgetInterfaceController.TsGlobalFifoTaskSignificanceGroup = 2),
  (GameBudgetInterfaceController.SK = void 0),
  (GameBudgetInterfaceController.DK = void 0),
  (GameBudgetInterfaceController.xK = !1),
  (GameBudgetInterfaceController.wK = !1),
  (GameBudgetInterfaceController.AK = !1),
  (GameBudgetInterfaceController.RK =
    new GameBudgetTimeEstimationFramesOffset_1.GameBudgetTimeEstimationFramesOffset()),
  (GameBudgetInterfaceController.yK = (e) => {
    (_a.wK = e), _a.PK();
  }),
  (GameBudgetInterfaceController.EK = (e, t) => {
    _a.SetCenterRole(Global_1.Global.BaseCharacter);
  }),
  (GameBudgetInterfaceController.TK = 0),
  (GameBudgetInterfaceController.LK = void 0),
  (GameBudgetInterfaceController.IK = (e, t) => {
    1 === e && ModelManager_1.ModelManager.PlotModel?.IsInPlot
      ? _a.BK(2)
      : _a.BK(1);
  });
//# sourceMappingURL=GameBudgetInterfaceController.js.map
