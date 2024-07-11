"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherMenuConfig = void 0);
const puerts_1 = require("puerts");
class LauncherMenuConfig {
  constructor(e, n) {
    (this.FunctionId = e), (this.OptionsDefault = n);
  }
  static GetTableName() {
    return LauncherMenuConfig.mSr;
  }
  static GetLanguageTableName() {
    return LauncherMenuConfig.dSr;
  }
  static GetTableFile() {
    return LauncherMenuConfig.CSr;
  }
  static Parse(e) {
    var n = (0, puerts_1.$ref)(void 0);
    if (e.GetInt("FunctionId", n)) {
      var u = (0, puerts_1.$ref)(void 0);
      if (e.GetInt("OptionsDefault", u))
        return new LauncherMenuConfig(
          (0, puerts_1.$unref)(n),
          (0, puerts_1.$unref)(u),
        );
    }
  }
  static ParseLanguageDefine(e) {
    var n = (0, puerts_1.$ref)(void 0);
    if (e.GetInt("LanguageType", n)) {
      var u = (0, puerts_1.$ref)(void 0);
      if (e.GetBool("IsShow", u))
        return new LaunchLanguageDefineConfig(
          (0, puerts_1.$unref)(n),
          (0, puerts_1.$unref)(u),
        );
    }
  }
}
((exports.LauncherMenuConfig = LauncherMenuConfig).mSr = "MenuConfig"),
  (LauncherMenuConfig.dSr = "LanguageDefine"),
  (LauncherMenuConfig.CSr = "s.设置系统.xlsx");
class LaunchLanguageDefineConfig {
  constructor(e, n) {
    (this.LanguageType = e), (this.IsShow = n);
  }
}
//# sourceMappingURL=LauncherMenuConfig.js.map
