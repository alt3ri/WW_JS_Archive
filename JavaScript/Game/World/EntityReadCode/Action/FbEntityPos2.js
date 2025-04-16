"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityPos2 = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbEntityPos2 {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.Kdh = !1),
      (this.$dh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityPos2(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
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
exports.FbEntityPos2 = FbEntityPos2;
//# sourceMappingURL=FbEntityPos2.js.map
