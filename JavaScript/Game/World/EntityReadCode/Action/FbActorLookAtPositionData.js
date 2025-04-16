"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActorLookAtPositionData = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbActorLookAtPositionData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Yfh = !1),
      (this.d3l = !1),
      (this.uch = !1),
      (this.dch = void 0);
  }
  static Create(t) {
    if (t) return new FbActorLookAtPositionData(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Lock() {
    return (
      this.Yfh || ((this.Yfh = !0), (this.d3l = this.FbDataInternal.lock())),
      this.d3l
    );
  }
  get Pos() {
    return (
      this.uch ||
        ((this.uch = !0),
        (this.dch = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.pos(),
        ))),
      this.dch
    );
  }
}
exports.FbActorLookAtPositionData = FbActorLookAtPositionData;
//# sourceMappingURL=FbActorLookAtPositionData.js.map
