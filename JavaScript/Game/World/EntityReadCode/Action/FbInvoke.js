"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInvoke = void 0);
const FbActionInfo_1 = require("./FbActionInfo");
class FbInvoke {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.i_h = !1),
      (this.r_h = 0),
      (this.puh = !1),
      (this.vuh = void 0);
  }
  static Create(t) {
    if (t) return new FbInvoke(t);
  }
  get Who() {
    return (
      this.i_h || ((this.i_h = !0), (this.r_h = this.FbDataInternal.who())),
      this.r_h
    );
  }
  get ActionInfo() {
    return (
      this.puh ||
        ((this.puh = !0),
        (this.vuh = FbActionInfo_1.FbActionInfo.Create(
          this.FbDataInternal.actionInfo(),
        ))),
      this.vuh
    );
  }
}
exports.FbInvoke = FbInvoke;
//# sourceMappingURL=FbInvoke.js.map
