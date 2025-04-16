"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityGravityConfig = void 0);
const UnionGravityDirectionHelper_1 = require("../Common/UnionGravityDirectionHelper");
class FbEntityGravityConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.yUh = !1),
      (this.SUh = void 0),
      (this.MUh = !1),
      (this.EUh = !1),
      (this.IUh = !1),
      (this.TUh = !1);
  }
  static Create(t) {
    if (t) return new FbEntityGravityConfig(t);
  }
  get GravityDirection() {
    var t, i;
    return (
      !this.yUh &&
        ((this.yUh = !0),
        (t = this.FbDataInternal.gravityDirectionType()),
        (i =
          UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.GetUnionGravityDirectionObject(
            t,
          ))) &&
        (this.SUh =
          UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.ReadUnionGravityDirection(
            t,
            this.FbDataInternal.gravityDirection(i),
          )),
      this.SUh
    );
  }
  get SpecifyGravityLoad() {
    return (
      this.MUh ||
        ((this.MUh = !0),
        (this.EUh = this.FbDataInternal.specifyGravityLoad())),
      this.EUh
    );
  }
  get SpecifyGravityLock() {
    return (
      this.IUh ||
        ((this.IUh = !0),
        (this.TUh = this.FbDataInternal.specifyGravityLock())),
      this.TUh
    );
  }
}
exports.FbEntityGravityConfig = FbEntityGravityConfig;
//# sourceMappingURL=FbEntityGravityConfig.js.map
