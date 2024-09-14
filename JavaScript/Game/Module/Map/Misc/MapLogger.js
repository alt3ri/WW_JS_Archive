"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapLogger = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class MapLogger {
  static Info(o, t, ...a) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", o, t, ...a);
  }
  static Warn(o, t, ...a) {
    Log_1.Log.CheckWarn() && Log_1.Log.Warn("Map", o, t, ...a);
  }
  static Error(o, t, ...a) {
    Log_1.Log.CheckError() && Log_1.Log.Error("Map", o, t, ...a);
  }
  static CacheInfo(o, t) {}
  static CacheWarn(o, t) {}
  static CacheError(o, t) {}
}
exports.MapLogger = MapLogger;
//# sourceMappingURL=MapLogger.js.map
