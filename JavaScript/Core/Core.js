"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Core = void 0);
const cpp_1 = require("cpp"),
  ActorSystem_1 = require("./Actor/ActorSystem"),
  Application_1 = require("./Application/Application"),
  Info_1 = require("./Common/Info"),
  Log_1 = require("./Common/Log"),
  Logo_1 = require("./Common/Logo"),
  Time_1 = require("./Common/Time"),
  ProxyLru_1 = require("./Container/ProxyLru"),
  ConfigStatement_1 = require("./Define/ConfigQuery/ConfigStatement"),
  EffectEnvironment_1 = require("./Effect/EffectEnvironment"),
  EntityComponentSystem_1 = require("./Entity/EntityComponentSystem"),
  EntitySystem_1 = require("./Entity/EntitySystem"),
  GameBudgetInterfaceController_1 = require("./GameBudgetAllocator/GameBudgetInterfaceController"),
  Net_1 = require("./Net/Net"),
  ObjectSystem_1 = require("./Object/ObjectSystem"),
  CycleCounter_1 = require("./Performance/CycleCounter"),
  TickSystem_1 = require("./Tick/TickSystem"),
  TimerSystem_1 = require("./Timer/TimerSystem");
class Core {
  constructor() {}
  static Initialize(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Core", 0, Logo_1.LOGO),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Core", 0, Info_1.Info.Version),
      Info_1.Info.Initialize(e),
      Log_1.Log.SetLevel(3),
      CycleCounter_1.CycleCounter.SetEnable(!Info_1.Info.IsBuildShipping),
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.InitializeEnvironment(
        e.GetWorld()
      ),
      Time_1.Time.Initialize(),
      Net_1.Net.Initialize(),
      TickSystem_1.TickSystem.Initialize(e),
      ConfigStatement_1.ConfigStatement.Init(),
      ObjectSystem_1.ObjectSystem.Initialize(),
      EntitySystem_1.EntitySystem.Initialize(),
      EntityComponentSystem_1.EntityComponentSystem.Initialize(),
      Application_1.Application.Initialize(),
      ActorSystem_1.ActorSystem.Initialize(),
      EffectEnvironment_1.EffectEnvironment.Initialize(),
      (ProxyLru_1.ProxyLru.ProxyLruEnable = Info_1.Info.IsPlayInEditor),
      TickSystem_1.TickSystem.Add(this.Tick, "Core", 0, !0),
      TickSystem_1.TickSystem.Add(this.AfterTick, "Core", 4, !0);
  }
  static RegisterPreTick(e) {
    this.br.has(e)
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Core",
          6,
          "[Core.RegisterPreTickFunctions] 已经注册过PreTickfunc"
        )
      : this.br.add(e);
  }
  static UnRegisterPreTick(e) {
    this.br.has(e)
      ? this.br.delete(e)
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Core",
          6,
          "[Core.UnRegisterPreTick] 未注册的PreTickfunc"
        );
  }
}
(exports.Core = Core),
  ((_a = Core).br = new Set()),
  (Core.Tick = (e) => {
    if (
      (CycleCounter_1.CycleCounter.RefreshState(),
      !TickSystem_1.TickSystem.IsPaused)
    )
      for (const r of _a.br) r(e);
    var t = e / 1e3;
    Net_1.Net.Tick(t),
      Time_1.Time.Tick(e),
      TimerSystem_1.TimerSystem.Tick(e),
      TickSystem_1.TickSystem.IsPaused ||
        (EffectEnvironment_1.EffectEnvironment.Tick(e, Info_1.Info.World),
        Info_1.Info.EnableForceTick && EntitySystem_1.EntitySystem.ForceTick(e),
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateBudgetTime(
          e
        )),
      cpp_1.FKuroGameBudgetAllocatorInterface.TickOutside(t),
      TickSystem_1.TickSystem.IsPaused || EntitySystem_1.EntitySystem.Tick(e);
  }),
  (Core.AfterTick = (e) => {
    TickSystem_1.TickSystem.IsPaused ||
      (Info_1.Info.EnableForceTick &&
        EntitySystem_1.EntitySystem.ForceAfterTick(e)),
      cpp_1.FKuroGameBudgetAllocatorInterface.AfterTickOutside(e / 1e3),
      TickSystem_1.TickSystem.IsPaused ||
        EntitySystem_1.EntitySystem.AfterTick(e);
  });
