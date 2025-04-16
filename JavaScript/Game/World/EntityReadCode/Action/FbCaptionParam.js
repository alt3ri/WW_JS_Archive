"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCaptionParam = void 0);
class FbCaptionParam {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Dgh = !1),
      (this.Bgh = 0),
      (this.SCh = !1),
      (this.MCh = 0),
      (this.qgh = !1),
      (this.kgh = 0);
  }
  static Create(t) {
    if (t) return new FbCaptionParam(t);
  }
  get StartTime() {
    return (
      this.Dgh ||
        ((this.Dgh = !0), (this.Bgh = this.FbDataInternal.startTime())),
      this.Bgh
    );
  }
  get TotalTime() {
    return (
      this.SCh ||
        ((this.SCh = !0), (this.MCh = this.FbDataInternal.totalTime())),
      this.MCh
    );
  }
  get IntervalTime() {
    return (
      this.qgh ||
        ((this.qgh = !0), (this.kgh = this.FbDataInternal.intervalTime())),
      this.kgh
    );
  }
}
exports.FbCaptionParam = FbCaptionParam;
//# sourceMappingURL=FbCaptionParam.js.map
