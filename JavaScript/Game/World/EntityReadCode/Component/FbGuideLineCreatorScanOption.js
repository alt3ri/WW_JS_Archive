"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGuideLineCreatorScanOption = void 0);
class FbGuideLineCreatorScanOption {
  constructor(t) {
    (this.FbDataInternal = t), (this.F5h = !1), (this.N5h = 0);
  }
  static Create(t) {
    if (t) return new FbGuideLineCreatorScanOption(t);
  }
  get ResponseRange() {
    return (
      this.F5h ||
        ((this.F5h = !0), (this.N5h = this.FbDataInternal.responseRange())),
      this.N5h
    );
  }
}
exports.FbGuideLineCreatorScanOption = FbGuideLineCreatorScanOption;
//# sourceMappingURL=FbGuideLineCreatorScanOption.js.map
