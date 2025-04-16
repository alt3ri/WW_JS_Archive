"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPasserbyNpcSplineMove = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPasserbyNpcSpline_1 = require("./FbPasserbyNpcSpline");
class FbPasserbyNpcSplineMove {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.RQh = !1),
      (this.wQh = void 0);
  }
  static Create(e) {
    if (e) return new FbPasserbyNpcSplineMove(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Routes() {
    if (!this.RQh) {
      (this.RQh = !0), (this.wQh = new Array());
      var s = this.FbDataInternal.routesLength();
      if (s)
        for (let e = 0; e < s; ++e) {
          var t = this.FbDataInternal.routes(
            e,
            new fb_component_1.PasserbyNpcSpline(),
          );
          this.wQh.push(FbPasserbyNpcSpline_1.FbPasserbyNpcSpline.Create(t));
        }
    }
    return this.wQh;
  }
}
exports.FbPasserbyNpcSplineMove = FbPasserbyNpcSplineMove;
//# sourceMappingURL=FbPasserbyNpcSplineMove.js.map
