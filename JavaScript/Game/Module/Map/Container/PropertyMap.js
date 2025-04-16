"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PropertyMap = void 0);
class PropertyMap extends Map {
  constructor() {
    super(...arguments), (this.pYa = new Map());
  }
  set(t, s) {
    return super.get(t) === s ? this : (this.setDirty(t), super.set(t, s));
  }
  get(t) {
    return this.cleanDirty(t), super.get(t);
  }
  tryGet(t, s, r = !0) {
    return r && this.cleanDirty(t), super.get(t) ?? s;
  }
  cleanDirty(t) {
    this.pYa.set(t, !1);
  }
  setDirty(t) {
    this.pYa.set(t, !0);
  }
  setAllDirty() {
    for (const t of this.pYa.keys()) this.pYa.set(t, !0);
  }
  isDirty(t) {
    return this.pYa.get(t) ?? !1;
  }
}
exports.PropertyMap = PropertyMap;
//# sourceMappingURL=PropertyMap.js.map
