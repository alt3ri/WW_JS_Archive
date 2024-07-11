"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfigUtil = void 0);
const Log_1 = require("../../../Core/Common/Log");
class ConfigUtil {
  static jqo(o) {
    o.size > ConfigUtil.Wqo && o.clear();
  }
  static GetConfigTemplate(o, t, e, i = 0) {
    var s = o.get(e);
    return (
      s ||
      (ConfigUtil.jqo(o),
      s
        ? (o.set(e, s), s)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Config",
              11,
              "表格查询不到配置ID",
              ["表格", t],
              ["ID", e],
            )
          ))
    );
  }
}
(exports.ConfigUtil = ConfigUtil).Wqo = 50;
//# sourceMappingURL=ConfigUtil.js.map
