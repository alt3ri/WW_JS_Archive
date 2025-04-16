"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherServerLimitConfig = void 0);
const puerts_1 = require("puerts");
class LauncherServerLimitConfig {
  constructor(e) {
    this.CountryCodes = e;
  }
  static GetTableName() {
    return LauncherServerLimitConfig._Sr;
  }
  static Parse(e) {
    var r = (0, puerts_1.$ref)(void 0);
    if (e.GetString("CountryCodes", r))
      return new LauncherServerLimitConfig((0, puerts_1.$unref)(r));
  }
}
(exports.LauncherServerLimitConfig = LauncherServerLimitConfig)._Sr =
  "ServerLimit";
//# sourceMappingURL=LauncherServerLimitConfig.js.map
