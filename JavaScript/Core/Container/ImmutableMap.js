"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ImmutableMap = void 0);
const Log_1 = require("../Common/Log");
class ImmutableMap extends Map {
  set(e, t) {
    return this.wKa("set"), this;
  }
  delete(e) {
    return this.wKa("delete"), !1;
  }
  clear() {
    this.wKa("clear");
  }
  wKa(e) {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Core", 63, "ImmutableMap 不允许修改", ["函数名", e]);
  }
}
exports.ImmutableMap = ImmutableMap;
//# sourceMappingURL=ImmutableMap.js.map
