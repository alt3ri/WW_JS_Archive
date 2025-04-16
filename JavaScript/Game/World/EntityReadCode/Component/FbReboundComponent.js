"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbReboundComponent = void 0);
const UnionReboundOptionHelper_1 = require("./UnionReboundOptionHelper");
class FbReboundComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.p0h = !1),
      (this.nXs = 0),
      (this.s_h = !1),
      (this.Hye = void 0);
  }
  static Create(t) {
    if (t) return new FbReboundComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get BulletId() {
    return (
      this.p0h ||
        ((this.p0h = !0), (this.nXs = Number(this.FbDataInternal.bulletId()))),
      this.nXs
    );
  }
  get Option() {
    var t, e;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (t = this.FbDataInternal.optionType()),
        (e =
          UnionReboundOptionHelper_1.UnionReboundOptionHelper.GetUnionReboundOptionObject(
            t,
          ))) &&
        (this.Hye =
          UnionReboundOptionHelper_1.UnionReboundOptionHelper.ReadUnionReboundOption(
            t,
            this.FbDataInternal.option(e),
          )),
      this.Hye
    );
  }
}
exports.FbReboundComponent = FbReboundComponent;
//# sourceMappingURL=FbReboundComponent.js.map
