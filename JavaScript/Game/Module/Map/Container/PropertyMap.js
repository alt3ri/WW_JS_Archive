"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PropertyMap = void 0);
class PropertyMap extends Map {
  constructor() {
    super(...arguments), (this.JQa = new Map());
  }
  set(t, r) {
    return super.get(t) === r ? this : (this.JQa.set(t, !0), super.set(t, r));
  }
  get(t) {
    return this.flushDirty(t), super.get(t);
  }
  tryGet(t, r, s = !0) {
    return s && this.flushDirty(t), this.get(t) ?? r;
  }
  flushDirty(t) {
    this.JQa.set(t, !1);
  }
  isDirty(t) {
    return this.JQa.get(t) ?? !1;
  }
}
exports.PropertyMap = PropertyMap;
//# sourceMappingURL=PropertyMap.js.map
