"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenSystemBoardWithReturn = void 0);
const UnionOpenSystemBoardWithReturnHelper_1 = require("./UnionOpenSystemBoardWithReturnHelper");
class FbOpenSystemBoardWithReturn {
  constructor(e) {
    (this.FbDataInternal = e), (this.udh = !1), (this.ddh = void 0);
  }
  static Create(e) {
    if (e) return new FbOpenSystemBoardWithReturn(e);
  }
  get SystemType() {
    var e, t;
    return (
      !this.udh &&
        ((this.udh = !0),
        (e = this.FbDataInternal.systemTypeType()),
        (t =
          UnionOpenSystemBoardWithReturnHelper_1.UnionOpenSystemBoardWithReturnHelper.GetUnionOpenSystemBoardWithReturnObject(
            e,
          ))) &&
        (this.ddh =
          UnionOpenSystemBoardWithReturnHelper_1.UnionOpenSystemBoardWithReturnHelper.ReadUnionOpenSystemBoardWithReturn(
            e,
            this.FbDataInternal.systemType(t),
          )),
      this.ddh
    );
  }
}
exports.FbOpenSystemBoardWithReturn = FbOpenSystemBoardWithReturn;
//# sourceMappingURL=FbOpenSystemBoardWithReturn.js.map
