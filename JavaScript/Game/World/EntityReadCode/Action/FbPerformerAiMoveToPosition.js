"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPerformerAiMoveToPosition = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPerformerAiMoveToPosition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.yAh = !1),
      (this.SAh = void 0);
  }
  static Create(t) {
    if (t) return new FbPerformerAiMoveToPosition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Destination() {
    return (
      this.yAh ||
        ((this.yAh = !0),
        (this.SAh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.destination(),
        ))),
      this.SAh
    );
  }
}
exports.FbPerformerAiMoveToPosition = FbPerformerAiMoveToPosition;
//# sourceMappingURL=FbPerformerAiMoveToPosition.js.map
