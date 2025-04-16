"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCatapult = void 0);
const FbCatapultParam_1 = require("./FbCatapultParam");
class FbCatapult {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.o_h = !1),
      (this.n_h = void 0);
  }
  static Create(t) {
    if (t) return new FbCatapult(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Param() {
    return (
      this.o_h ||
        ((this.o_h = !0),
        (this.n_h = FbCatapultParam_1.FbCatapultParam.Create(
          this.FbDataInternal.param(),
        ))),
      this.n_h
    );
  }
}
exports.FbCatapult = FbCatapult;
//# sourceMappingURL=FbCatapult.js.map
