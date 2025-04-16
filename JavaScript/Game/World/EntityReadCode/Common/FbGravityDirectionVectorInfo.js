"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGravityDirectionVectorInfo = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbGravityDirectionVectorInfo {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tdh = !1),
      (this.idh = void 0);
  }
  static Create(t) {
    if (t) return new FbGravityDirectionVectorInfo(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Direction() {
    return (
      this.tdh ||
        ((this.tdh = !0),
        (this.idh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.direction(),
        ))),
      this.idh
    );
  }
}
exports.FbGravityDirectionVectorInfo = FbGravityDirectionVectorInfo;
//# sourceMappingURL=FbGravityDirectionVectorInfo.js.map
