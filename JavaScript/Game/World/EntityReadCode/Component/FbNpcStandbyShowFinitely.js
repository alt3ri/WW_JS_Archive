"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcStandbyShowFinitely = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbNpcStandbyShowFinitelyInfo_1 = require("./FbNpcStandbyShowFinitelyInfo");
class FbNpcStandbyShowFinitely {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.iLh = !1),
      (this.rLh = void 0),
      (this.N4h = !1),
      (this.V4h = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcStandbyShowFinitely(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PlayMode() {
    return (
      this.iLh ||
        ((this.iLh = !0), (this.rLh = this.FbDataInternal.playMode())),
      this.rLh
    );
  }
  get Montages() {
    if (!this.N4h) {
      (this.N4h = !0), (this.V4h = new Array());
      var i = this.FbDataInternal.montagesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.montages(
            t,
            new fb_component_1.NpcStandbyShowFinitelyInfo(),
          );
          this.V4h.push(
            FbNpcStandbyShowFinitelyInfo_1.FbNpcStandbyShowFinitelyInfo.Create(
              e,
            ),
          );
        }
    }
    return this.V4h;
  }
}
exports.FbNpcStandbyShowFinitely = FbNpcStandbyShowFinitely;
//# sourceMappingURL=FbNpcStandbyShowFinitely.js.map
