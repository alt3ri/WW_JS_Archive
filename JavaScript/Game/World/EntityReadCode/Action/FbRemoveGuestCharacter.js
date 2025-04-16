"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRemoveGuestCharacter = void 0);
class FbRemoveGuestCharacter {
  constructor(t) {
    (this.FbDataInternal = t), (this.Pj_ = !1), (this.xj_ = 0);
  }
  static Create(t) {
    if (t) return new FbRemoveGuestCharacter(t);
  }
  get GuestCharacterId() {
    return (
      this.Pj_ ||
        ((this.Pj_ = !0), (this.xj_ = this.FbDataInternal.guestCharacterId())),
      this.xj_
    );
  }
}
exports.FbRemoveGuestCharacter = FbRemoveGuestCharacter;
//# sourceMappingURL=FbRemoveGuestCharacter.js.map
