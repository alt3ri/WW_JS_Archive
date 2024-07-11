"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemInfo = void 0);
class BuffItemInfo {
  constructor() {
    (this.SortId = 0),
      (this.Priority = 0),
      (this.BuffCueConfig = void 0),
      (this.SingleBuff = void 0),
      (this.BuffHandleSet = new Set()),
      (this.BuffItem = void 0);
  }
  static GenSortId() {
    return this.o6++, this.o6;
  }
  Clear() {
    (this.SingleBuff = void 0),
      this.BuffHandleSet.clear(),
      (this.BuffItem = void 0);
  }
}
((exports.BuffItemInfo = BuffItemInfo).o6 = 0),
  (BuffItemInfo.Compare = (t, s) => {
    var i = s.Priority - t.Priority;
    return 0 == i ? s.SortId - t.SortId : i;
  });
//# sourceMappingURL=BuffItemInfo.js.map
