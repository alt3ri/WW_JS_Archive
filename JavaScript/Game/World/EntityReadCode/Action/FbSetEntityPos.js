"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetEntityPos = void 0);
const FbPosA_1 = require("./FbPosA");
class FbSetEntityPos {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.uch = !1),
      (this.dch = void 0);
  }
  static Create(t) {
    if (t) return new FbSetEntityPos(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get Pos() {
    return (
      this.uch ||
        ((this.uch = !0),
        (this.dch = FbPosA_1.FbPosA.Create(this.FbDataInternal.pos()))),
      this.dch
    );
  }
}
exports.FbSetEntityPos = FbSetEntityPos;
//# sourceMappingURL=FbSetEntityPos.js.map
