"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSequenceTrackControlPoint = void 0);
class FbSequenceTrackControlPoint {
  constructor(t) {
    (this.FbDataInternal = t), (this.eLh = !1), (this.tLh = void 0);
  }
  static Create(t) {
    if (t) return new FbSequenceTrackControlPoint(t);
  }
  get Mark() {
    return (
      this.eLh || ((this.eLh = !0), (this.tLh = this.FbDataInternal.mark())),
      this.tLh
    );
  }
}
exports.FbSequenceTrackControlPoint = FbSequenceTrackControlPoint;
//# sourceMappingURL=FbSequenceTrackControlPoint.js.map
