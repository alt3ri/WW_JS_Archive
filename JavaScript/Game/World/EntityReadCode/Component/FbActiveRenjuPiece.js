"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActiveRenjuPiece = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbJigsawItemMatchedConfig_1 = require("./FbJigsawItemMatchedConfig"),
  FbRenjuConfig_1 = require("./FbRenjuConfig");
class FbActiveRenjuPiece {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.INh = !1),
      (this.TNh = void 0),
      (this.Y6l = !1),
      (this.z6l = void 0);
  }
  static Create(t) {
    if (t) return new FbActiveRenjuPiece(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get RenjuConfig() {
    if (!this.INh) {
      (this.INh = !0), (this.TNh = new Array());
      var e = this.FbDataInternal.renjuConfigLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.renjuConfig(
            t,
            new fb_component_1.RenjuConfig(),
          );
          this.TNh.push(FbRenjuConfig_1.FbRenjuConfig.Create(i));
        }
    }
    return this.TNh;
  }
  get ExitMatchedConfig() {
    if (!this.Y6l) {
      (this.Y6l = !0), (this.z6l = new Array());
      var e = this.FbDataInternal.exitMatchedConfigLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.exitMatchedConfig(
            t,
            new fb_component_1.JigsawItemMatchedConfig(),
          );
          this.z6l.push(
            FbJigsawItemMatchedConfig_1.FbJigsawItemMatchedConfig.Create(i),
          );
        }
    }
    return this.z6l;
  }
}
exports.FbActiveRenjuPiece = FbActiveRenjuPiece;
//# sourceMappingURL=FbActiveRenjuPiece.js.map
