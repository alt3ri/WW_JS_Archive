"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapLoggerComponent = void 0);
const MapLogger_1 = require("../Misc/MapLogger"),
  MapComponent_1 = require("./MapComponent");
class MapLoggerComponent extends MapComponent_1.MapComponent {
  get ComponentType() {
    return 0;
  }
  get EnableLog() {
    return this.PropertyMap.tryGet(0, !0);
  }
  set EnableLog(e) {
    this.PropertyMap.set(0, e);
  }
  get EnableCacheLog() {
    return this.PropertyMap.tryGet(1, !1);
  }
  set EnableCacheLog(e) {
    this.PropertyMap.set(1, e);
  }
  LogInfo(e, o, ...t) {
    this.EnableLog && MapLogger_1.MapLogger.Info(e, o, ...t),
      this.EnableCacheLog && MapLogger_1.MapLogger.CacheInfo(e, o, ...t);
  }
  LogWarn(e, o, ...t) {
    this.EnableLog && MapLogger_1.MapLogger.Warn(e, o, ...t),
      this.EnableCacheLog && MapLogger_1.MapLogger.CacheWarn(e, o, ...t);
  }
  LogError(e, o, ...t) {
    this.EnableLog && MapLogger_1.MapLogger.Error(e, o, ...t),
      this.EnableCacheLog && MapLogger_1.MapLogger.CacheError(e, o, ...t);
  }
}
exports.MapLoggerComponent = MapLoggerComponent;
//# sourceMappingURL=MapLoggerComponent.js.map
