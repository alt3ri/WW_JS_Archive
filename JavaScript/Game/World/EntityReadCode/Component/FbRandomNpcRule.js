"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRandomNpcRule = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFixedDateTime_1 = require("./FbFixedDateTime"),
  FbProbabilityRefreshGroup_1 = require("./FbProbabilityRefreshGroup");
class FbRandomNpcRule {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.aBh = !1),
      (this.hBh = void 0),
      (this.lBh = !1),
      (this._Bh = void 0);
  }
  static Create(t) {
    if (t) return new FbRandomNpcRule(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get DateTimeList() {
    if (!this.aBh) {
      (this.aBh = !0), (this.hBh = new Array());
      var e = this.FbDataInternal.dateTimeListLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.dateTimeList(
            t,
            new fb_component_1.FixedDateTime(),
          );
          this.hBh.push(FbFixedDateTime_1.FbFixedDateTime.Create(i));
        }
    }
    return this.hBh;
  }
  get ProbabilityRefreshGroup() {
    return (
      this.lBh ||
        ((this.lBh = !0),
        (this._Bh =
          FbProbabilityRefreshGroup_1.FbProbabilityRefreshGroup.Create(
            this.FbDataInternal.probabilityRefreshGroup(),
          ))),
      this._Bh
    );
  }
}
exports.FbRandomNpcRule = FbRandomNpcRule;
//# sourceMappingURL=FbRandomNpcRule.js.map
