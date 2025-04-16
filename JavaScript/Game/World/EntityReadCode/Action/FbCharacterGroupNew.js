"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCharacterGroupNew = void 0);
class FbCharacterGroupNew {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.USh = !1),
      (this.DSh = 0),
      (this.BSh = !1),
      (this.qSh = !1);
  }
  static Create(t) {
    if (t) return new FbCharacterGroupNew(t);
  }
  get CharacterId() {
    return (
      this.USh ||
        ((this.USh = !0), (this.DSh = this.FbDataInternal.characterId())),
      this.DSh
    );
  }
  get IsAiCharacter() {
    return (
      this.BSh ||
        ((this.BSh = !0), (this.qSh = this.FbDataInternal.isAiCharacter())),
      this.qSh
    );
  }
}
exports.FbCharacterGroupNew = FbCharacterGroupNew;
//# sourceMappingURL=FbCharacterGroupNew.js.map
