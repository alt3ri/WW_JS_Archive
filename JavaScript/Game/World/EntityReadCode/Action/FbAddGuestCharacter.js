"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAddGuestCharacter = void 0);
const FbActiveRange_1 = require("./FbActiveRange");
class FbAddGuestCharacter {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Pj_ = !1),
      (this.xj_ = 0),
      (this.gEh = !1),
      (this.fEh = void 0);
  }
  static Create(t) {
    if (t) return new FbAddGuestCharacter(t);
  }
  get GuestCharacterId() {
    return (
      this.Pj_ ||
        ((this.Pj_ = !0), (this.xj_ = this.FbDataInternal.guestCharacterId())),
      this.xj_
    );
  }
  get ActiveRange() {
    return (
      this.gEh ||
        ((this.gEh = !0),
        (this.fEh = FbActiveRange_1.FbActiveRange.Create(
          this.FbDataInternal.activeRange(),
        ))),
      this.fEh
    );
  }
}
exports.FbAddGuestCharacter = FbAddGuestCharacter;
//# sourceMappingURL=FbAddGuestCharacter.js.map
