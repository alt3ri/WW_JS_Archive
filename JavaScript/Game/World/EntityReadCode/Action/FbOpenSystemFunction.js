"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenSystemFunction = void 0);
class FbOpenSystemFunction {
  constructor(t) {
    (this.FbDataInternal = t), (this.bdh = !1), (this.Ldh = 0);
  }
  static Create(t) {
    if (t) return new FbOpenSystemFunction(t);
  }
  get FunctionId() {
    return (
      this.bdh ||
        ((this.bdh = !0), (this.Ldh = this.FbDataInternal.functionId())),
      this.Ldh
    );
  }
}
exports.FbOpenSystemFunction = FbOpenSystemFunction;
//# sourceMappingURL=FbOpenSystemFunction.js.map
