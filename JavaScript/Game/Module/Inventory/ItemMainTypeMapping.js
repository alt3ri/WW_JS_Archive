"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemMainTypeMapping = void 0);
class ItemMainTypeMapping {
  constructor(t) {
    (this.ymi = new Set()), (this.MainType = t);
  }
  Add(t) {
    this.ymi.add(t);
  }
  Remove(t) {
    this.ymi.delete(t);
  }
  GetSet() {
    return this.ymi;
  }
  HasRedDot() {
    for (const t of this.ymi) if (t.HasRedDot()) return !0;
    return !1;
  }
}
exports.ItemMainTypeMapping = ItemMainTypeMapping;
//# sourceMappingURL=ItemMainTypeMapping.js.map
