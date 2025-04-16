"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayerPos2 = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPlayerPos2 {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Kdh = !1),
      (this.$dh = void 0);
  }
  static Create(t) {
    if (t) return new FbPlayerPos2(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Offset() {
    return (
      this.Kdh ||
        ((this.Kdh = !0),
        (this.$dh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.offset(),
        ))),
      this.$dh
    );
  }
}
exports.FbPlayerPos2 = FbPlayerPos2;
//# sourceMappingURL=FbPlayerPos2.js.map
