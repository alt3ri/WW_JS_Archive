"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroPerformanceController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
  BOOST_SWITCH = !1,
  TEMPERATURE_SWITCH = !1,
  BOOST_TIME = 1e4;
class KuroPerformanceController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
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
      (this.uGo = (0, puerts_1.toManualReleaseDelegate)(this.w2n)),
      !0
    );
  }
  static OnClear() {
    return (
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
      (0, puerts_1.releaseManualReleaseDelegate)(this.w2n),
      !0
    );
  }
  static OnTick(e) {
    (this.HFt += e),
      this.HFt > BOOST_TIME &&
        ((this.HFt = 0), this.Nyn(), 0 < this.gLn.size) &&
        this.kyn(!0);
  }
  static Open(e) {
    var r, t;
    return BOOST_SWITCH
      ? ((r = ++this.fLn),
        this.gLn.set(r, e),
        1 < this.gLn.size ||
          ((t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
            .GetCurrentQualityInfo()
            .GetFrameRate()),
          UE.KuroPerformanceBPLibrary.SetTargetFPS(t),
          UE.KuroPerformanceBPLibrary.PredictWorkload(200, 0),
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
  static Nyn() {
    TEMPERATURE_SWITCH &&
      UE.KuroPerformanceBPLibrary.GetCurrentTemperatureData(this.uGo);
  }
  static kyn(e) {
    UE.KuroPerformanceBPLibrary.BoostCPU(e ? 100 : 0, BOOST_TIME) &&
      e &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Performance", 29, "KuroPerformanceController.BoostCpu");
  }
}
(exports.KuroPerformanceController = KuroPerformanceController),
  ((_a = KuroPerformanceController).HFt = 0),
  (KuroPerformanceController.fLn = 0),
  (KuroPerformanceController.gLn = new Map()),
  (KuroPerformanceController.pLn = 0),
  (KuroPerformanceController.vLn = 0),
  (KuroPerformanceController.b2n = !1),
  (KuroPerformanceController.uGo = void 0),
  (KuroPerformanceController.Zpe = (e) => {
    e ? (_a.pLn = _a.Open("Battle")) : _a.Close(_a.pLn);
  }),
  (KuroPerformanceController.zfi = (e) => {
    0 < _a.gLn.size && UE.KuroPerformanceBPLibrary.SetTargetFPS(e);
  }),
  (KuroPerformanceController.Zfi = (e, r) => {
    e && !r ? (_a.vLn = _a.Open("PerformanceLimitMode")) : _a.Close(_a.vLn);
  }),
  (KuroPerformanceController.w2n = (e, r, t) => {
    if (e) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Performance",
          29,
          "KuroPerformanceController.OnGetCurrentTemperature",
          ["CurrentTemperature", r],
          ["TempBudget", t],
        );
      (e =
        GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo()),
        (r = e.GetFrameRate());
      if (t < 5) 30 <= r && ((_a.b2n = !0), e.SetFrameRateTemploary(30));
      else if (t < 10) 45 <= r && ((_a.b2n = !0), e.SetFrameRateTemploary(45));
      else {
        if (!_a.b2n) return;
        (_a.b2n = !1), e.CancelFrameRateTemploary();
      }
      e.ApplyFrameRate();
    }
  });
//# sourceMappingURL=KuroPerformanceController.js.map
