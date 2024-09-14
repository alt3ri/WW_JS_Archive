"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharRenderShell = void 0);
const cpp_1 = require("cpp"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  GameBudgetInterfaceController_1 = require("../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GameBudgetAllocatorConfigCreator_1 = require("../../../World/Define/GameBudgetAllocatorConfigCreator"),
  RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig");
class CharRenderShell {
  constructor() {
    (this.RenderingComponent = void 0),
      (this.LYa = !1),
      (this.yW = void 0),
      (this.d3a = void 0),
      (this.C3a = (e) => {
        this.yW &&
          cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(
            GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
              .TsCharacterRenderConfig.GroupName,
            this.yW,
            e,
          );
      }),
      (this.ScheduledAfterTick = void 0),
      (this.OnEnabledChange = void 0),
      (this.Zka = !1),
      (this.eNa = 0),
      (this.LocationProxyFunction = void 0);
  }
  get IsAlwaysTick() {
    return this.LYa;
  }
  Init(e) {
    (this.RenderingComponent = e),
      (this.LYa = 5 === e.RenderType || 6 === e.RenderType),
      this.LYa || this.A4i();
  }
  Clear() {
    this.LYa || this.tNa();
  }
  A4i() {
    var e;
    CharRenderShell.CharRenderShellGameBudgetOptimize &&
      this.RenderingComponent &&
      (this.yW &&
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "HudUnit",
            37,
            "CharRenderShell RegisterTick: 重复注册Tick",
            ["RenderingComponent", this.RenderingComponent],
            ["Actor", this.RenderingComponent.GetCachedOwner()],
          ),
        this.tNa()),
      (this.eNa = Time_1.Time.WorldTimeSeconds),
      (e =
        GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
          .TsCharacterRenderConfig),
      (this.yW =
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(
          e.GroupName,
          e.SignificanceGroup,
          this,
          this.RenderingComponent.GetCachedOwner(),
        )),
      (e = this.RenderingComponent.GetOwner())) &&
      ((this.d3a = e),
      EventSystem_1.EventSystem.AddWithTarget(
        this.d3a,
        EventDefine_1.EEventName.OnMarkActorInFighting,
        this.C3a,
      ));
  }
  tNa() {
    CharRenderShell.CharRenderShellGameBudgetOptimize &&
      (this.d3a &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.d3a,
          EventDefine_1.EEventName.OnMarkActorInFighting,
          this.C3a,
        ),
        (this.d3a = void 0)),
      this.yW) &&
      (GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
        this,
      ),
      (this.yW = void 0));
  }
  ScheduledTick(e, r, t) {
    RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickRenderShell?.Start();
    try {
      this.Tick(e);
    } catch (e) {
      e instanceof Error &&
        Log_1.Log.CheckError() &&
        Log_1.Log.ErrorWithStack("Render", 26, "RenderShell Tick执行异常", e, [
          "error",
          e.message,
        ]);
    }
    RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickRenderShell?.Stop();
  }
  OnWasRecentlyRenderedOnScreenChange(e) {
    (this.Zka = e), this.Zka || (this.eNa = Time_1.Time.WorldTimeSeconds);
  }
  Tick(t) {
    if (
      (Info_1.Info.IsInEditorTick() || this.LYa || this.Zka) &&
      this.RenderingComponent &&
      (!TickSystem_1.TickSystem.IsPaused ||
        5 === this.RenderingComponent.RenderType ||
        6 === this.RenderingComponent.RenderType ||
        0 < this.RenderingComponent.IsUiUpdate)
    ) {
      RenderModuleConfig_1.RenderStats.StatCharRenderShellTick.Start();
      let e = t,
        r =
          (0 < this.eNa &&
            ((e += Time_1.Time.WorldTimeSeconds - this.eNa), (this.eNa = 0)),
          0);
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        (r = cpp_1.KuroTime.GetMilliseconds64()),
        this.RenderingComponent.Tick(e),
        PerformanceController_1.PerformanceController
          .IsEntityTickPerformanceTest &&
          (t = this.RenderingComponent.GetOwner()) instanceof
            TsBaseCharacter_1.default &&
          PerformanceController_1.PerformanceController.CollectComponentTickPerformanceInfo(
            t.EntityId,
            "CharRenderingComponent",
            !0,
            cpp_1.KuroTime.GetMilliseconds64() - r,
          ),
        RenderModuleConfig_1.RenderStats.StatCharRenderShellTick.Stop();
    }
  }
}
(exports.CharRenderShell = CharRenderShell).CharRenderShellGameBudgetOptimize =
  !0;
//# sourceMappingURL=CharRenderShell.js.map
