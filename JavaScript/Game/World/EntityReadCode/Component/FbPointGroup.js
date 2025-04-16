"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPointGroup = void 0);
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var"),
  UnionPointGroupHelper_1 = require("./UnionPointGroupHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPointGroup {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.G9h = !1),
      (this.O9h = void 0),
      (this.NEh = !1),
      (this.VEh = void 0);
  }
  static Create(t) {
    if (t) return new FbPointGroup(t);
  }
  get GroupConfig() {
    var t, r;
    return (
      !this.G9h &&
        ((this.G9h = !0),
        (t = this.FbDataInternal.groupConfigType()),
        (r =
          UnionPointGroupHelper_1.UnionPointGroupHelper.GetUnionPointGroupObject(
            t,
          ))) &&
        (this.O9h =
          UnionPointGroupHelper_1.UnionPointGroupHelper.ReadUnionPointGroup(
            t,
            this.FbDataInternal.groupConfig(r),
          )),
      this.O9h
    );
  }
  get Points() {
    if (!this.NEh) {
      (this.NEh = !0), (this.VEh = new Array());
      var r = this.FbDataInternal.pointsLength();
      if (r)
        for (let t = 0; t < r; ++t) {
          var i = this.FbDataInternal.points(t, new fb_var_1.VectorInfo());
          this.VEh.push(FbVectorInfo_1.FbVectorInfo.Create(i));
        }
    }
    return this.VEh;
  }
}
exports.FbPointGroup = FbPointGroup;
//# sourceMappingURL=FbPointGroup.js.map
