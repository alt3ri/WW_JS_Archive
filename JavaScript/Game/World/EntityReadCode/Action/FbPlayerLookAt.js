"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayerLookAt = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPlayerLookAt {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.uch = !1),
      (this.dch = void 0),
      (this.Ddh = !1),
      (this.Bdh = !1);
  }
  static Create(t) {
    if (t) return new FbPlayerLookAt(t);
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
  get CameraMove() {
    return (
      this.Ddh ||
        ((this.Ddh = !0), (this.Bdh = this.FbDataInternal.cameraMove())),
      this.Bdh
    );
  }
}
exports.FbPlayerLookAt = FbPlayerLookAt;
//# sourceMappingURL=FbPlayerLookAt.js.map
