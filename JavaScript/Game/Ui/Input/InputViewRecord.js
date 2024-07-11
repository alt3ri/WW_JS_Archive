"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputViewRecord = void 0);
class InputViewRecord {
  constructor() {
    this.bmr = new Map();
  }
  Add(t) {
    var r = this.bmr.get(t),
      r = r ? r + 1 : 1;
    return this.bmr.set(t, r), r;
  }
  Remove(t) {
    var r = this.bmr.get(t);
    return void 0 === r
      ? 0
      : (0 < (r = r - 1) ? this.bmr.set(t, r) : this.bmr.delete(t), r);
  }
  Has(t) {
    t = this.bmr.get(t);
    return !!t && 0 < t;
  }
  HasAny() {
    for (const t of this.bmr.values()) if (0 < t) return !0;
    return !1;
  }
  Size() {
    return this.bmr.size;
  }
  Clear() {
    this.bmr.clear();
  }
}
exports.InputViewRecord = InputViewRecord;
//# sourceMappingURL=InputViewRecord.js.map
