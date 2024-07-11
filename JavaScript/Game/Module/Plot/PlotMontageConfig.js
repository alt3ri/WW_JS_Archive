"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotMontageConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const AbpMontageDataById_1 = require("../../../Core/Define/ConfigQuery/AbpMontageDataById");
const MontageDataById_1 = require("../../../Core/Define/ConfigQuery/MontageDataById");
const OverlayAbpMontageDataById_1 = require("../../../Core/Define/ConfigQuery/OverlayAbpMontageDataById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PlotMontageConfig extends ConfigBase_1.ConfigBase {
  GetPlotMontageConfig(e) {
    const o = MontageDataById_1.configMontageDataById.GetConfig(e, !1);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Plot", 43, "找不到剧情蒙太奇配置", [
            "Montage ID",
            e,
          ])),
      o
    );
  }
  GetPlotAbpMontageConfig(e) {
    const o = AbpMontageDataById_1.configAbpMontageDataById.GetConfig(e, !1);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Plot", 39, "找不到剧情ABP蒙太奇配置", [
            "Montage ID",
            e,
          ])),
      o
    );
  }
  GetOverlayAbpMontageConfig(e) {
    const o =
      OverlayAbpMontageDataById_1.configOverlayAbpMontageDataById.GetConfig(
        e,
        !1,
      );
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Plot", 43, "找不到剧情叠加ABP蒙太奇配置", [
            "Montage ID",
            e,
          ])),
      o
    );
  }
}
exports.PlotMontageConfig = PlotMontageConfig;
// # sourceMappingURL=PlotMontageConfig.js.map
