"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const InstanceDungeonAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonAll");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LoginConfig extends ConfigBase_1.ConfigBase {
  GetAllInstanceDungeon() {
    return InstanceDungeonAll_1.configInstanceDungeonAll.GetConfigList();
  }
  GetInstanceDungeonNameById(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetLoginFailResetTime() {
    const e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "login_fail_reset_time",
    );
    return (
      e === 0 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Login", 9, "登录失败次数重置参数错误", [
          "loginFailResetTime",
          e,
        ]),
      e
    );
  }
  GetLoginFailParam(n) {
    const r =
      CommonParamById_1.configCommonParamById.GetStringConfig(
        "login_fail_params",
      );
    const o = r.split(/[,|]/g);
    if (o.length === 0 || o.length % 2 != 0)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Login", 9, "登录失败重试参数错误, 请检查个数", [
            "params",
            r,
          ]),
        0
      );
    let i = 0;
    for (let e = 0; e < o.length; e += 2) {
      const a = Number(o[e]);
      const t = Number(o[e + 1]);
      if (isNaN(a) || a <= 0 || isNaN(t) || t <= 0)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Login", 9, "登录失败重试参数错误, ", [
              "params",
              r,
            ]),
          0
        );
      a <= n && (i = t);
    }
    return i;
  }
  GetDefaultSingleMapId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "default_single_map_id",
    );
  }
  GetDefaultMultiMapId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "default_multi_map_id",
    );
  }
  GetSdkReloginTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "sdk_relogin_time",
    );
  }
  GetDevLoginServerIp() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "dev_sdk_loginserver_ip",
    );
  }
  GetMainlineLoginServerIp() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "mainline_sdk_loginserver_ip",
    );
  }
}
exports.LoginConfig = LoginConfig;
// # sourceMappingURL=LoginConfig.js.map
