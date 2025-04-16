"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLifePointColorBoard = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbColorPiece_1 = require("./FbColorPiece");
class FbLifePointColorBoard {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.bSh = !1),
      (this.TAe = void 0),
      (this.TIh = !1),
      (this.bIh = void 0),
      (this.LIh = !1),
      (this.AIh = void 0);
  }
  static Create(t) {
    if (t) return new FbLifePointColorBoard(t);
  }
  get Config() {
    if (!this.bSh) {
      (this.bSh = !0), (this.TAe = new Array());
      var i = this.FbDataInternal.configLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var r = this.FbDataInternal.config(t, new fb_action_1.ColorPiece());
          this.TAe.push(FbColorPiece_1.FbColorPiece.Create(r));
        }
    }
    return this.TAe;
  }
  get Colors() {
    if (!this.TIh) {
      (this.TIh = !0), (this.bIh = new Array());
      var i = this.FbDataInternal.colorsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.bIh.push(this.FbDataInternal.colors(t));
    }
    return this.bIh;
  }
  get TargetColor() {
    return (
      this.LIh ||
        ((this.LIh = !0), (this.AIh = this.FbDataInternal.targetColor())),
      this.AIh
    );
  }
}
exports.FbLifePointColorBoard = FbLifePointColorBoard;
//# sourceMappingURL=FbLifePointColorBoard.js.map
