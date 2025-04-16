"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherDownLoadConfig = void 0);
const puerts_1 = require("puerts");
class LauncherDownLoadConfig {
  constructor(e, t, o) {
    (this.Title = e), (this.ContentTitle = t), (this.Content = o);
  }
  static GetTableName() {
    return LauncherDownLoadConfig._Sr;
  }
  static Parse(e) {
    var t = (0, puerts_1.$ref)(void 0),
      o = (0, puerts_1.$ref)(void 0);
    if (e.GetString("Title", o) && e.GetString("ContentTitle", t)) {
      var r = (0, puerts_1.$ref)(void 0);
      if (e.GetString("Content", r))
        return new LauncherDownLoadConfig(
          (0, puerts_1.$unref)(o),
          (0, puerts_1.$unref)(t),
          (0, puerts_1.$unref)(r),
        );
    }
  }
}
(exports.LauncherDownLoadConfig = LauncherDownLoadConfig)._Sr = "DownLoadTab";
//# sourceMappingURL=LauncherDownLoadConfig.js.map
