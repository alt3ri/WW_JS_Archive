"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityTrackControl = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityTrackControlPoint_1 = require("./FbEntityTrackControlPoint");
class FbEntityTrackControl {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.hHh = !1),
      (this.lHh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityTrackControl(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get ControlPoints() {
    if (!this.hHh) {
      (this.hHh = !0), (this.lHh = new Array());
      var i = this.FbDataInternal.controlPointsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var r = this.FbDataInternal.controlPoints(
            t,
            new fb_component_1.EntityTrackControlPoint(),
          );
          this.lHh.push(
            FbEntityTrackControlPoint_1.FbEntityTrackControlPoint.Create(r),
          );
        }
    }
    return this.lHh;
  }
}
exports.FbEntityTrackControl = FbEntityTrackControl;
//# sourceMappingURL=FbEntityTrackControl.js.map
