"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportToLatestResetPoint = void 0);
const UnionTeleportToLatestResetPointOptionHelper_1 = require("./UnionTeleportToLatestResetPointOptionHelper");
class FbTeleportToLatestResetPoint {
  constructor(t) {
    (this.FbDataInternal = t), (this.s_h = !1), (this.Hye = void 0);
  }
  static Create(t) {
    if (t) return new FbTeleportToLatestResetPoint(t);
  }
  get Option() {
    var t, e;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (t = this.FbDataInternal.optionType()),
        (e =
          UnionTeleportToLatestResetPointOptionHelper_1.UnionTeleportToLatestResetPointOptionHelper.GetUnionTeleportToLatestResetPointOptionObject(
            t,
          ))) &&
        (this.Hye =
          UnionTeleportToLatestResetPointOptionHelper_1.UnionTeleportToLatestResetPointOptionHelper.ReadUnionTeleportToLatestResetPointOption(
            t,
            this.FbDataInternal.option(e),
          )),
      this.Hye
    );
  }
}
exports.FbTeleportToLatestResetPoint = FbTeleportToLatestResetPoint;
//# sourceMappingURL=FbTeleportToLatestResetPoint.js.map
