"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGravityFlipTeleportConfig = void 0);
const UnionGravityDirectionHelper_1 = require("../Common/UnionGravityDirectionHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbGravityFlipTeleportConfig {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.yUh = !1),
      (this.SUh = void 0),
      (this.HVh = !1),
      (this.WVh = void 0);
  }
  static Create(i) {
    if (i) return new FbGravityFlipTeleportConfig(i);
  }
  get GravityDirection() {
    var i, t;
    return (
      !this.yUh &&
        ((this.yUh = !0),
        (i = this.FbDataInternal.gravityDirectionType()),
        (t =
          UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.GetUnionGravityDirectionObject(
            i,
          ))) &&
        (this.SUh =
          UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.ReadUnionGravityDirection(
            i,
            this.FbDataInternal.gravityDirection(t),
          )),
      this.SUh
    );
  }
  get SafeLocation() {
    return (
      this.HVh ||
        ((this.HVh = !0),
        (this.WVh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.safeLocation(),
        ))),
      this.WVh
    );
  }
}
exports.FbGravityFlipTeleportConfig = FbGravityFlipTeleportConfig;
//# sourceMappingURL=FbGravityFlipTeleportConfig.js.map
