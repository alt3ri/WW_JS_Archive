"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemMainTypeMapping = void 0);
class ItemMainTypeMapping {
  constructor(t) {
    (this.yci = new Set()), (this.MainType = t);
  }
  Add(t) {
    this.yci.add(t);
  }
  Remove(t) {
    this.yci.delete(t);
  }
  GetSet() {
    return this.yci;
  }
  HasRedDot() {
    for (const t of this.yci) if (t.HasRedDot()) return !0;
    return !1;
  }
}
exports.ItemMainTypeMapping = ItemMainTypeMapping;
//# sourceMappingURL=ItemMainTypeMapping.js.map
