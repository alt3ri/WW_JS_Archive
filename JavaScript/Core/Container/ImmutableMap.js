"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ImmutableMap = void 0);
const Log_1 = require("../Common/Log");
class ImmutableMap extends Map {
  set(e, t) {
    return this.ZYa("set"), this;
  }
  delete(e) {
    return this.ZYa("delete"), !1;
  }
  clear() {
    this.ZYa("clear");
  }
  ZYa(e) {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Core", 62, "ImmutableMap 不允许修改", ["函数名", e]);
  }
}
exports.ImmutableMap = ImmutableMap;
//# sourceMappingURL=ImmutableMap.js.map
