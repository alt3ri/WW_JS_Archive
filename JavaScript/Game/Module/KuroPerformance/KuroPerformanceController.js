"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroPerformanceController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager");
const BOOST_SWITCH = !1;
const TEMPERATURE_SWITCH = !0;
const BOOST_TIME = 1e4;
class KuroPerformanceController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SettingFrameRateChanged,
        this.z0i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangePerformanceLimitMode,
        this.Z0i,
      ),
      (this.dqo = (0, puerts_1.toManualReleaseDelegate)(this.Rqn)),
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
        this.z0i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangePerformanceLimitMode,
        this.Z0i,
      ),
      (0, puerts_1.releaseManualReleaseDelegate)(this.Rqn),
      !0
    );
  }
  static OnTick(e) {
    (this.V2t += e),
      this.V2t > BOOST_TIME &&
        ((this.V2t = 0), this.xEn(), this.wEn(e), this.JIn.size > 0) &&
        this.BEn(!0);
  }
  static Open(e) {
    let r, t;
    return BOOST_SWITCH
      ? ((r = ++this.zIn),
        this.JIn.set(r, e),
        this.JIn.size > 1 ||
          ((t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
            .GetCurrentQualityInfo()
            .GetFrameRate()),
          UE.KuroPerformanceBPLibrary.SetTargetFPS(t),
          UE.KuroPerformanceBPLibrary.PredictWorkload(200, 0),
          this.BEn(!0),
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
    let r;
    BOOST_SWITCH &&
      ((r = this.JIn.get(e))
        ? (this.JIn.delete(e),
          this.JIn.size > 0 ||
            (UE.KuroPerformanceBPLibrary.SetTargetFPS(0),
            UE.KuroPerformanceBPLibrary.PredictWorkload(0, 0),
            this.BEn(!1),
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
  static xEn() {
    TEMPERATURE_SWITCH &&
      UE.KuroPerformanceBPLibrary.GetCurrentTemperatureData(this.dqo);
  }
  static wEn(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Performance", 29, "KuroPerformanceController.GetFps", [
        "FPS",
        (1 / (e * TimeUtil_1.TimeUtil.Millisecond)).toFixed(2),
      ]);
  }
  static BEn(e) {
    UE.KuroPerformanceBPLibrary.BoostCPU(e ? 100 : 0, BOOST_TIME) &&
      e &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Performance", 29, "KuroPerformanceController.BoostCpu");
  }
}
(exports.KuroPerformanceController = KuroPerformanceController),
  ((_a = KuroPerformanceController).V2t = 0),
  (KuroPerformanceController.zIn = 0),
  (KuroPerformanceController.JIn = new Map()),
  (KuroPerformanceController.ZIn = 0),
  (KuroPerformanceController.eTn = 0),
  (KuroPerformanceController.xqn = !1),
  (KuroPerformanceController.dqo = void 0),
  (KuroPerformanceController.Zpe = (e) => {
    e ? (_a.ZIn = _a.Open("Battle")) : _a.Close(_a.ZIn);
  }),
  (KuroPerformanceController.z0i = (e) => {
    _a.JIn.size > 0 && UE.KuroPerformanceBPLibrary.SetTargetFPS(e);
  }),
  (KuroPerformanceController.Z0i = (e, r) => {
    e && !r ? (_a.eTn = _a.Open("PerformanceLimitMode")) : _a.Close(_a.eTn);
  }),
  (KuroPerformanceController.Rqn = (e, r, t) => {
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
      if (t < 5) r >= 30 && ((_a.xqn = !0), e.SetFrameRateTemploary(30));
      else if (t < 10) r >= 45 && ((_a.xqn = !0), e.SetFrameRateTemploary(45));
      else {
        if (!_a.xqn) return;
        (_a.xqn = !1), e.CancelFrameRateTemploary();
      }
      e.ApplyFrameRate();
    }
  });
// # sourceMappingURL=KuroPerformanceController.js.map
