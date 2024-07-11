"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReportConfig = void 0);
const BanInfoById_1 = require("../../../Core/Define/ConfigQuery/BanInfoById");
const ReportPlayerInfoAll_1 = require("../../../Core/Define/ConfigQuery/ReportPlayerInfoAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const BanInfoByTypeAndReason_1 = require("../../../Core/Define/ConfigQuery/BanInfoByTypeAndReason");
class ReportConfig extends ConfigBase_1.ConfigBase {
  GetReportConfigList() {
    return ReportPlayerInfoAll_1.configReportPlayerInfoAll.GetConfigList();
  }
  GetBanInfoById(e) {
    return BanInfoById_1.configBanInfoById.GetConfig(e);
  }
  GetBanInfoByTypeAndReason(e, n) {
    return BanInfoByTypeAndReason_1.configBanInfoByTypeAndReason.GetConfig(
      e,
      n,
    );
  }
}
exports.ReportConfig = ReportConfig;
// # sourceMappingURL=ReportConfig.js.map
