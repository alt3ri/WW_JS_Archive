"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBuffArea = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbBuffAreaStateConfig_1 = require("./FbBuffAreaStateConfig");
class FbBuffArea {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.i$h = !1),
      (this.r$h = void 0);
  }
  static Create(t) {
    if (t) return new FbBuffArea(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BuffConfigs() {
    if (!this.i$h) {
      (this.i$h = !0), (this.r$h = new Array());
      var e = this.FbDataInternal.buffConfigsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.buffConfigs(
            t,
            new fb_component_1.BuffAreaStateConfig(),
          );
          this.r$h.push(
            FbBuffAreaStateConfig_1.FbBuffAreaStateConfig.Create(i),
          );
        }
    }
    return this.r$h;
  }
}
exports.FbBuffArea = FbBuffArea;
//# sourceMappingURL=FbBuffArea.js.map
