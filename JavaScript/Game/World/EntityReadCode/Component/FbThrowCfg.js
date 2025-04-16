"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbThrowCfg = void 0);
const UnionThrowMotionHelper_1 = require("./UnionThrowMotionHelper");
class FbThrowCfg {
  constructor(o) {
    (this.FbDataInternal = o), (this.L2h = !1), (this.A2h = void 0);
  }
  static Create(o) {
    if (o) return new FbThrowCfg(o);
  }
  get MotionConfig() {
    var o, t;
    return (
      !this.L2h &&
        ((this.L2h = !0),
        (o = this.FbDataInternal.motionConfigType()),
        (t =
          UnionThrowMotionHelper_1.UnionThrowMotionHelper.GetUnionThrowMotionObject(
            o,
          ))) &&
        (this.A2h =
          UnionThrowMotionHelper_1.UnionThrowMotionHelper.ReadUnionThrowMotion(
            o,
            this.FbDataInternal.motionConfig(t),
          )),
      this.A2h
    );
  }
}
exports.FbThrowCfg = FbThrowCfg;
//# sourceMappingURL=FbThrowCfg.js.map
