"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FilterItemData = void 0);
class FilterItemData {
  constructor(t = 0, s = void 0, e = void 0) {
    (this.FilterId = t),
      (this.Content = s),
      (this.xst = e),
      (this.rDt = !0),
      (this.NeedChangeColor = !1);
  }
  SetIsShowIcon(t) {
    this.rDt = t;
  }
  GetIconPath() {
    if (this.rDt) return this.xst;
  }
}
exports.FilterItemData = FilterItemData;
//# sourceMappingURL=FilterData.js.map
