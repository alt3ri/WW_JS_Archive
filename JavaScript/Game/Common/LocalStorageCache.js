"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LocalStorageCache = exports.CacheObj = void 0);
const TrimLru_1 = require("../../Core/Container/TrimLru"),
  CACHE_CAPACITY = 50;
class CacheObj {
  constructor() {
    this.EncodeValue = void 0;
  }
}
exports.CacheObj = CacheObj;
class LocalStorageCache {
  constructor() {
    this.G9 = new TrimLru_1.TrimLru(CACHE_CAPACITY);
  }
  Set(e, r) {
    var t = this.G9.Get(e);
    t ? (t.EncodeValue = r) : this.G9.Put(e, { EncodeValue: r });
  }
  Get(e) {
    e = this.G9.Get(e);
    if (e) return e.EncodeValue;
  }
  Clear() {
    this.G9.Clear();
  }
}
exports.LocalStorageCache = LocalStorageCache;
//# sourceMappingURL=LocalStorageCache.js.map
