"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevelQteComponent = void 0);
const UnionQteTypeHelper_1 = require("./UnionQteTypeHelper");
class FbLevelQteComponent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.NYh = !1),
      (this.VYh = void 0);
  }
  static Create(e) {
    if (e) return new FbLevelQteComponent(e);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get QteConfig() {
    var e, t;
    return (
      !this.NYh &&
        ((this.NYh = !0),
        (e = this.FbDataInternal.qteConfigType()),
        (t =
          UnionQteTypeHelper_1.UnionQteTypeHelper.GetUnionQteTypeObject(e))) &&
        (this.VYh = UnionQteTypeHelper_1.UnionQteTypeHelper.ReadUnionQteType(
          e,
          this.FbDataInternal.qteConfig(t),
        )),
      this.VYh
    );
  }
}
exports.FbLevelQteComponent = FbLevelQteComponent;
//# sourceMappingURL=FbLevelQteComponent.js.map
