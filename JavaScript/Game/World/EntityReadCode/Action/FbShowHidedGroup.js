"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowHidedGroup = void 0);
class FbShowHidedGroup {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.sxh = !1),
      (this.axh = void 0),
      (this.WAh = !1),
      (this.QAh = !1);
  }
  static Create(t) {
    if (t) return new FbShowHidedGroup(t);
  }
  get GroupKey() {
    return (
      this.sxh ||
        ((this.sxh = !0), (this.axh = this.FbDataInternal.groupKey())),
      this.axh
    );
  }
  get DelayShow() {
    return (
      this.WAh ||
        ((this.WAh = !0), (this.QAh = this.FbDataInternal.delayShow())),
      this.QAh
    );
  }
}
exports.FbShowHidedGroup = FbShowHidedGroup;
//# sourceMappingURL=FbShowHidedGroup.js.map
