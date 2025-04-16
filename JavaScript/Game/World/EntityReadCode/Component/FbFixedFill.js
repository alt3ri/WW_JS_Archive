"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixedFill = void 0);
const FbJigsawConfig_1 = require("../Action/FbJigsawConfig"),
  FbPieceIndex_1 = require("../Action/FbPieceIndex");
class FbFixedFill {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hNh = !1),
      (this.lNh = 0),
      (this._Nh = !1),
      (this.cNh = void 0),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(i) {
    if (i) return new FbFixedFill(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ModelId() {
    return (
      this.hNh || ((this.hNh = !0), (this.lNh = this.FbDataInternal.modelId())),
      this.lNh
    );
  }
  get Centre() {
    return (
      this._Nh ||
        ((this._Nh = !0),
        (this.cNh = FbPieceIndex_1.FbPieceIndex.Create(
          this.FbDataInternal.centre(),
        ))),
      this.cNh
    );
  }
  get Config() {
    return (
      this.bSh ||
        ((this.bSh = !0),
        (this.TAe = FbJigsawConfig_1.FbJigsawConfig.Create(
          this.FbDataInternal.config(),
        ))),
      this.TAe
    );
  }
}
exports.FbFixedFill = FbFixedFill;
//# sourceMappingURL=FbFixedFill.js.map
