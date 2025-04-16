"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSignalDevice2 = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbColorPiece_1 = require("./FbColorPiece");
class FbSignalDevice2 {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(i) {
    if (i) return new FbSignalDevice2(i);
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
      var t = this.FbDataInternal.configLength();
      if (t)
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.config(i, new fb_action_1.ColorPiece());
          this.TAe.push(FbColorPiece_1.FbColorPiece.Create(e));
        }
    }
    return this.TAe;
  }
}
exports.FbSignalDevice2 = FbSignalDevice2;
//# sourceMappingURL=FbSignalDevice2.js.map
