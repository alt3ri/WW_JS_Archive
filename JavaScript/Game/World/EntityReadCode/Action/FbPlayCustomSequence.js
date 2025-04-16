"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayCustomSequence = void 0);
class FbPlayCustomSequence {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Adh = !1),
      (this.xdh = 0),
      (this.Rdh = !1),
      (this.wdh = void 0),
      (this.Pdh = !1),
      (this.Udh = !1);
  }
  static Create(t) {
    if (t) return new FbPlayCustomSequence(t);
  }
  get CustomSeqId() {
    return (
      this.Adh ||
        ((this.Adh = !0), (this.xdh = this.FbDataInternal.customSeqId())),
      this.xdh
    );
  }
  get WhoIds() {
    if (!this.Rdh) {
      (this.Rdh = !0), (this.wdh = new Array());
      var s = this.FbDataInternal.whoIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.wdh.push(this.FbDataInternal.whoIds(t));
    }
    return this.wdh;
  }
  get ResetCamera() {
    return (
      this.Pdh ||
        ((this.Pdh = !0), (this.Udh = this.FbDataInternal.resetCamera())),
      this.Udh
    );
  }
}
exports.FbPlayCustomSequence = FbPlayCustomSequence;
//# sourceMappingURL=FbPlayCustomSequence.js.map
