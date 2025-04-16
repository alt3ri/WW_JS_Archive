"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapLogger = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class MapLogger {
  static Clear() {
    MapLogger.bpl.clear();
  }
  static Debug(g, o, ...a) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", g, o, ...a);
  }
  static DebugOnce(g, o, a, ...e) {
    MapLogger.w3c(g) || (MapLogger.Debug(o, a, ...e), MapLogger.Gpl(g));
  }
  static Info(g, o, ...a) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", g, o, ...a);
  }
  static InfoOnce(g, o, a, ...e) {
    this.w3c(g) || (MapLogger.Info(o, a, ...e), MapLogger.Gpl(g));
  }
  static Warn(g, o, ...a) {
    Log_1.Log.CheckWarn() && Log_1.Log.Warn("Map", g, o, ...a);
  }
  static WarnOnce(g, o, a, ...e) {
    this.w3c(g) || (MapLogger.Warn(o, a, ...e), MapLogger.Gpl(g));
  }
  static Error(g, o, ...a) {
    Log_1.Log.CheckError() && Log_1.Log.Error("Map", g, o, ...a);
  }
  static ErrorOnce(g, o, a, ...e) {
    this.w3c(g) || (MapLogger.Error(o, a, ...e), MapLogger.Gpl(g));
  }
  static w3c(g, o = 1) {
    return o <= (MapLogger.bpl.get(g) ?? 0);
  }
  static Gpl(g) {
    var o = MapLogger.bpl.get(g) ?? 0;
    MapLogger.bpl.set(g, ++o);
  }
}
(exports.MapLogger = MapLogger).bpl = new Map();
//# sourceMappingURL=MapLogger.js.map
