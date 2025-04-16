"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityLookAt = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbEntityLookAt {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.uch = !1),
      (this.dch = void 0),
      (this.Ddh = !1),
      (this.Bdh = !1);
  }
  static Create(t) {
    if (t) return new FbEntityLookAt(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
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
  get CameraMove() {
    return (
      this.Ddh ||
        ((this.Ddh = !0), (this.Bdh = this.FbDataInternal.cameraMove())),
      this.Bdh
    );
  }
}
exports.FbEntityLookAt = FbEntityLookAt;
//# sourceMappingURL=FbEntityLookAt.js.map
