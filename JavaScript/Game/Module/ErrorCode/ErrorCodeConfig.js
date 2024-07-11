"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ErrorCodeConfig = void 0);
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ErrorCodeById_1 = require("../../../Core/Define/ConfigQuery/ErrorCodeById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class ErrorCodeConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.Q4t = 0);
  }
  SetForceShowDebugErrorType(r) {
    this.Q4t = r;
  }
  GetConfigByCode(r) {
    const e = ErrorCodeById_1.configErrorCodeById.GetConfig(r);
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("ErrorCode", 9, "没有错误码配置", ["code", r])),
      e
    );
  }
  GetTextByErrorId(r) {
    r = this.GetConfigByCode(r);
    return r
      ? Info_1.Info.IsBuildDevelopmentOrDebug && this.Q4t === 0
        ? r.DebugText
        : StringUtils_1.StringUtils.IsEmpty(r.Text)
          ? ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "UnknownErrorCodeText",
            )
          : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Text) ?? ""
      : "";
  }
  GetTextKeyByErrorId(r) {
    r = this.GetConfigByCode(r);
    return r
      ? StringUtils_1.StringUtils.IsEmpty(r.Text)
        ? ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "UnknownErrorCodeText",
          )
        : r.Text
      : "";
  }
  IsTipsOnly(r) {
    return this.GetConfigByCode(r)?.IsTip ?? !1;
  }
}
exports.ErrorCodeConfig = ErrorCodeConfig;
// # sourceMappingURL=ErrorCodeConfig.js.map
