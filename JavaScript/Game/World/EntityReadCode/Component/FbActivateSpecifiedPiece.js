"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActivateSpecifiedPiece = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbActivateSpecifiedPieceConfig_1 = require("./FbActivateSpecifiedPieceConfig");
class FbActivateSpecifiedPiece {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(e) {
    if (e) return new FbActivateSpecifiedPiece(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Config() {
    if (!this.bSh) {
      (this.bSh = !0), (this.TAe = new Array());
      var i = this.FbDataInternal.configLength();
      if (i)
        for (let e = 0; e < i; ++e) {
          var t = this.FbDataInternal.config(
            e,
            new fb_component_1.ActivateSpecifiedPieceConfig(),
          );
          this.TAe.push(
            FbActivateSpecifiedPieceConfig_1.FbActivateSpecifiedPieceConfig.Create(
              t,
            ),
          );
        }
    }
    return this.TAe;
  }
}
exports.FbActivateSpecifiedPiece = FbActivateSpecifiedPiece;
//# sourceMappingURL=FbActivateSpecifiedPiece.js.map
