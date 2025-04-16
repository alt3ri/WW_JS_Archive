"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityMatchDynamic = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbDynamicEntityMatch_1 = require("./FbDynamicEntityMatch");
class FbEntityMatchDynamic {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.oXh = !1),
      (this.nXh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityMatchDynamic(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MatchEntity() {
    if (!this.oXh) {
      (this.oXh = !0), (this.nXh = new Array());
      var i = this.FbDataInternal.matchEntityLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchEntity(
            t,
            new fb_component_1.DynamicEntityMatch(),
          );
          this.nXh.push(FbDynamicEntityMatch_1.FbDynamicEntityMatch.Create(e));
        }
    }
    return this.nXh;
  }
}
exports.FbEntityMatchDynamic = FbEntityMatchDynamic;
//# sourceMappingURL=FbEntityMatchDynamic.js.map
