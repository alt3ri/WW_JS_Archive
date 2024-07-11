"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputKeyDisplayData = void 0);
class InputKeyDisplayData {
  constructor() {
    (this.ActionOrAxisName = void 0),
      (this.KeyNameList = []),
      (this.KeyNameMap = new Map()),
      (this.IsCombination = !1);
  }
  RefreshInput(t, s) {
    (this.ActionOrAxisName = t),
      (this.KeyNameList = s),
      (this.IsCombination = !1);
  }
  RefreshCombinationInput(t, s) {
    (this.ActionOrAxisName = t),
      (this.KeyNameMap = s),
      (this.IsCombination = !0);
  }
  GetDisplayKeyNameList(t = 0) {
    if (this.KeyNameMap.size > 0)
      for (const [s, i] of this.KeyNameMap) return [s, i];
    if (this.KeyNameList.length > 0) return [this.KeyNameList[t]];
  }
  IsValid() {
    return void 0 !== this.ActionOrAxisName;
  }
  Reset() {
    (this.ActionOrAxisName = void 0),
      (this.KeyNameList = []),
      this.KeyNameMap.clear();
  }
}
exports.InputKeyDisplayData = InputKeyDisplayData;
// # sourceMappingURL=InputKeyDisplayData.js.map
