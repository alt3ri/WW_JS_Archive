"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWindDirectional = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbWindDirectionalStateGrade_1 = require("./FbWindDirectionalStateGrade"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbWindDirectional {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Aph = !1),
      (this.xph = void 0),
      (this.FEc = !1),
      (this.NEc = void 0);
  }
  static Create(t) {
    if (t) return new FbWindDirectional(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Rot() {
    return (
      this.Aph ||
        ((this.Aph = !0),
        (this.xph = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rot(),
        ))),
      this.xph
    );
  }
  get Grades() {
    if (!this.FEc) {
      (this.FEc = !0), (this.NEc = new Array());
      var i = this.FbDataInternal.gradesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.grades(
            t,
            new fb_component_1.WindDirectionalStateGrade(),
          );
          this.NEc.push(
            FbWindDirectionalStateGrade_1.FbWindDirectionalStateGrade.Create(e),
          );
        }
    }
    return this.NEc;
  }
}
exports.FbWindDirectional = FbWindDirectional;
//# sourceMappingURL=FbWindDirectional.js.map
