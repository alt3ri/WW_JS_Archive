"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLimitPlayerOperation = void 0);
const UnionLimitPlayOperationHelper_1 = require("./UnionLimitPlayOperationHelper");
class FbLimitPlayerOperation {
  constructor(i) {
    (this.FbDataInternal = i), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(i) {
    if (i) return new FbLimitPlayerOperation(i);
  }
  get Type() {
    var i, t;
    return (
      !this.u_h &&
        ((this.u_h = !0),
        (i = this.FbDataInternal.typeType()),
        (t =
          UnionLimitPlayOperationHelper_1.UnionLimitPlayOperationHelper.GetUnionLimitPlayOperationObject(
            i,
          ))) &&
        (this.f8o =
          UnionLimitPlayOperationHelper_1.UnionLimitPlayOperationHelper.ReadUnionLimitPlayOperation(
            i,
            this.FbDataInternal.type(t),
          )),
      this.f8o
    );
  }
}
exports.FbLimitPlayerOperation = FbLimitPlayerOperation;
//# sourceMappingURL=FbLimitPlayerOperation.js.map
