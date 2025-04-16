"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMonsterGachaSlot = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbMonsterGachaSlot {
  constructor(t) {
    (this.FbDataInternal = t), (this.uch = !1), (this.dch = void 0);
  }
  static Create(t) {
    if (t) return new FbMonsterGachaSlot(t);
  }
  get Pos() {
    return (
      this.uch ||
        ((this.uch = !0),
        (this.dch = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.pos(),
        ))),
      this.dch
    );
  }
}
exports.FbMonsterGachaSlot = FbMonsterGachaSlot;
//# sourceMappingURL=FbMonsterGachaSlot.js.map
