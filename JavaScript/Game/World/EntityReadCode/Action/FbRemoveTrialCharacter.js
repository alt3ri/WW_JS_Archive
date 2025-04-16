"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRemoveTrialCharacter = void 0);
class FbRemoveTrialCharacter {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.USh = !1),
      (this.DSh = 0),
      (this.NSh = !1),
      (this.VSh = void 0);
  }
  static Create(t) {
    if (t) return new FbRemoveTrialCharacter(t);
  }
  get CharacterId() {
    return (
      this.USh ||
        ((this.USh = !0), (this.DSh = this.FbDataInternal.characterId())),
      this.DSh
    );
  }
  get CharacterGroup() {
    if (!this.NSh) {
      (this.NSh = !0), (this.VSh = new Array());
      var r = this.FbDataInternal.characterGroupLength();
      if (r)
        for (let t = 0; t < r; ++t)
          this.VSh.push(this.FbDataInternal.characterGroup(t));
    }
    return this.VSh;
  }
}
exports.FbRemoveTrialCharacter = FbRemoveTrialCharacter;
//# sourceMappingURL=FbRemoveTrialCharacter.js.map
