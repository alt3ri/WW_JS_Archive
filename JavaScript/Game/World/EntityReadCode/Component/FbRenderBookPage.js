"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRenderBookPage = void 0);
const UnionTargetEntityHelper_1 = require("../Action/UnionTargetEntityHelper");
class FbRenderBookPage {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.sIh = !1),
      (this.s9o = 0),
      (this.gYh = !1),
      (this.fYh = void 0),
      (this.zfh = !1),
      (this.Jfh = void 0);
  }
  static Create(t) {
    if (t) return new FbRenderBookPage(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Radius() {
    return (
      this.sIh || ((this.sIh = !0), (this.s9o = this.FbDataInternal.radius())),
      this.s9o
    );
  }
  get CenterTarget() {
    var t, e;
    return (
      !this.gYh &&
        ((this.gYh = !0),
        (t = this.FbDataInternal.centerTargetType()),
        (e =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.fYh =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.centerTarget(e),
          )),
      this.fYh
    );
  }
  get AkEvent() {
    return (
      this.zfh || ((this.zfh = !0), (this.Jfh = this.FbDataInternal.akEvent())),
      this.Jfh
    );
  }
}
exports.FbRenderBookPage = FbRenderBookPage;
//# sourceMappingURL=FbRenderBookPage.js.map
