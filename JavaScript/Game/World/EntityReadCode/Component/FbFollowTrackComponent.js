"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFollowTrackComponent = void 0);
const UnionFollowTrackEndOptionHelper_1 = require("./UnionFollowTrackEndOptionHelper");
class FbFollowTrackComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.M_h = !1),
      (this.E_h = 0),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.Q6h = !1),
      (this.K6h = void 0);
  }
  static Create(t) {
    if (t) return new FbFollowTrackComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Range() {
    return (
      this.M_h || ((this.M_h = !0), (this.E_h = this.FbDataInternal.range())),
      this.E_h
    );
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get EndType() {
    var t, i;
    return (
      !this.Q6h &&
        ((this.Q6h = !0),
        (t = this.FbDataInternal.endTypeType()),
        (i =
          UnionFollowTrackEndOptionHelper_1.UnionFollowTrackEndOptionHelper.GetUnionFollowTrackEndOptionObject(
            t,
          ))) &&
        (this.K6h =
          UnionFollowTrackEndOptionHelper_1.UnionFollowTrackEndOptionHelper.ReadUnionFollowTrackEndOption(
            t,
            this.FbDataInternal.endType(i),
          )),
      this.K6h
    );
  }
}
exports.FbFollowTrackComponent = FbFollowTrackComponent;
//# sourceMappingURL=FbFollowTrackComponent.js.map
