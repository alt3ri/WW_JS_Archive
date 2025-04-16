"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAngleWeight = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityAngleWeight_1 = require("./FbEntityAngleWeight");
class FbAngleWeight {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._2h = !1),
      (this.c2h = void 0);
  }
  static Create(t) {
    if (t) return new FbAngleWeight(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get AngleWeight() {
    if (!this._2h) {
      (this._2h = !0), (this.c2h = new Array());
      var e = this.FbDataInternal.angleWeightLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.angleWeight(
            t,
            new fb_component_1.EntityAngleWeight(),
          );
          this.c2h.push(FbEntityAngleWeight_1.FbEntityAngleWeight.Create(i));
        }
    }
    return this.c2h;
  }
}
exports.FbAngleWeight = FbAngleWeight;
//# sourceMappingURL=FbAngleWeight.js.map
