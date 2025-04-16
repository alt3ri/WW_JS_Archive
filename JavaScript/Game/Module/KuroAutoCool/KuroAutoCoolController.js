"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroAutoCoolController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  GameSettingsDeviceRender_1 = require("../../../Game/GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../../Game/GameSettings/GameSettingsManager"),
  GameSettingsUtils_1 = require("../../../Game/GameSettings/GameSettingsUtils"),
  GlobalData_1 = require("../../../Game/GlobalData"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  KuroPerformanceController_1 = require("../KuroPerformance/KuroPerformanceController");
class KuroAutoCoolController extends ControllerBase_1.ControllerBase {
  static SetMaxFrameRate(e) {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "t.MaxFPS " + e,
    );
  }
  static GetCurrentValue(e) {
    return GameSettingsManager_1.GameSettingsManager.GetCurrentValue(e);
  }
  static ApplyNiagaraQuality(e) {
    var t =
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIosAndAndroidHighDevice();
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "r.DisableDistortion " + (0 < e && t ? 0 : 1),
    ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "fx.Niagara.QualityLevel " + (0 < e ? 1 : 0),
      );
  }
  static ApplyMobileResolution(e) {
    let t =
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMobileResolutionByIndex(
        e,
      );
    e = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
      "r.SecondaryScreenPercentage.GameViewport",
    );
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution()
      .Y < 750 &&
      e < 70 &&
      (t = Math.min(1.5 * t, 100)),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.ScreenPercentage " + t,
      );
  }
  static ReduceImageQualityAndFrameRate() {
    let e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetMaxFps(),
      t = this.GetCurrentValue(GameSettingsDefine_1.EFunction.MOBILERESOLUTION),
      i = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY),
      r = this.GetCurrentValue(GameSettingsDefine_1.EFunction.VOLUMELIGHT),
      o = this.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEDETAIL),
      s = this.GetCurrentValue(GameSettingsDefine_1.EFunction.SHADOWQUALITY),
      a = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NPCDENSITY);
    this.RKo &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Render",
        68,
        "自动降温触发前",
        ["CurrentFps", e],
        ["Resolution", t],
        ["Niagara", i],
        ["ImageDetail", o],
        ["VolumeLight", r],
        ["Shadow", s],
        ["NpcDensity", a],
      ),
      55 < e
        ? ((this.cZa = !0),
          this.SetMaxFrameRate(55),
          (e = 55),
          i &&
            i > this.nMl &&
            (this.ApplyNiagaraQuality(this.nMl), (i = this.nMl)),
          t &&
            t > this.sMl &&
            (this.ApplyMobileResolution(this.sMl), (t = this.sMl)))
        : 50 < e && e <= 55
          ? ((this.cZa = !0),
            this.SetMaxFrameRate(50),
            (e = 50),
            r &&
              r > this.aMl &&
              (GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeLight(this.aMl),
              (r = this.aMl)),
            o &&
              o > this.lMl &&
              (GameSettingsUtils_1.GameSettingsUtils.ApplyImageDetail(this.lMl),
              (o = this.lMl)))
          : 45 < e && e <= 50
            ? ((this.cZa = !0),
              this.SetMaxFrameRate(45),
              (e = 45),
              a &&
                a > this.hMl &&
                (GameSettingsUtils_1.GameSettingsUtils.ApplyNpcDensity(
                  this.hMl,
                ),
                (a = this.hMl)))
            : 40 < e &&
              e <= 45 &&
              ((this.cZa = !0), this.SetMaxFrameRate(40), (e = 40), s) &&
              s > this._Ml &&
              (GameSettingsUtils_1.GameSettingsUtils.ApplyShadowQuality(
                this._Ml,
              ),
              (s = this._Ml)),
      this.RKo &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Render",
          68,
          "自动降温触发后",
          ["CurrentFps", e],
          ["Resolution", t],
          ["Niagara", i],
          ["ImageDetail", o],
          ["VolumeLight", r],
          ["NpcDensity", a],
          ["Shadow", s],
        );
  }
  static RestoreImageQualityAndFrameRate() {
    this.cZa = !1;
    let e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetMaxFps();
    var t = this.GetCurrentValue(
        GameSettingsDefine_1.EFunction.MOBILERESOLUTION,
      ),
      i = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY),
      r = this.GetCurrentValue(GameSettingsDefine_1.EFunction.VOLUMELIGHT),
      o = this.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEDETAIL),
      s = this.GetCurrentValue(GameSettingsDefine_1.EFunction.SHADOWQUALITY),
      a = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NPCDENSITY);
    this.RKo &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Render", 68, "自动降温恢复前", ["CurrentFps", e]),
      55 <= e && e < 60
        ? (this.SetMaxFrameRate(60),
          (e = 60),
          i && i > this.nMl && this.ApplyNiagaraQuality(i),
          t && t > this.sMl && this.ApplyMobileResolution(t))
        : 50 <= e && e < 55
          ? (this.SetMaxFrameRate(55),
            (e = 55),
            r &&
              r > this.aMl &&
              GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeLight(r),
            o &&
              o > this.lMl &&
              GameSettingsUtils_1.GameSettingsUtils.ApplyImageDetail(o))
          : 45 <= e && e < 50
            ? (this.SetMaxFrameRate(50),
              (e = 50),
              a &&
                a > this.hMl &&
                GameSettingsUtils_1.GameSettingsUtils.ApplyNpcDensity(a))
            : 40 <= e &&
              e < 45 &&
              (this.SetMaxFrameRate(45), (e = 45), s) &&
              s > this._Ml &&
              GameSettingsUtils_1.GameSettingsUtils.ApplyShadowQuality(s),
      this.RKo &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Render",
          68,
          "自动降温恢复后",
          ["CurrentFps", e],
          ["Resolution", t],
          ["Niagara", i],
          ["ImageDetail", o],
          ["VolumeLight", r],
          ["NpcDensity", a],
          ["Shadow", s],
        );
  }
  static ltl() {
    var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCpuTemperature();
    this.RKo &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Render", 68, "当前CPU温度", ["CpuTemperature", e]),
      (this.$Xr = 0),
      this.cZa && e < this.a_l
        ? this.RestoreImageQualityAndFrameRate()
        : e >= this.a_l && this.ReduceImageQualityAndFrameRate();
  }
  static OnInit() {
    return (
      (this.TemperatureDelegate = (0, puerts_1.toManualReleaseDelegate)(
        this.htl,
      )),
      !(this.cZa = !1)
    );
  }
  static OnClear() {
    return (0, puerts_1.releaseManualReleaseDelegate)(this.htl), !0;
  }
  static OnTick(e) {
    var t;
    0 <
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
        "r.Kuro.AutoCoolEnable",
      ) &&
      ((t =
        0 <
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
          "r.Kuro.AutoCoolUIEnable",
        )),
      Platform_1.Platform.IsMobilePlatform()) &&
      t &&
      ((this.$Xr += e), this.$Xr > this.uZa) &&
      (KuroPerformanceController_1.KuroPerformanceController.IsEnable
        ? UE.KuroPerformanceBPLibrary.GetCurrentTemperatureData(
            this.TemperatureDelegate,
          )
        : this.ltl(),
      (this.$Xr = 0));
  }
}
(exports.KuroAutoCoolController = KuroAutoCoolController),
  ((_a = KuroAutoCoolController).uZa = 1e4),
  (KuroAutoCoolController.RKo = !0),
  (KuroAutoCoolController.a_l = 65),
  (KuroAutoCoolController.$Xr = 0),
  (KuroAutoCoolController.cZa = !1),
  (KuroAutoCoolController.sMl = 1),
  (KuroAutoCoolController.nMl = 1),
  (KuroAutoCoolController.lMl = 1),
  (KuroAutoCoolController.aMl = 0),
  (KuroAutoCoolController.hMl = 1),
  (KuroAutoCoolController._Ml = 1),
  (KuroAutoCoolController.TemperatureDelegate = void 0),
  (KuroAutoCoolController.htl = (e, t, i) => {
    _a.RKo &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Render",
        68,
        "KuroAutoCoolController.temperature",
        ["bResult", e],
        ["currentTemperature", t],
        ["tempBudget", i],
      ),
      !e || i <= 5
        ? _a.ReduceImageQualityAndFrameRate()
        : _a.cZa && _a.RestoreImageQualityAndFrameRate();
  });
//# sourceMappingURL=KuroAutoCoolController.js.map
