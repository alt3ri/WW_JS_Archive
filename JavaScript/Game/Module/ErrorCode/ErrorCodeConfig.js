"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ErrorCodeConfig = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ErrorCodeById_1 = require("../../../Core/Define/ConfigQuery/ErrorCodeById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class ErrorCodeConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.Q5t = 0);
  }
  SetForceShowDebugErrorType(r) {
    this.Q5t = r;
  }
  GetConfigByCode(r) {
    var e = ErrorCodeById_1.configErrorCodeById.GetConfig(r);
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
      ? Info_1.Info.IsBuildDevelopmentOrDebug && 0 === this.Q5t
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
//# sourceMappingURL=ErrorCodeConfig.js.map
