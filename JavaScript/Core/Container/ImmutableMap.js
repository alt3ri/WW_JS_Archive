"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ImmutableMap = void 0);
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
  wKa(e) {}
}
exports.ImmutableMap = ImmutableMap;
//# sourceMappingURL=ImmutableMap.js.map
