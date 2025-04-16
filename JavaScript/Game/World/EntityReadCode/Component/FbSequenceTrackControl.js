"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSequenceTrackControl = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSequenceTrackControlPoint_1 = require("./FbSequenceTrackControlPoint");
class FbSequenceTrackControl {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.mHh = !1),
      (this.CHh = void 0),
      (this.hHh = !1),
      (this.lHh = void 0);
  }
  static Create(t) {
    if (t) return new FbSequenceTrackControl(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Sequence() {
    return (
      this.mHh ||
        ((this.mHh = !0), (this.CHh = this.FbDataInternal.sequence())),
      this.CHh
    );
  }
  get ControlPoints() {
    if (!this.hHh) {
      (this.hHh = !0), (this.lHh = new Array());
      var e = this.FbDataInternal.controlPointsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.controlPoints(
            t,
            new fb_component_1.SequenceTrackControlPoint(),
          );
          this.lHh.push(
            FbSequenceTrackControlPoint_1.FbSequenceTrackControlPoint.Create(i),
          );
        }
    }
    return this.lHh;
  }
}
exports.FbSequenceTrackControl = FbSequenceTrackControl;
//# sourceMappingURL=FbSequenceTrackControl.js.map
