"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroPerformanceController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Application_1 = require("../../../Core/Application/Application"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  BOOST_SWITCH = !0,
  REPORT_SWITCH = !0,
  BOOST_TIME = 1e4;
class KuroPerformanceController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    var e;
    return (
      (this.IsEnable =
        UE.KuroPerformanceBPLibrary.IsPerformanceAdaptiveInitialize()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Performance", 55, "KuroPerformanceController.OnInit", [
          "IsEnable",
          this.IsEnable,
        ]),
      this.IsEnable &&
        ((e =
          UE.KuroPerformanceBPLibrary.GetCurrentActivePerformanceAdaptiveModuleName()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Performance",
            55,
            "KuroPerformanceController.OnInit",
            ["name", e],
          ),
        UE.KuroPerformanceBPLibrary.InitGameConfigSceneTransition(!1),
        Application_1.Application.AddApplicationHandler(
          3,
          KuroPerformanceController.Vza,
        ),
        Application_1.Application.AddApplicationHandler(
          2,
          KuroPerformanceController.Nje,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.SettingFrameRateChanged,
          this.zfi,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangePerformanceLimitMode,
          this.Zfi,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.TeleportStart,
          this.bpr,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.TeleportComplete,
          this.Ilt,
        ),
        (this.Hza = (0, puerts_1.toManualReleaseDelegate)(this.jza))),
      !0
    );
  }
  static OnClear() {
    return (
      this.IsEnable &&
        (Application_1.Application.RemoveApplicationHandler(
          3,
          KuroPerformanceController.Vza,
        ),
        Application_1.Application.RemoveApplicationHandler(
          2,
          KuroPerformanceController.Nje,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.SettingFrameRateChanged,
          this.zfi,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangePerformanceLimitMode,
          this.Zfi,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.TeleportStart,
          this.bpr,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.TeleportComplete,
          this.Ilt,
        ),
        (0, puerts_1.releaseManualReleaseDelegate)(this.jza)),
      !0
    );
  }
  static OnTick(e) {
    this.IsEnable &&
      ((this.HFt += e), this.HFt > BOOST_TIME) &&
      ((this.HFt = 0), this.Wza(), 0 < this.gLn.size) &&
      this.kyn(!0);
  }
  static Open(e) {
    var r, o;
    return BOOST_SWITCH
      ? ((r = ++this.fLn),
        this.gLn.set(r, e),
        1 < this.gLn.size ||
          ((o = GameSettingsDeviceRender_1.GameSettingsDeviceRender.FrameRate),
          UE.KuroPerformanceBPLibrary.SetTargetFPS(o),
          UE.KuroPerformanceBPLibrary.PredictWorkload(150, 0),
          this.kyn(!0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Performance",
              29,
              "KuroPerformanceController.Open",
              ["Reason", e],
              ["Handle", r],
            )),
        r)
      : 0;
  }
  static Close(e) {
    var r;
    BOOST_SWITCH &&
      ((r = this.gLn.get(e))
        ? (this.gLn.delete(e),
          0 < this.gLn.size ||
            (UE.KuroPerformanceBPLibrary.SetTargetFPS(0),
            UE.KuroPerformanceBPLibrary.PredictWorkload(0, 0),
            this.kyn(!1),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Performance",
                29,
                "KuroPerformanceController.Close",
                ["Reason", r],
                ["Handle", e],
              )))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Performance", 29, "性能模式句柄不存在", [
            "Handle",
            e,
          ]));
  }
  static Wza() {
    REPORT_SWITCH &&
      UE.KuroPerformanceBPLibrary.GetTickedPerformanceReportAndAdvice(this.Hza);
  }
  static kyn(e) {
    UE.KuroPerformanceBPLibrary.BoostCPU(e ? 100 : 0, BOOST_TIME) &&
      e &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Performance", 29, "KuroPerformanceController.BoostCpu");
  }
}
(exports.KuroPerformanceController = KuroPerformanceController),
  ((_a = KuroPerformanceController).IsEnable = !0),
  (KuroPerformanceController.HFt = 0),
  (KuroPerformanceController.fLn = 0),
  (KuroPerformanceController.gLn = new Map()),
  (KuroPerformanceController.pLn = 0),
  (KuroPerformanceController.vLn = 0),
  (KuroPerformanceController.RKo = !1),
  (KuroPerformanceController.Hza = void 0),
  (KuroPerformanceController.Vza = () => {
    var e = UE.KuroPerformanceBPLibrary.SetForeground(!0);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Performance",
        55,
        "ApplicationHasEnteredForeground设置前台",
        ["result", e],
      );
  }),
  (KuroPerformanceController.Nje = () => {
    var e = UE.KuroPerformanceBPLibrary.SetForeground(!1);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Performance",
        55,
        "ApplicationWillEnterBackground取消设置前台",
        ["result", e],
      );
  }),
  (KuroPerformanceController.Zpe = (e) => {
    e ? (_a.pLn = _a.Open("Battle")) : _a.Close(_a.pLn);
  }),
  (KuroPerformanceController.zfi = (e) => {
    0 < _a.gLn.size && UE.KuroPerformanceBPLibrary.SetTargetFPS(e);
  }),
  (KuroPerformanceController.Zfi = (e, r) => {
    e && !r ? (_a.vLn = _a.Open("PerformanceLimitMode")) : _a.Close(_a.vLn);
  }),
  (KuroPerformanceController.bpr = () => {
    var e = UE.KuroPerformanceBPLibrary.UpdateGameConfigSceneTransition(!0);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Performance",
        55,
        "KuroPerformanceController.OnTeleportStart",
        ["result", e],
      );
  }),
  (KuroPerformanceController.Ilt = () => {
    var e = UE.KuroPerformanceBPLibrary.UpdateGameConfigSceneTransition(!1);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Performance",
        55,
        "KuroPerformanceController.OnTeleportComplete",
        ["result", e],
      );
  }),
  (KuroPerformanceController.jza = (e) => {
    _a.RKo &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Performance",
        55,
        "KuroPerformanceController.report",
        ["CPULoadStatus", e.CPULoadStatus],
        ["GPULoadStatus", e.GPULoadStatus],
        ["TargetFPS", e.TargetFPS],
        ["CPUPerfIndex", e.CPULoadIndex],
        ["CPULoadIndex", e.CPULoadIndex],
        ["GPUPerfIndex", e.GPUPerfIndex],
        ["GPULoadIndex", e.GPULoadIndex],
        ["CPUFrameTime", e.CPUFrameTime],
        ["GPUFrameTime", e.GPUFrameTime],
        ["CurTemperature", e.CurTemperature],
        ["PerformanceAdvice", e.PerformanceAdvice],
        ["ThermalStatus", e.ThermalStatus],
        ["ThermalTempBudget", e.ThermalTempBudget],
      ),
      0 === e.CPULoadStatus
        ? UE.KuroPerformanceBPLibrary.PredictWorkload(0, 0)
        : 1 === e.CPULoadStatus
          ? UE.KuroPerformanceBPLibrary.PredictWorkload(100, 0)
          : 2 === e.CPULoadStatus
            ? UE.KuroPerformanceBPLibrary.PredictWorkload(150, 0)
            : 2 < e.CPULoadStatus &&
              UE.KuroPerformanceBPLibrary.PredictWorkload(200, 0);
  });
//# sourceMappingURL=KuroPerformanceController.js.map
