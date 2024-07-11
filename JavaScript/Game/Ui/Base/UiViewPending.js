"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewPending = void 0);
class UiViewPending {
  constructor(t, i) {
    (this.PendingType = 1), (this.View = t), (this.PendingType = i);
  }
  Equal(t) {
    return (
      this.View.Info.Name === t.View.Info.Name &&
      this.PendingType === t.PendingType
    );
  }
  IsPairWith(t) {
    return (
      this.View.Info.Name === t.View.Info.Name &&
      1 === this.PendingType &&
      (2 === t.PendingType || 3 === t.PendingType)
    );
  }
}
exports.UiViewPending = UiViewPending;
//# sourceMappingURL=UiViewPending.js.map
