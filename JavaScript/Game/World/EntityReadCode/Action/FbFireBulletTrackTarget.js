"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFireBulletTrackTarget = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbFireBulletTrackTarget {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.p0h = !1),
      (this.nXs = 0),
      (this.v0h = !1),
      (this.y0h = void 0),
      (this.ldh = !1),
      (this.NHo = void 0);
  }
  static Create(t) {
    if (t) return new FbFireBulletTrackTarget(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BulletId() {
    return (
      this.p0h ||
        ((this.p0h = !0), (this.nXs = Number(this.FbDataInternal.bulletId()))),
      this.nXs
    );
  }
  get Launcher() {
    var t, e;
    return (
      !this.v0h &&
        ((this.v0h = !0),
        (t = this.FbDataInternal.launcherType()),
        (e =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.y0h =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.launcher(e),
          )),
      this.y0h
    );
  }
  get Target() {
    var t, e;
    return (
      !this.ldh &&
        ((this.ldh = !0),
        (t = this.FbDataInternal.targetType()),
        (e =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.NHo =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.target(e),
          )),
      this.NHo
    );
  }
}
exports.FbFireBulletTrackTarget = FbFireBulletTrackTarget;
//# sourceMappingURL=FbFireBulletTrackTarget.js.map
