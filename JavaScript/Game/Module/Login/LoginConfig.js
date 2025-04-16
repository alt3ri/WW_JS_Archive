"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  InstanceDungeonAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonAll"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ServerLimitById_1 = require("../../../Core/Define/ConfigQuery/ServerLimitById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LoginConfig extends ConfigBase_1.ConfigBase {
  GetAllInstanceDungeon() {
    return InstanceDungeonAll_1.configInstanceDungeonAll.GetConfigList();
  }
  GetInstanceDungeonNameById(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetLoginFailResetTime() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "login_fail_reset_time",
    );
    return (
      0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Login", 8, "登录失败次数重置参数错误", [
          "loginFailResetTime",
          e,
        ]),
      e
    );
  }
  GetLoginFailParam(n) {
    var o =
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "login_fail_params",
        ),
      r = o.split(/[,|]/g);
    if (0 === r.length || r.length % 2 != 0)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Login", 8, "登录失败重试参数错误, 请检查个数", [
            "params",
            o,
          ]),
        0
      );
    let i = 0;
    for (let e = 0; e < r.length; e += 2) {
      var t = Number(r[e]),
        a = Number(r[e + 1]);
      if (isNaN(t) || t <= 0 || isNaN(a) || a <= 0)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Login", 8, "登录失败重试参数错误, ", [
              "params",
              o,
            ]),
          0
        );
      t <= n && (i = a);
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
  GetLoginViewNoExitButtonPackageIdList() {
    return CommonParamById_1.configCommonParamById
      .GetStringConfig("LoginViewNoShowExitButtonPackageIdList")
      .split(",");
  }
  GetLoginViewNoAccountButtonPackageIdList() {
    return CommonParamById_1.configCommonParamById
      .GetStringConfig("LoginViewNoAccountButtonPackageIdList")
      .split(",");
  }
  GetServerLimitConfig(e) {
    return ServerLimitById_1.configServerLimitById.GetConfig(e);
  }
}
exports.LoginConfig = LoginConfig;
//# sourceMappingURL=LoginConfig.js.map
