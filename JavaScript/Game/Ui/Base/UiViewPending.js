"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewPending = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
class UiViewPending {
  constructor(s, i) {
    (this.PendingType = 1),
      (this.ExecutePromise = void 0),
      (this.View = s),
      (this.PendingType = i),
      (this.ExecutePromise = new CustomPromise_1.CustomPromise());
  }
  Equal(s) {
    return (
      this.View.Info.Name === s.View.Info.Name &&
      this.PendingType === s.PendingType
    );
  }
  IsPairWith(s) {
    return (
      this.View.Info.Name === s.View.Info.Name &&
      1 === this.PendingType &&
      (2 === s.PendingType || 3 === s.PendingType)
    );
  }
}
exports.UiViewPending = UiViewPending;
//# sourceMappingURL=UiViewPending.js.map
