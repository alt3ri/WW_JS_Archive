"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSimpleMove = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSimpleMove {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.i_h = !1),
      (this.r_h = 0),
      (this.Mph = !1),
      (this.Eph = 0),
      (this.uch = !1),
      (this.dch = void 0);
  }
  static Create(t) {
    if (t) return new FbSimpleMove(t);
  }
  get Who() {
    return (
      this.i_h || ((this.i_h = !0), (this.r_h = this.FbDataInternal.who())),
      this.r_h
    );
  }
  get UseTime() {
    return (
      this.Mph || ((this.Mph = !0), (this.Eph = this.FbDataInternal.useTime())),
      this.Eph
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
exports.FbSimpleMove = FbSimpleMove;
//# sourceMappingURL=FbSimpleMove.js.map
