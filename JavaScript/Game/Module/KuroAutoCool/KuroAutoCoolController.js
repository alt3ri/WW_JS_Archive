"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroAutoCoolController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  GameSettingsManager_1 = require("../../../Game/GameSettings/GameSettingsManager"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
class KuroAutoCoolController extends ControllerBase_1.ControllerBase {
  static SetMaxFrameRate(o) {
    var e = UE.GameUserSettings.GetGameUserSettings();
    e.SetFrameRateLimit(o), e.ApplySettings(!0);
  }
  static RestoreLastConfig() {
    var o = GameSettingsManager_1.GameSettingsManager.Get(11);
    return o
      ? ((o = o.GetCurrentValue()),
        (o =
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameByList(
            o,
          )),
        this.SetMaxFrameRate(o),
        o)
      : 0;
  }
  static OnTick(o) {
    var e, r;
    0 <
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
        "r.Kuro.AutoCoolEnable",
      ) &&
      ((e =
        0 <
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
          "r.Kuro.AutoCoolUIEnable",
        )),
      Platform_1.Platform.IsMobilePlatform()) &&
      e &&
      ((e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
        "r.Kuro.AutoCoolCpuTempThreshold",
      )),
      (r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
        "r.Kuro.AutoCoolFrameRate",
      )),
      (this.yXa += o),
      (this.$Xr += o),
      this.yXa > this.EXa) &&
      ((o = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCpuTemperature()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 69, "当前CPU温度", ["CpuTemperature", o]),
      (this.yXa = 0),
      (this.IXa += o * this.TXa),
      this.$Xr > this.LXa) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 69, "平均CPU温度", [
          "AvgCpuTemperature",
          this.IXa,
        ]),
      (this.$Xr = 0),
      this.IXa < e
        ? ((o = this.RestoreLastConfig()),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Render", 69, "退出自动降温阶段", [
              "恢复至最大帧率",
              o,
            ]))
        : this.IXa > e &&
          (this.SetMaxFrameRate(r), Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Render", 69, "进入自动降温阶段", [
            "降温至最大帧率",
            r,
          ]),
      (this.IXa = 0));
  }
}
(exports.KuroAutoCoolController = KuroAutoCoolController),
  ((_a = KuroAutoCoolController).EXa =
    UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
      "r.Kuro.AutoCoolStatTime",
    )),
  (KuroAutoCoolController.LXa =
    UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat(
      "r.Kuro.AutoCoolCheckTime",
    )),
  (KuroAutoCoolController.TXa = _a.EXa / _a.LXa),
  (KuroAutoCoolController.yXa = 0),
  (KuroAutoCoolController.$Xr = 0),
  (KuroAutoCoolController.IXa = 0);
//# sourceMappingURL=KuroAutoCoolController.js.map
