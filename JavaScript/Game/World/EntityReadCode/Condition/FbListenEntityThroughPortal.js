"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbListenEntityThroughPortal = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbListenEntityThroughPortal {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.BJh = !1),
      (this.qJh = void 0),
      (this.kJh = !1),
      (this.GJh = 0);
  }
  static Create(t) {
    if (t) return new FbListenEntityThroughPortal(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CheckTarget() {
    var t, i;
    return (
      !this.BJh &&
        ((this.BJh = !0),
        (t = this.FbDataInternal.checkTargetType()),
        (i =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.qJh =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.checkTarget(i),
          )),
      this.qJh
    );
  }
  get PortalEntityId() {
    return (
      this.kJh ||
        ((this.kJh = !0), (this.GJh = this.FbDataInternal.portalEntityId())),
      this.GJh
    );
  }
}
exports.FbListenEntityThroughPortal = FbListenEntityThroughPortal;
//# sourceMappingURL=FbListenEntityThroughPortal.js.map
