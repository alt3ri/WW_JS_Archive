"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRenjuChess = void 0);
const UnionAdjustPlayerCameraOptionHelper_1 = require("./UnionAdjustPlayerCameraOptionHelper");
class FbRenjuChess {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.kIh = !1),
      (this.GIh = 0),
      (this.OIh = !1),
      (this.FIh = void 0);
  }
  static Create(t) {
    if (t) return new FbRenjuChess(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Chessboard() {
    return (
      this.kIh ||
        ((this.kIh = !0), (this.GIh = this.FbDataInternal.chessboard())),
      this.GIh
    );
  }
  get CameraConfig() {
    var t, s;
    return (
      !this.OIh &&
        ((this.OIh = !0),
        (t = this.FbDataInternal.cameraConfigType()),
        (s =
          UnionAdjustPlayerCameraOptionHelper_1.UnionAdjustPlayerCameraOptionHelper.GetUnionAdjustPlayerCameraOptionObject(
            t,
          ))) &&
        (this.FIh =
          UnionAdjustPlayerCameraOptionHelper_1.UnionAdjustPlayerCameraOptionHelper.ReadUnionAdjustPlayerCameraOption(
            t,
            this.FbDataInternal.cameraConfig(s),
          )),
      this.FIh
    );
  }
}
exports.FbRenjuChess = FbRenjuChess;
//# sourceMappingURL=FbRenjuChess.js.map
