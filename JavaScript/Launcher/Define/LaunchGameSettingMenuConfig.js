"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LaunchGameSettingMenuConfig = void 0);
const puerts_1 = require("puerts"),
  LauncherLog_1 = require("../Util/LauncherLog");
class LaunchGameSettingMenuConfig {
  constructor(e, t, n) {
    (this.FunctionId = e), (this.OptionsDefault = t), (this.SliderDefault = n);
  }
  static GetTableName() {
    return LaunchGameSettingMenuConfig._Sr;
  }
  static GetLanguageTableName() {
    return LaunchGameSettingMenuConfig.uSr;
  }
  static GetTableFile() {
    return LaunchGameSettingMenuConfig.cSr;
  }
  static Parse(e) {
    var t = (0, puerts_1.$ref)(void 0);
    if (e.GetInt("FunctionId", t)) {
      var n = (0, puerts_1.$ref)(void 0);
      if (e.GetInt("OptionsDefault", n)) {
        var u = (0, puerts_1.$ref)(void 0);
        if (e.GetFloat("SliderDefault", u))
          return new LaunchGameSettingMenuConfig(
            (0, puerts_1.$unref)(t),
            (0, puerts_1.$unref)(n),
            (0, puerts_1.$unref)(u),
          );
        LauncherLog_1.LauncherLog.Warn(
          "[GameSettings]解析MenuConfig失败-找不到SliderDefault",
        );
      } else
        LauncherLog_1.LauncherLog.Warn(
          "[GameSettings]解析MenuConfig失败-找不到OptionsDefault",
        );
    } else
      LauncherLog_1.LauncherLog.Warn(
        "[GameSettings]解析MenuConfig失败-找不到FunctionId",
      );
  }
  GetDefaultValue() {
    return 0 !== this.SliderDefault ? this.SliderDefault : this.OptionsDefault;
  }
}
((exports.LaunchGameSettingMenuConfig = LaunchGameSettingMenuConfig)._Sr =
  "MenuConfig"),
  (LaunchGameSettingMenuConfig.uSr = "LanguageDefine"),
  (LaunchGameSettingMenuConfig.cSr = "s.设置系统.xlsx");
//# sourceMappingURL=LaunchGameSettingMenuConfig.js.map
