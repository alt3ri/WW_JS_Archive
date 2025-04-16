"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenLevelQte = void 0);
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbOpenLevelQte {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.LSh = !1),
      (this.ASh = void 0);
  }
  static Create(t) {
    if (t) return new FbOpenLevelQte(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get LevelQteEntity() {
    var t, e;
    return (
      !this.LSh &&
        ((this.LSh = !0),
        (t = this.FbDataInternal.levelQteEntityType()),
        (e =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(
            t,
          ))) &&
        (this.ASh =
          UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(
            t,
            this.FbDataInternal.levelQteEntity(e),
          )),
      this.ASh
    );
  }
}
exports.FbOpenLevelQte = FbOpenLevelQte;
//# sourceMappingURL=FbOpenLevelQte.js.map
